import { NextRequest, NextResponse } from "next/server";

import {
    gemini,
    GEMINI_CONFIG,
    GEMINI_MODEL,
} from "@/lib/gemini";

import {
    ANALYSIS_SYSTEM_PROMPT,
    createAnalysisPrompt,
} from "@/lib/prompt";

import { analyzeRules } from "@/lib/rules";

import type {
    AnalyzeRequest,
    RiskLevel,
    Situation,
} from "@/types/analysis";

import { supabase } from "@/lib/supabase";

const MAX_INPUT_LENGTH = 1500;

const responseSchema = {
    type: "object",
    properties: {
        riskLevel: {
            type: "string",
            enum: [
                "LOW",
                "MEDIUM",
                "HIGH",
                "CRITICAL",
            ],
        },
        scamType: {
            type: "string",
        },
        summary: {
            type: "string",
        },
        signals: {
            type: "array",
            items: {
                type: "string",
            },
        },
    },
    required: [
        "riskLevel",
        "scamType",
        "summary",
        "signals",
    ],
};

interface AIAnalysisResult {
    riskLevel: RiskLevel;
    scamType: string;
    summary: string;
    signals: string[];
}

const isRiskLevel = (
    value: unknown
): value is RiskLevel => {
    return (
        value === "LOW" ||
        value === "MEDIUM" ||
        value === "HIGH" ||
        value === "CRITICAL"
    );
};

const isSituation = (
    value: unknown
): value is Situation => {
    return (
        value === "NONE" ||
        value === "CLICKED_LINK" ||
        value === "INSTALLED_APP" ||
        value === "SHARED_INFO" ||
        value === "SHARED_AUTH" ||
        value === "SENT_MONEY"
    );
};

export async function POST(
    request: NextRequest
) {
    try {
        const body =
            (await request.json()) as Partial<AnalyzeRequest>;

        const message =
            typeof body.message === "string"
                ? body.message.trim()
                : "";

        const situation = isSituation(body.situation)
            ? body.situation
            : null;

        // =========================
        // 입력값 검증
        // =========================

        if (!message) {
            return NextResponse.json(
                {
                    success: false,
                    error: "분석할 내용을 입력해주세요.",
                },
                { status: 400 }
            );
        }

        if (message.length > MAX_INPUT_LENGTH) {
            return NextResponse.json(
                {
                    success: false,
                    error: "입력은 1,500자 이하로 작성해주세요.",
                },
                { status: 400 }
            );
        }

        if (!situation) {
            return NextResponse.json(
                {
                    success: false,
                    error: "현재 상황을 선택해주세요.",
                },
                { status: 400 }
            );
        }

        // =========================
        // Rule 분석
        // =========================

        const ruleResult = analyzeRules(message);

        // =========================
        // Gemini 분석
        // =========================

        const response =
            await gemini.models.generateContent({
                model: GEMINI_MODEL,

                contents: createAnalysisPrompt(
                    message,
                    situation
                ),

                config: {
                    ...GEMINI_CONFIG,
                    systemInstruction:
                    ANALYSIS_SYSTEM_PROMPT,
                    responseMimeType:
                        "application/json",
                    responseSchema,
                },
            });

        if (!response.text) {
            throw new Error("AI 응답이 없습니다.");
        }

        // =========================
        // JSON 파싱
        // =========================

        const parsed: unknown =
            JSON.parse(response.text);

        if (
            typeof parsed !== "object" ||
            parsed === null
        ) {
            throw new Error(
                "AI 응답 형식이 올바르지 않습니다."
            );
        }

        const data =
            parsed as Record<string, unknown>;

        if (
            !isRiskLevel(data.riskLevel) ||
            typeof data.scamType !== "string" ||
            typeof data.summary !== "string" ||
            !Array.isArray(data.signals)
        ) {
            throw new Error(
                "AI 응답 데이터가 올바르지 않습니다."
            );
        }

        const aiResult: AIAnalysisResult = {
            riskLevel: data.riskLevel,
            scamType: data.scamType,
            summary: data.summary,
            signals: data.signals.filter(
                (signal): signal is string =>
                    typeof signal === "string"
            ),
        };

        // =========================
        // 최종 위험도 계산
        // =========================

        let finalRiskLevel =
            getHigherRisk(
                aiResult.riskLevel,
                ruleResult.riskLevel
            );

        /*
         * 실제 피해 행동이 발생한 경우
         * 최소 위험도를 보정한다.
         */

        if (
            situation === "SHARED_AUTH" ||
            situation === "SENT_MONEY"
        ) {
            finalRiskLevel = "CRITICAL";
        }

        if (
            situation === "INSTALLED_APP" &&
            getRiskScore(finalRiskLevel) <
            getRiskScore("HIGH")
        ) {
            finalRiskLevel = "HIGH";
        }

        if (
            situation === "SHARED_INFO" &&
            getRiskScore(finalRiskLevel) <
            getRiskScore("HIGH")
        ) {
            finalRiskLevel = "HIGH";
        }

        // =========================
        // signals 정리
        // =========================

        const signals = [
            ...ruleResult.signals,
            ...aiResult.signals,
        ].filter(
            (signal, index, array) =>
                array.indexOf(signal) === index
        );

        const finalSignals =
            finalRiskLevel === "LOW"
                ? []
                : signals.slice(0, 3);

        // =========================
        // DB 저장
        // =========================

        const { error: saveError } =
            await supabase
                .from("analysis_history")
                .insert({
                    risk_level: finalRiskLevel,
                    scam_type: aiResult.scamType,
                    situation,
                });

        if (saveError) {
            console.error(
                "분석 결과 저장 실패:",
                saveError
            );
        }

        // =========================
        // 응답
        // =========================

        return NextResponse.json({
            success: true,

            data: {
                riskLevel: finalRiskLevel,
                scamType: aiResult.scamType,
                summary: aiResult.summary,
                signals: finalSignals,
            },
        });
    } catch (error) {
        console.error(
            "FIN:GUARD:",
            error
        );

        return NextResponse.json(
            {
                success: false,
                error:
                    "AI 분석에 실패했습니다. 잠시 후 다시 시도해주세요.",
            },
            { status: 500 }
        );
    }
}

function getRiskScore(
    level: RiskLevel
): number {
    return {
        LOW: 0,
        MEDIUM: 1,
        HIGH: 2,
        CRITICAL: 3,
    }[level];
}

function getHigherRisk(
    first: RiskLevel,
    second?: RiskLevel
): RiskLevel {
    if (!second) {
        return first;
    }

    return getRiskScore(first) >=
    getRiskScore(second)
        ? first
        : second;
}
