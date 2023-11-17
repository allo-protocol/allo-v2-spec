BEGIN;
    create table public.distributed (recipient_id varchar, recipient_address varchar, amount varchar, sender varchar, contract_name varchar, contract_address varchar, transaction_hash varchar, log_index int4, block_hash varchar, block_number int8, block_timestamp timestamptz, chain_id varchar);
    alter table public.distributed add constraint pk_wmjkmyft4jsezeqj5reuq9 primary key (transaction_hash, log_index);
    create index idx_ipnkl2uh6ak1jmqe3buqxe on public.distributed (block_number, chain_id);
    create index idx_ig1upbfdlsjfchmxhrdhgp on public.distributed (block_timestamp);
    COMMENT ON TABLE public.distributed IS E'@foreignKey (contract_address, chain_id) references public.micro_grant (strategy, chain_id)|@fieldName microGrant|@foreignFieldName distributeds';
COMMIT;