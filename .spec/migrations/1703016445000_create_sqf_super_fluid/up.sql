BEGIN;
    create table public.sqf_super_fluid (strategy varchar, strategy_id varchar, pool_id varchar, use_registry_anchor boolean, metadata_required boolean, registration_start_time int4, registration_end_time int4, allocation_start_time int4, allocation_end_time int4, passport_decoder varchar, min_passport_score varchar, super_fluid_host varchar, allocation_super_token varchar, initial_super_app_balance varchar, gda_pool varchar, distribution_flow_rate varchar, block_hash varchar, block_number int8, block_timestamp timestamptz, chain_id varchar);
    alter table public.sqf_super_fluid add constraint pk_bxz1yr56kbuzpw4ciskciu primary key (chain_id, pool_id);
    create index idx_2xde4lxzivx82hybgqgtw5 on public.sqf_super_fluid (block_number, chain_id);
    create index idx_vpn8pelssvauzqrxes255g on public.sqf_super_fluid (block_timestamp);
COMMIT;