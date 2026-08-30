const actions = [
    {
        title: "연락을 멈추고",
        description: "추가 통화나 메시지에 응하지 않습니다.",
    },
    {
        title: "송금을 보류하고",
        description: "이미 진행 중이라면 즉시 중단합니다.",
    },
    {
        title: "필요한 도움을 요청하세요",
        description: "금융기관과 관계기관에 상황을 알립니다.",
    },
];

export function ResponseSection() {
    return (
        <section
            id="response"
            className="landing-section response-section"
        >
            <div className="container">
                <span className="section-number">04</span>

                <div className="response-section__content">
                    <div>
                        <p className="section-label">
                            WHAT TO DO
                        </p>

                        <h2 className="section-title">
                            위험하다는 말에서
                            <br/>
                            <span>끝나지 않습니다.</span>
                        </h2>
                    </div>

                    <div>
                        <p className="section-description">
                            상황을 확인한 뒤,
                            <br/>
                            지금 무엇을 해야 하는지 차분하게 안내합니다.
                        </p>

                        <div className="response-actions">
                            {actions.map((action, index) => (
                                <div
                                    className="response-actions__item"
                                    key={action.title}
                                >
                                    <span className="response-actions__number">
                                        {String(index + 1).padStart(2, "0")}
                                    </span>

                                    <div>
                                        <p className="response-actions__title">
                                            {action.title}
                                        </p>

                                        <p className="response-actions__description">
                                            {action.description}
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
