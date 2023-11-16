BEGIN;
    CREATE TABLE public.allo (
        chain_id character varying not null,
        registry character varying,
        fee_percentage character varying default '0',
        base_fee character varying default '0',
        treasury character varying,
        cloneable_strategies json default '[]',
        block_hash character varying not null,
        block_number bigint not null,
        updated_at timestamp with time zone not null
    );
    COMMENT ON TABLE public.allo IS 'Global data';
    ALTER TABLE public.allo ADD CONSTRAINT pk_6k1s5rvcp2wfcxm1umfmfp PRIMARY KEY (chain_id);
COMMIT;