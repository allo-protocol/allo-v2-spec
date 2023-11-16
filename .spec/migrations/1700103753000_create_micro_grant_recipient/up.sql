BEGIN;
    create table public.micro_grant_recipient (recipient_id varchar, strategy varchar, pool_id varchar, recipient_address varchar, requested_amount varchar, is_using_registry_anchor boolean, status varchar, metadata_protocol int4, metadata_pointer varchar, sender varchar, block_hash varchar, block_number int8, block_timestamp timestamptz, chain_id varchar);
    alter table public.micro_grant_recipient add constraint pk_jnpbpd1anfnpfodbhjkytk primary key (chain_id, pool_id, recipient_id);
    create index idx_54ztj7bcv26673wnpedicz on public.micro_grant_recipient (block_number, chain_id);
    create index idx_huoesckacmdwmpraws6qv8 on public.micro_grant_recipient (block_timestamp);
    COMMENT ON TABLE public.micro_grant_recipient IS E'@foreignKey (chain_id, pool_id) references public.micro_grant (chain_id, pool_id)|@fieldName microGrant|@foreignFieldName microGrantRecipients';
COMMIT;