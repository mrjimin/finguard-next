import Link from "next/link";

export default function HeroSection() {
    return (
        <section className="hero-section">
            <div className="container hero-section__inner">
                <div className="hero-section__content">
                    <p className="hero-section__eyebrow">
                        <span />
                        금융사기 대응 서비스
                    </p>

                    <h1 className="hero-section__title">
                        잠깐,
                        <br />
                        <span>이 연락 믿어도 될까요?</span>
                    </h1>

                    <p className="hero-section__description">
                        갑작스러운 전화나 문자를 받았을 때,
                        <br />
                        무엇이 위험 신호인지 함께 확인해보세요.
                    </p>

                    <div className="hero-section__actions">
                        <Link
                            href="/analyze"
                            className="primary-button"
                        >
                            지금 사용해보기
                            <span>→</span>
                        </Link>

                        <a
                            href="#why"
                            className="secondary-button"
                        >
                            어떻게 작동하나요?
                        </a>
                    </div>
                </div>

                <div className="hero-card">
                    <div className="hero-card__header">
                        <span>의심스러운 문자</span>
                        <i />
                    </div>

                    <div className="hero-card__message">
                        <p>검찰청입니다.</p>
                        <p>본인 명의 계좌가 범죄에 이용되었습니다.</p>
                        <p>안전계좌로 자금을 이동해 주세요.</p>
                    </div>

                    <div className="hero-card__risk">
                        <div>
                            <span>위험 신호 감지</span>
                            <strong>높음</strong>
                        </div>

                        <p>
                            기관을 사칭하여 자금 이동을 요구하고 있습니다.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
