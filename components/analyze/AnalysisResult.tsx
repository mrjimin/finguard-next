import type {
    Analysis,
    Situation,
} from "@/types/analysis";

import RiskBadge from "../RiskBadge";
import ActionChecklist from "./ActionChecklist";

interface Props {
    analysis: Analysis;
    situation: Situation;
    onReset: () => void;
}

export default function AnalysisResult({
                                           analysis,
                                           situation,
                                           onReset,
                                       }: Props) {
    return (
        <section className="analysis-result">
            <header className="analysis-result__header">
                <div>
                    <span className="analysis-result__eyebrow">
                        AI RISK ASSESSMENT
                    </span>

                    <h2 className="analysis-result__title">
                        {analysis.scamType}
                    </h2>
                </div>

                <RiskBadge
                    level={analysis.riskLevel}
                />
            </header>

            <div className="analysis-result__body">
                <p className="analysis-result__summary">
                    {analysis.summary}
                </p>

                {analysis.signals.length > 0 && (
                    <div className="analysis-result__signals">
                        <div className="analysis-result__signals-header">
                            <span>
                                DETECTED SIGNALS
                            </span>

                            <span>
                                {analysis.signals.length}
                            </span>
                        </div>

                        <div className="analysis-result__signals-list">
                            {analysis.signals.map(
                                (signal, index) => (
                                    <div
                                        className="analysis-result__signal"
                                        key={`${signal}-${index}`}
                                    >
                                        <span>
                                            {String(
                                                index + 1
                                            ).padStart(
                                                2,
                                                "0"
                                            )}
                                        </span>

                                        <p>
                                            {signal}
                                        </p>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                )}

                <ActionChecklist
                    situation={situation}
                />

                <button
                    type="button"
                    onClick={onReset}
                    className="analysis-result__reset"
                >
                    <span>←</span>
                    새로운 상황 분석하기
                </button>
            </div>
        </section>
    );
}
