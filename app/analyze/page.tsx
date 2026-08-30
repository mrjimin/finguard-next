"use client";

import { useState } from "react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScamInput from "@/components/analyze/ScamInput";
import SituationSelector from "@/components/analyze/SituationSelector";
import AnalysisResult from "@/components/analyze/AnalysisResult";

import type {
    Analysis,
    Situation,
} from "@/types/analysis";

export default function AnalyzePage() {
    const [message, setMessage] = useState("");
    const [situation, setSituation] =
        useState<Situation | null>(null);

    const [analysis, setAnalysis] =
        useState<Analysis | null>(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const analyze = async () => {
        if (!message.trim() || loading) return;

        if (!situation) {
            setError("현재 상황을 선택해주세요.");
            return;
        }

        setLoading(true);
        setError("");
        setAnalysis(null);

        try {
            const response = await fetch(
                "/api/analyze",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        message: message.trim(),
                        situation,
                    }),
                }
            );

            const result = await response.json();

            if (
                !response.ok ||
                !result.success
            ) {
                throw new Error(
                    result.error ??
                    "분석에 실패했습니다."
                );
            }

            setAnalysis(result.data);
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "잠시 후 다시 시도해주세요."
            );
        } finally {
            setLoading(false);
        }
    };

    const reset = () => {
        setMessage("");
        setSituation(null);
        setAnalysis(null);
        setError("");
    };

    return (
        <>
            <Header />

            <main className="container analysis-page">
                {!analysis && (
                    <>
                        <div className="analysis-header">
                            <span className="section-label">
                                FINANCIAL SECURITY CHECK
                            </span>

                            <h1>
                                지금 어떤 상황인가요?
                            </h1>

                            <p>
                                받은 연락과 현재 상황을
                                알려주시면 위험 신호를
                                함께 확인해드릴게요.
                            </p>
                        </div>

                        <div className="analysis-form">
                            <div className="analysis-panel">
                                <p className="analysis-panel__title">
                                    현재 상황
                                </p>

                                <SituationSelector
                                    value={situation}
                                    onChange={(value) => {
                                        setSituation(value);
                                        setError("");
                                    }}
                                />
                            </div>

                            <div className="analysis-panel">
                                <p className="analysis-panel__title">
                                    의심스러운 내용
                                </p>

                                <ScamInput
                                    value={message}
                                    loading={loading}
                                    onChange={(value) => {
                                        setMessage(value);
                                        setError("");
                                    }}
                                    onSubmit={analyze}
                                />

                                {error && (
                                    <p
                                        style={{
                                            marginTop: 12,
                                            color: "var(--color-danger)",
                                            fontSize: 12,
                                        }}
                                    >
                                        {error}
                                    </p>
                                )}
                            </div>
                        </div>

                        <p
                            style={{
                                marginTop: 20,
                                color: "var(--color-muted)",
                                fontSize: 11,
                                textAlign: "center",
                            }}
                        >
                            입력한 내용은 금융사기 위험
                            분석을 위한 목적으로만
                            사용됩니다.
                        </p>
                    </>
                )}

                {analysis && situation && (
                    <AnalysisResult
                        analysis={analysis}
                        situation={situation}
                        onReset={reset}
                    />
                )}
            </main>

            <Footer />
        </>
    );
}
