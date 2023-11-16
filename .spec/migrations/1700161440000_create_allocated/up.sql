BEGIN;
    create table public.allocated (recipient_id varchar, amount varchar, token varchar, sender varchar, contract_name varchar, contract_address varchar, transaction_hash varchar, log_index int4, block_hash varchar, block_number int8, block_timestamp timestamptz, chain_id varchar);
    alter table public.allocated add constraint pk_k47uxoehg4i9zev7frj7by primary key (transaction_hash, log_index);
    create index idx_arqirdvyca5ggw3c4simz9 on public.allocated (block_number, chain_id);
    create index idx_19cjr7udaxr3zcn2fgdkch on public.allocated (block_timestamp);
COMMIT;