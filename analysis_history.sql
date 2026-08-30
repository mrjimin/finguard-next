create table public.analysis_history (
    id uuid primary key default gen_random_uuid(),
    situation text not null,
    risk_level text not null,
    scam_type text not null,
    created_at timestamptz not null default now()
);

create index analysis_history_created_at_idx
    on public.analysis_history (created_at desc);
