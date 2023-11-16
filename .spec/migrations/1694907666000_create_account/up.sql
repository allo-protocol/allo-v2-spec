BEGIN;
    CREATE TABLE public.account (
        account_id character varying not null,
        chain_id character varying not null,
        block_hash character varying not null,
        block_number bigint not null,
        updated_at timestamp with time zone not null
    );
    COMMENT ON TABLE public.account IS 'Account which has roles associated with it on allo v2';
    ALTER TABLE public.account ADD CONSTRAINT pk_kt2fxixpldeh2n9mginghq PRIMARY KEY (account_id, chain_id);
COMMIT;