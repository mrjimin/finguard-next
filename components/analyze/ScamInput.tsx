interface Props {
    value: string;
    loading: boolean;
    onChange: (value: string) => void;
    onSubmit: () => void;
}

export default function ScamInput({
                                      value,
                                      loading,
                                      onChange,
                                      onSubmit,
                                  }: Props) {
    const disabled =
        loading || !value.trim();

    return (
        <div className="scam-input">
            <div className="scam-input__field">
                <textarea
                    value={value}
                    disabled={loading}
                    maxLength={1500}
                    onChange={(event) =>
                        onChange(event.target.value)
                    }
                    placeholder="의심스러운 문자나 전화 내용을 입력해주세요..."
                    aria-label="의심스러운 금융 연락 내용"
                />

                <div className="scam-input__meta">
                    <span>MESSAGE</span>

                    <span>
                        {value.length.toLocaleString()} / 3,000
                    </span>
                </div>
            </div>

            <button
                type="button"
                disabled={disabled}
                onClick={onSubmit}
                className="analysis-submit"
            >
                <span>
                    {loading
                        ? "분석 중..."
                        : "AI 분석하기"}
                </span>

                {!loading && (
                    <span>→</span>
                )}
            </button>
        </div>
    );
}
