const flow = [
    {
        title: "위험 신호",
        description: "명확한 키워드는 규칙 기반으로 즉시 확인합니다.",
    },
    {
        title: "상황과 맥락",
        description: "현재 어떤 단계인지 함께 고려합니다.",
    },
    {
        title: "종합 판단",
        description: "신호와 상황을 합쳐 최종 위험도를 결정합니다.",
    },
];

export default function AnalyzeSection() {
    return (
        <section
            id="analyze"
            className="landing-section analyze-section"
        >
            <div className="container">
                <span className="section-number">03</span>

                <div className="analyze-section__content">
                    <p className="section-label">
                        HOW WE ANALYZE
                    </p>

                    <h2 className="section-title">
                        빠르게 찾고,
                        <br />
                        <span>깊게 살펴봅니다.</span>
                    </h2>

                    <p className="section-description">
                        명확한 위험 신호는 빠르게 확인하고,
                        <br />
                        대화의 맥락은 AI가 함께 분석합니다.
                    </p>
                </div>

                <div className="analyze-flow">
                    {flow.map((item, index) => (
                        <div
                            className="analyze-flow__item"
                            key={item.title}
                        >
                            <span className="analyze-flow__number">
                                {String(index + 1).padStart(2, "0")}
                            </span>

                            <strong className="analyze-flow__title">
                                {item.title}
                            </strong>

                            <p className="analyze-flow__description">
                                {item.description}
                            </p>

                            {index < flow.length - 1 && (
                                <span className="analyze-flow__arrow">
                                    →
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
