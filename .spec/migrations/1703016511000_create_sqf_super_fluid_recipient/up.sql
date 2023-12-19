BEGIN;
    create table public.sqf_super_fluid_recipient (recipient_id varchar, strategy varchar, pool_id varchar, recipient_address varchar, total_units int4, flow_rate int4, super_app varchar, is_using_registry_anchor boolean, status varchar, metadata_protocol int4, metadata_pointer varchar, sender varchar, block_hash varchar, block_number int8, block_timestamp timestamptz, chain_id varchar);
    alter table public.sqf_super_fluid_recipient add constraint pk_p17mvnpzkrh3mru3wusegs primary key (chain_id, pool_id, recipient_id);
    create index idx_8smrqss7p4vmgcmftau7xh on public.sqf_super_fluid_recipient (block_number, chain_id);
    create index idx_f1ybhbtdrhkpual1bxa4hp on public.sqf_super_fluid_recipient (block_timestamp);
    COMMENT ON TABLE public.sqf_super_fluid_recipient IS E'@foreignKey (chain_id, pool_id) references public.sqf_super_fluid (chain_id, pool_id)|@fieldName sqfSuperFluid|@foreignFieldName sqfSuperFluidRecipients';
COMMIT;