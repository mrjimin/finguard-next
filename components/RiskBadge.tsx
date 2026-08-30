import type { RiskLevel } from "@/types/analysis";

interface Props {
    level: RiskLevel;
}

const labels: Record<RiskLevel, string> = {
    LOW: "낮은 위험",
    MEDIUM: "주의 필요",
    HIGH: "높은 위험",
    CRITICAL: "매우 위험",
};

export default function RiskBadge({ level }: Props) {
    return (
        <span className={`risk-badge risk-badge--${level.toLowerCase()}`}>
            {labels[level]}
        </span>
    );
}