BEGIN;
    create table public.micro_grant (strategy varchar, strategy_id varchar, pool_id varchar, use_registry_anchor boolean, allocation_start_time int4, allocation_end_time int4, approval_threshold int4, max_requested_amount varchar, block_hash varchar, block_number int8, block_timestamp timestamptz, chain_id varchar);
    alter table public.micro_grant add constraint pk_g3r9zttgztjuzmgujyrsws primary key (chain_id, pool_id);
    create index idx_8cnb4lbdfazzbj8nqvsv5v on public.micro_grant (block_number, chain_id);
    create index idx_ecnzwnieua9drcwdvuip6w on public.micro_grant (block_timestamp);
    COMMENT ON TABLE public.micro_grant IS E'@foreignKey (pool_id, chain_id) references public.pool (pool_id, chain_id)|@fieldName pool';
COMMIT;