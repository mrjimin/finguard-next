import type { Situation } from "@/types/analysis";

interface Props {
    value: Situation | null;
    onChange: (value: Situation) => void;
}

const situations: {
    value: Situation;
    label: string;
    description: string;
}[] = [
    {
        value: "NONE",
        label: "아직 아무것도 하지 않았어요",
        description: "의심되는 연락만 받은 상태",
    },
    {
        value: "CLICKED_LINK",
        label: "링크를 눌렀어요",
        description: "문자나 메시지의 링크를 클릭",
    },
    {
        value: "INSTALLED_APP",
        label: "앱을 설치했어요",
        description: "출처가 불분명한 앱 설치",
    },
    {
        value: "SHARED_INFO",
        label: "개인정보를 알려줬어요",
        description: "계좌번호·주민번호 등",
    },
    {
        value: "SHARED_AUTH",
        label: "인증정보를 알려줬어요",
        description: "OTP·인증번호·비밀번호 등",
    },
    {
        value: "SENT_MONEY",
        label: "이미 돈을 보냈어요",
        description: "계좌이체 또는 송금 완료",
    },
];

export default function SituationSelector({
                                              value,
                                              onChange,
                                          }: Props) {
    return (
        <div className="situation-selector">
            <div className="situation-selector__header">
                <div>
                    <span className="situation-selector__eyebrow">
                        CURRENT SITUATION
                    </span>

                    <h2>현재 어떤 상황인가요?</h2>
                </div>

                <p>
                    상황을 선택하면 대응 방법을
                    <br />
                    더 정확하게 안내할 수 있어요.
                </p>
            </div>

            <div className="situation-selector__grid">
                {situations.map((item) => {
                    const active =
                        value === item.value;

                    return (
                        <button
                            key={item.value}
                            type="button"
                            aria-pressed={active}
                            onClick={() =>
                                onChange(item.value)
                            }
                            className={`situation-selector__item${
                                active
                                    ? " situation-selector__item--active"
                                    : ""
                            }`}
                        >
                            <span className="situation-selector__check">
                                {active ? "✓" : ""}
                            </span>

                            <strong>
                                {item.label}
                            </strong>

                            <small>
                                {item.description}
                            </small>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
