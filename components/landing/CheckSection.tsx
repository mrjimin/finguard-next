const checkItems = [
    {
        title: "대화 내용",
        description: "어떤 말투와 표현으로 접근했는지 확인합니다.",
    },
    {
        title: "처한 상황",
        description: "링크 클릭, 송금 등 실제 진행 단계를 파악합니다.",
    },
    {
        title: "위험 신호",
        description: "사기 유형별 대표 키워드와 패턴을 대조합니다.",
    },
];

export default function CheckSection() {
    return (
        <section
            id="check"
            className="landing-section check-section"
        >
            <div className="container">
                <span className="section-number">02</span>

                <div className="check-section__content">
                    <div>
                        <p className="section-label">
                            WHAT WE CHECK
                        </p>

                        <h2 className="section-title">
                            단순히
                            <br />
                            사기인지 아닌지만
                            <br />
                            판단하지 않습니다.
                        </h2>
                    </div>

                    <div className="check-section__detail">
                        <p className="section-description">
                            연락 내용에서 발견되는 신호와
                            <br />
                            당시의 상황을 함께 살펴봅니다.
                        </p>

                        <div className="check-list">
                            {checkItems.map((item, index) => (
                                <div
                                    className="check-list__item"
                                    key={item.title}
                                >
                                    <span className="check-list__number">
                                        {String(index + 1).padStart(2, "0")}
                                    </span>

                                    <div>
                                        <p className="check-list__title">
                                            {item.title}
                                        </p>

                                        <p className="check-list__description">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
