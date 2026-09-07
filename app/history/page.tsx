import HistorySummary from "./HistorySummary";
import HistoryList from "./HistoryList";
import HistoryPagination from "./HistoryPagination";

import {
    getHistoryPage,
    getHistorySummary,
} from "./history";

interface HistoryPageProps {
    searchParams: Promise<{
        page?: string;
    }>;
}

export const dynamic =
    "force-dynamic";

export default async function HistoryPage({
                                              searchParams,
                                          }: HistoryPageProps) {
    const params =
        await searchParams;

    const parsedPage = Number(
        params.page ?? "1"
    );

    const page =
        Number.isFinite(parsedPage) &&
        parsedPage >= 1
            ? Math.floor(parsedPage)
            : 1;

    const [
        summary,
        historyPage,
    ] = await Promise.all([
        getHistorySummary(),
        getHistoryPage(page),
    ]);

    return (
        <>
            <main className="container history-page">
                <header className="history-header">
                    <div className="history-header__top">
                        <span className="section-label">
                            ANALYSIS HISTORY
                        </span>
                    </div>

                    <h1>
                        처리 현황
                    </h1>

                    <p>
                        최근 금융사기 분석 처리 결과를 확인할 수 있습니다.
                        <br />
                        입력한 메시지와 개인정보는 저장하지 않습니다.
                    </p>
                </header>

                <HistorySummary
                    summary={summary}
                />

                <HistoryList
                    history={
                        historyPage.data
                    }
                    totalCount={
                        summary.total
                    }
                />

                <HistoryPagination
                    page={page}
                    hasNextPage={
                        historyPage.hasNextPage
                    }
                />
            </main>
        </>
    );
}
