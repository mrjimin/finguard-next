import RiskBadge from "@/components/RiskBadge";
import type { AnalysisHistory } from "./history";

interface HistoryItemProps {
    item: AnalysisHistory;
}

function formatDateTime(
    value: string
) {
    return new Intl.DateTimeFormat(
        "ko-KR",
        {
            timeZone: "Asia/Seoul",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        }
    )
        .format(new Date(value))
        .replace(/\.\s/g, " ")
        .replace(/\.$/, "");
}

export default function HistoryItem({
                                        item,
                                    }: HistoryItemProps) {
    return (
        <article className="history-item">
            <time
                className="history-item__date"
                dateTime={item.created_at}
            >
                {formatDateTime(
                    item.created_at
                )}
            </time>

            <div className="history-item__content">
                <RiskBadge
                    level={item.risk_level}
                />

                <strong className="history-item__type">
                    {item.scam_type}
                </strong>
            </div>
        </article>
    );
}
