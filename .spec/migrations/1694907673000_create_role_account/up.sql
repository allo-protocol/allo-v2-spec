BEGIN;
    CREATE TABLE public.role_account (
        role_id character varying not null,
        account_id character varying not null,
        chain_id character varying not null,
        is_active boolean,
        block_hash character varying not null,
        block_number bigint not null,
        updated_at timestamp with time zone not null
    );
    COMMENT ON TABLE public.role_account IS E'@foreignKey (role_id, chain_id) references public.role (role_id, chain_id)|@fieldName role|@foreignFieldName roleAccounts\n@foreignKey (account_id, chain_id) references public.account (account_id, chain_id)|@fieldName account|@foreignFieldName roleAccounts';
    ALTER TABLE public.role_account ADD CONSTRAINT pk_cydhcuusetabsxplbzt4gf PRIMARY KEY (role_id, account_id, chain_id);
    CREATE INDEX idx_hr6tyvuqzs4wjaprt6hrqu ON public.role_account(role_id, chain_id);
    CREATE INDEX idx_igujgkxysreeip8shgohwf ON public.role_account(account_id, chain_id);
COMMIT;