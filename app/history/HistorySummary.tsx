import type { HistorySummary as HistorySummaryData } from "./history";

interface HistorySummaryProps {
    summary: HistorySummaryData;
}

const risks = [
    {
        key: "low",
        label: "낮은 위험",
    },
    {
        key: "medium",
        label: "주의 필요",
    },
    {
        key: "high",
        label: "높은 위험",
    },
    {
        key: "critical",
        label: "매우 위험",
    },
] as const;

export default function HistorySummary({
                                           summary,
                                       }: HistorySummaryProps) {
    return (
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
                        {summary.total.toLocaleString()}
                    </strong>

                    <span>건</span>
                </div>

                <p>
                    최근 분석 처리 건수
                </p>
            </div>

            <div className="history-summary__risks">
                {risks.map((risk) => (
                    <div
                        className="history-summary__risk"
                        key={risk.key}
                    >
                        <span
                            className={`history-summary__dot history-summary__dot--${risk.key}`}
                            aria-hidden="true"
                        />

                        <span className="history-summary__risk-label">
                            {risk.label}
                        </span>

                        <strong>
                            {summary[
                                risk.key
                                ].toLocaleString()}
                        </strong>
                    </div>
                ))}
            </div>
        </section>
    );
}
