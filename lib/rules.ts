import type { RiskLevel } from "@/types/analysis";

interface RuleResult {
    riskLevel?: RiskLevel;
    signals: string[];
}

interface Rule {
    keywords: string[];
    riskLevel: RiskLevel;
    signal: string;
    exclude?: string[];
}

const rules: Rule[] = [
    // =========================
    // CRITICAL
    // =========================

    {
        keywords: [
            "otp",
            "인증번호",
            "보안카드",
            "비밀번호",
        ],
        riskLevel: "CRITICAL",
        signal: "금융 인증정보 입력 또는 제공을 요구하고 있습니다.",
        exclude: [
            "요구하지 않습니다",
            "요구하지 않아요",
            "요구하지 않습니다.",
            "제공하지 않습니다",
            "제공하지 않아요",
            "입력하지 마세요",
            "입력하지 않습니다",
            "필요하지 않습니다",
            "필요 없습니다",
            "요구하지 않는",
        ],
    },

    {
        keywords: [
            "송금해주세요",
            "송금해 주세요",
            "송금하라고",
            "송금하라는",
            "이체해주세요",
            "이체해 주세요",
            "이체하라고",
            "입금해주세요",
            "입금해 주세요",
            "안전계좌",
            "안전 계좌",
            "보호계좌",
            "보호 계좌",
        ],
        riskLevel: "CRITICAL",
        signal: "자금 이체 또는 송금을 요구하고 있습니다.",
        exclude: [
            "송금하지 마세요",
            "이체하지 마세요",
            "입금하지 마세요",
            "송금이 필요하지 않습니다",
            "이체가 필요하지 않습니다",
            "송금을 요구하지 않습니다",
        ],
    },

    {
        keywords: [
            "원격제어",
            "원격 제어",
            "원격앱",
            "원격 앱",
            "원격 프로그램",
            "앱 설치",
            "어플 설치",
            "앱을 설치",
            "어플을 설치",
        ],
        riskLevel: "CRITICAL",
        signal: "원격제어 또는 출처가 불분명한 앱 설치를 유도하고 있습니다.",
        exclude: [
            "설치하지 마세요",
            "설치하지 않습니다",
            "설치할 필요 없습니다",
            "설치가 필요하지 않습니다",
            "앱 설치를 요구하지 않습니다",
        ],
    },

    // =========================
    // HIGH
    // =========================

    {
        keywords: [
            "금융안전센터",
            "은행 보안센터",
            "은행 직원",
            "금융기관 직원",
            "금융감독원",
            "검찰청",
            "경찰청",
            "수사기관",
        ],
        riskLevel: "HIGH",
        signal: "금융기관 또는 공공기관을 사칭하는 정황이 있습니다.",
    },

    {
        keywords: [
            "주민번호",
            "주민등록번호",
            "계좌번호",
            "카드번호",
            "개인정보",
            "금융정보",
        ],
        riskLevel: "HIGH",
        signal: "개인정보 또는 금융정보 제공을 요구하고 있습니다.",
        exclude: [
            "요구하지 않습니다",
            "요구하지 않아요",
            "제공하지 않습니다",
            "제공하지 않아요",
            "입력하지 마세요",
            "입력하지 않습니다",
            "필요하지 않습니다",
            "필요 없습니다",
            "요구하지 않는",
        ],
    },

    {
        keywords: [
            "계좌가 정지",
            "계좌 정지",
            "계좌가 차단",
            "계좌 차단",
            "수사 대상",
            "법적 조치",
            "체포",
            "고발",
        ],
        riskLevel: "HIGH",
        signal: "계좌 정지나 법적 조치를 언급하며 불안감을 유도하고 있습니다.",
        exclude: [
            "사칭",
            "주의",
            "예방",
            "조심",
        ],
    },

    // =========================
    // MEDIUM
    // =========================

    {
        keywords: [
            "링크를 클릭",
            "링크를 눌러",
            "링크를 통해",
            "아래 링크",
            "링크에 접속",
            "url에 접속",
            "주소로 접속",
            "웹페이지에 접속",
        ],
        riskLevel: "MEDIUM",
        signal: "외부 링크 또는 웹페이지 접속을 유도하고 있습니다.",
        exclude: [
            "클릭하지 마세요",
            "누르지 마세요",
            "접속하지 마세요",
            "링크를 클릭하지",
            "링크를 누르지",
        ],
    },

    {
        keywords: [
            "본인 인증",
            "본인인증",
            "본인 확인",
            "본인확인",
            "계좌 확인",
            "계정 확인",
        ],
        riskLevel: "MEDIUM",
        signal: "본인 확인 또는 계좌 확인을 위해 추가 행동을 유도하고 있습니다.",
        exclude: [
            "본인 인증이 필요하지 않습니다",
            "본인 확인이 필요하지 않습니다",
            "본인 확인을 요구하지 않습니다",
            "계좌 확인이 필요하지 않습니다",
            "공식 홈페이지에서 본인 확인",
            "공식 고객센터에서 확인",
        ],
    },

    {
        keywords: [
            "긴급",
            "즉시",
            "지금 바로",
            "오늘까지",
            "24시간 이내",
            "곧 정지",
            "곧 차단",
        ],
        riskLevel: "MEDIUM",
        signal: "긴급성을 강조하여 즉각적인 행동을 유도하고 있습니다.",
        exclude: [
            "긴급하지 않습니다",
            "즉시 행동할 필요 없습니다",
            "주의를 위한 안내",
        ],
    },
];

export function analyzeRules(
    message: string
): RuleResult {
    const normalized = message
        .toLowerCase()
        .replace(/\s+/g, " ")
        .trim();

    const matchedRules = rules.filter((rule) => {
        const hasKeyword = rule.keywords.some((keyword) =>
            normalized.includes(keyword.toLowerCase())
        );

        if (!hasKeyword) {
            return false;
        }

        const hasExcludedPhrase =
            rule.exclude?.some((phrase) =>
                normalized.includes(phrase.toLowerCase())
            ) ?? false;

        return !hasExcludedPhrase;
    });

    if (matchedRules.length === 0) {
        return {
            signals: [],
        };
    }

    const highestRisk = matchedRules.reduce<RiskLevel>(
        (highest, rule) => {
            return getRiskScore(rule.riskLevel) >
            getRiskScore(highest)
                ? rule.riskLevel
                : highest;
        },
        "LOW"
    );

    const signals = [
        ...new Set(
            matchedRules.map((rule) => rule.signal)
        ),
    ].slice(0, 3);

    return {
        riskLevel: highestRisk,
        signals,
    };
}

function getRiskScore(
    level: RiskLevel
): number {
    return {
        LOW: 0,
        MEDIUM: 1,
        HIGH: 2,
        CRITICAL: 3,
    }[level];
}
