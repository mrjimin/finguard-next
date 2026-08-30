export type RiskLevel =
    | "LOW"
    | "MEDIUM"
    | "HIGH"
    | "CRITICAL";

export type Situation =
    | "NONE"
    | "CLICKED_LINK"
    | "INSTALLED_APP"
    | "SHARED_INFO"
    | "SHARED_AUTH"
    | "SENT_MONEY";

export interface Analysis {
    riskLevel: RiskLevel;
    scamType: string;
    summary: string;
    signals: string[];
}

export interface AnalyzeRequest {
    message: string;
    situation: Situation | null;
}

export interface AnalyzeResponse {
    success: boolean;
    data?: Analysis;
    error?: string;
}
