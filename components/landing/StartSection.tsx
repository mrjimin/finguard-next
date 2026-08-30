import Link from "next/link";

export default function StartSection() {
    return (
        <section
            id="start"
            className="landing-section start-section"
        >
            <div className="container start-section__content">
                <span className="section-number">
                    05
                </span>

                <p className="section-label">
                    FIN:GUARD
                </p>

                <h2 className="section-title">
                    의심되는 연락이 있다면,
                    <br />
                    한 번 더 확인해보세요.
                </h2>

                <p className="section-description">
                    발견된 위험 신호와 상황을 함께 살펴
                    <br />
                    다음 행동까지 안내합니다.
                </p>

                <Link
                    href="/analyze"
                    className="primary-button"
                >
                    내 상황 확인하기
                    <span>→</span>
                </Link>

                <small className="start-section__notice">
                    FIN:GUARD는 금융사기 여부에 대한 참고 정보를 제공하며,
                    금융기관의 공식 판단을 대신하지 않습니다.
                </small>
            </div>
        </section>
    );
}
