"use client";

import { useRouter } from "next/navigation";

interface HistoryPaginationProps {
    page: number;
    hasNextPage: boolean;
}

export default function HistoryPagination({
                                              page,
                                              hasNextPage,
                                          }: HistoryPaginationProps) {
    const router = useRouter();

    const goToPage = (
        nextPage: number
    ) => {
        if (nextPage < 1) {
            return;
        }

        router.push(
            `/history?page=${nextPage}`
        );
    };

    if (page === 1 && !hasNextPage) {
        return null;
    }

    return (
        <nav
            className="history-pagination"
            aria-label="페이지 이동"
        >
            <button
                type="button"
                disabled={page <= 1}
                onClick={() =>
                    goToPage(page - 1)
                }
            >
                이전
            </button>

            <span>
                {page}
            </span>

            <button
                type="button"
                disabled={!hasNextPage}
                onClick={() =>
                    goToPage(page + 1)
                }
            >
                다음
            </button>
        </nav>
    );
}
