import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RiskBadge from "@/components/RiskBadge";

import { supabase } from "@/lib/supabase";

import type { RiskLevel } from "@/types/analysis";

export const dynamic = "force-dynamic";

interface AnalysisHistory {
    id: string;
    created_at: string;
    risk_level: RiskLevel;
    scam_type: string;
}

const riskOrder: RiskLevel[] = [
    "LOW",
    "MEDIUM",
    "HIGH",
    "CRITICAL",
];

const riskLabels: Record<RiskLevel, string> = {
    LOW: "낮은 위험",
    MEDIUM: "주의 필요",
    HIGH: "높은 위험",
    CRITICAL: "매우 위험",
};

function formatDateTime(value: string) {
    return new Intl.DateTimeFormat("ko-KR", {
        timeZone: "Asia/Seoul",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    })
        .format(new Date(value))
        .replace(/\.\s/g, " ")
        .replace(/\.$/, "");
}

function getRiskCount(
    history: AnalysisHistory[],
    level: RiskLevel
) {
    return history.filter(
        (item) => item.risk_level === level
    ).length;
}

export default async function HistoryPage() {
    const { data, error } = await supabase
        .from("analysis_history")
        .select(
            "id, created_at, risk_level, scam_type"
        )
        .order("created_at", {
            ascending: false,
        });

    const history = (data ?? []) as AnalysisHistory[];

    const totalCount = history.length;

    return (
        <>
            <Header />

            <main className="container history-page">
                <header className="history-header">
                    <div className="history-header__top">
                        <span className="section-label">
                            ANALYSIS HISTORY
                        </span>
                    </div>

                    <h1>처리 현황</h1>

                    <p>
                        최근 금융사기 분석 처리 결과를 확인할 수 있습니다.
                        <br />
                        입력한 메시지와 개인정보는 저장하지 않습니다.
                    </p>
                </header>

                {!error && (
                    <section
                        className="history-summary"
                        aria-label="분석 통계"
                    >
                        <div className="history-summary__total">
                            <span className="history-summary__label">
                                TOTAL ANALYSIS
                            </span>

                            <div className="history-summary__number">
                                <strong>
                                    {totalCount.toLocaleString()}
                                </strong>

                                <span>건</span>
                            </div>

                            <p>
                                최근 분석 처리 건수
                            </p>
                        </div>

                        <div className="history-summary__risks">
                            {riskOrder.map((level) => (
                                <div
                                    className="history-summary__risk"
                                    key={level}
                                >
                                    <div className="history-summary__risk-main">
                                        <span
                                            className={`history-summary__dot history-summary__dot--${level.toLowerCase()}`}
                                        />

                                        <span className="history-summary__risk-label">
                                            {riskLabels[level]}
                                        </span>
                                    </div>

                                    <strong>
                                        {getRiskCount(
                                            history,
                                            level
                                        ).toLocaleString()}
                                    </strong>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                <section
                    className="history-list"
                    aria-label="분석 처리 현황"
                >
                    {error ? (
                        <div className="history-empty">
                            <div className="history-empty__icon">
                                !
                            </div>

                            <strong>
                                처리 현황을 불러오지 못했습니다.
                            </strong>

                            <p>
                                잠시 후 다시 시도해 주세요.
                            </p>
                        </div>
                    ) : history.length === 0 ? (
                        <div className="history-empty">
                            <div className="history-empty__icon">
                                —
                            </div>

                            <strong>
                                아직 분석 기록이 없습니다.
                            </strong>

                            <p>
                                메시지를 분석하면 이곳에 처리 결과가 표시됩니다.
                            </p>
                        </div>
                    ) : (
                        <>
                            <div className="history-list__header">
                                <div>
                                    <span className="history-list__eyebrow">
                                        RECENT ANALYSIS
                                    </span>

                                    <strong>
                                        최근 처리 현황
                                    </strong>
                                </div>

                                <span className="history-list__count">
                                    전체 {totalCount}건
                                </span>
                            </div>

                            <div className="history-list__items">
                                {history.map((item) => (
                                    <article
                                        className="history-item"
                                        key={item.id}
                                    >
                                        <time
                                            className="history-item__date"
                                            dateTime={
                                                item.created_at
                                            }
                                        >
                                            {formatDateTime(
                                                item.created_at
                                            )}
                                        </time>

                                        <div className="history-item__content">
                                            <RiskBadge
                                                level={
                                                    item.risk_level
                                                }
                                            />

                                            <strong className="history-item__type">
                                                {item.scam_type}
                                            </strong>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </>
                    )}
                </section>
            </main>

            <Footer />
        </>
    );
}
