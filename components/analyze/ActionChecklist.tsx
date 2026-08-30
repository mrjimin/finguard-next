import type { Situation } from "@/types/analysis";

interface Props {
    situation: Situation;
}

const actions: Record<Situation, string[]> = {
    NONE: [
        "상대방과의 통화를 종료하고 추가 연락에 응하지 마세요.",
        "상대방이 안내한 링크를 클릭하거나 앱을 설치하지 마세요.",
        "금융기관을 사칭했다면 공식 홈페이지의 대표번호로 직접 확인하세요.",
    ],

    CLICKED_LINK: [
        "추가로 링크를 누르거나 개인정보를 입력하지 마세요.",
        "의심스러운 페이지에서 입력한 정보가 있다면 금융기관에 즉시 문의하세요.",
        "휴대전화에 이상한 앱이나 프로파일이 설치되었는지 확인하세요.",
    ],

    INSTALLED_APP: [
        "해당 앱을 통한 추가 조작을 중단하세요.",
        "금융기관 및 관련 기관의 공식 채널을 통해 피해 여부를 확인하세요.",
        "휴대전화의 악성 앱 여부를 점검하세요.",
    ],

    SHARED_INFO: [
        "추가 개인정보를 절대 제공하지 마세요.",
        "해당 금융기관에 개인정보 노출 사실을 알리고 필요한 조치를 확인하세요.",
        "비밀번호 등 동일한 정보를 사용하고 있다면 즉시 변경하세요.",
    ],

    SHARED_AUTH: [
        "해당 금융기관에 즉시 연락해 계좌 보호 조치를 요청하세요.",
        "추가 인증번호나 비밀번호를 절대 전달하지 마세요.",
        "금융거래 내역에서 이상 거래가 발생했는지 확인하세요.",
    ],

    SENT_MONEY: [
        "즉시 거래 금융회사에 연락해 지급정지 가능 여부를 문의하세요.",
        "경찰 등 관계기관에 피해 사실을 신고하세요.",
        "추가 송금이나 상대방의 요구에 응하지 마세요.",
    ],
};

export default function ActionChecklist({
                                            situation,
                                        }: Props) {
    return (
        <section className="action-checklist">
            <div className="action-checklist__header">
                <p className="action-checklist__title">
                    지금 이렇게 행동하세요
                </p>

                <span className="action-checklist__label">
                    NEXT STEP
                </span>
            </div>

            <div className="action-checklist__list">
                {actions[situation].map(
                    (action, index) => (
                        <div
                            className="action-checklist__item"
                            key={action}
                        >
                            <span className="action-checklist__number">
                                {String(
                                    index + 1
                                ).padStart(2, "0")}
                            </span>

                            <p>{action}</p>
                        </div>
                    )
                )}
            </div>
        </section>
    );
}
