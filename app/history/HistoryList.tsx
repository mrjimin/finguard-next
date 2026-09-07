import HistoryItem from "./HistoryItem";
import type { AnalysisHistory } from "./history";

interface HistoryListProps {
    history: AnalysisHistory[];
    totalCount: number;
}

export default function HistoryList({
                                        history,
                                        totalCount,
                                    }: HistoryListProps) {
    if (history.length === 0) {
        return (
            <section
                className="history-list"
                aria-label="분석 처리 현황"
            >
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
            </section>
        );
    }

    return (
        <section
            className="history-list"
            aria-label="분석 처리 현황"
        >
            <div className="history-list__header">
                <div>
                    <strong>최근 처리 현황</strong>
                </div>

                <span className="history-list__count">
                    전체 {totalCount.toLocaleString()}건
                </span>
            </div>

            <div className="history-list__items">
                {history.map((item) => (
                    <HistoryItem
                        key={item.id}
                        item={item}
                    />
                ))}
            </div>
        </section>
    );
}
