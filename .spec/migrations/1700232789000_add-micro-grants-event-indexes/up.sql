BEGIN;
    create index idx_allocated_micro_grant on public.allocated (contract_address, chain_id);
    create index idx_distributed_micro_grant on public.distributed (contract_address, chain_id);
    create index idx_micro_grant_by_strategy on public.micro_grant (strategy, chain_id);
COMMIT;