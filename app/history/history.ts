import { supabase } from "@/lib/supabase";
import type { RiskLevel } from "@/types/analysis";

export const HISTORY_PAGE_SIZE = 20;

export interface AnalysisHistory {
    id: string;
    created_at: string;
    risk_level: RiskLevel;
    scam_type: string;
}

export interface HistorySummary {
    total: number;
    low: number;
    medium: number;
    high: number;
    critical: number;
}

export interface HistoryPageData {
    data: AnalysisHistory[];
    hasNextPage: boolean;
}

export async function getHistorySummary(): Promise<HistorySummary> {
    const { data, error } = await supabase.rpc(
        "get_analysis_history_summary"
    );

    if (error || !data) {
        return {
            total: 0,
            low: 0,
            medium: 0,
            high: 0,
            critical: 0,
        };
    }

    return {
        total: Number(data.total ?? 0),
        low: Number(data.low ?? 0),
        medium: Number(data.medium ?? 0),
        high: Number(data.high ?? 0),
        critical: Number(data.critical ?? 0),
    };
}

export async function getHistoryPage(
    page: number
): Promise<HistoryPageData> {
    const safePage = Math.max(
        1,
        Number.isFinite(page) ? page : 1
    );

    const from =
        (safePage - 1) * HISTORY_PAGE_SIZE;

    const to =
        from + HISTORY_PAGE_SIZE;

    const { data, error } = await supabase
        .from("analysis_history")
        .select(
            "id, created_at, risk_level, scam_type"
        )
        .order("created_at", {
            ascending: false,
        })
        .range(from, to);

    if (error) {
        return {
            data: [],
            hasNextPage: false,
        };
    }

    const rows =
        (data ?? []) as AnalysisHistory[];

    const hasNextPage =
        rows.length > HISTORY_PAGE_SIZE;

    return {
        data: hasNextPage
            ? rows.slice(0, HISTORY_PAGE_SIZE)
            : rows,
        hasNextPage,
    };
}
