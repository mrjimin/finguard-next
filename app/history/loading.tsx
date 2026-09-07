export default function HistoryLoading() {
    return (
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

            <section
                className="history-summary history-summary--loading"
                aria-hidden="true"
            >
                <div className="history-summary__total">
                    <div className="skeleton skeleton--label" />
                    <div className="skeleton skeleton--number" />
                    <div className="skeleton skeleton--text" />
                </div>

                <div className="history-summary__risks">
                    {Array.from({ length: 4 }).map(
                        (_, index) => (
                            <div
                                className="history-summary__risk"
                                key={index}
                            >
                                <div className="skeleton skeleton--dot" />
                                <div className="skeleton skeleton--risk-label" />
                                <div className="skeleton skeleton--risk-number" />
                            </div>
                        )
                    )}
                </div>
            </section>

            <section
                className="history-list"
                aria-hidden="true"
            >
                <div className="history-list__header">
                    <div>
                        <div className="skeleton skeleton--eyebrow" />
                        <div className="skeleton skeleton--title" />
                    </div>
                </div>

                <div className="history-list__items">
                    {Array.from({ length: 6 }).map(
                        (_, index) => (
                            <article
                                className="history-item"
                                key={index}
                            >
                                <div className="skeleton skeleton--date" />

                                <div className="history-item__content">
                                    <div className="skeleton skeleton--badge" />
                                    <div className="skeleton skeleton--type" />
                                </div>
                            </article>
                        )
                    )}
                </div>
            </section>
        </main>
    );
}
