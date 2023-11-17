BEGIN;
    drop index idx_allocated_micro_grant;
    drop index idx_distributed_micro_grant;
    drop index idx_micro_grant_by_strategy;
COMMIT;