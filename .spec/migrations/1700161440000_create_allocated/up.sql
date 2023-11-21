BEGIN;
    create table public.allocated (recipient_id varchar, status varchar, sender varchar, contract_name varchar, contract_address varchar, transaction_hash varchar, log_index int4, block_hash varchar, block_number int8, block_timestamp timestamptz, chain_id varchar);
    alter table public.allocated add constraint pk_aj9tf1zqrudmfm6lhjbxex primary key (transaction_hash, log_index);
    create index idx_wxeewmbofi3ugmxszruupy on public.allocated (block_number, chain_id);
    create index idx_7ddunrdjfzvd9kgawjf51h on public.allocated (block_timestamp);
    COMMENT ON TABLE public.allocated IS E'@foreignKey (contract_address, chain_id) references public.micro_grant (strategy, chain_id)|@fieldName microGrant|@foreignFieldName allocateds';
COMMIT;