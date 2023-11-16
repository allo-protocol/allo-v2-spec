BEGIN;
    CREATE TABLE public.profile (
        profile_id character varying not null,
        chain_id character varying not null,
        nonce character varying default '0',
        name character varying,
        metadata_protocol integer,
        metadata_pointer character varying,
        owner character varying,
        anchor character varying,
        creator character varying,
        created_at timestamp with time zone,
        block_hash character varying not null,
        block_number bigint not null,
        updated_at timestamp with time zone not null
    );
    COMMENT ON TABLE public.profile IS E'@foreignKey (owner, chain_id) references public.account (account_id, chain_id)|@fieldName account|@foreignFieldName profiles\n@foreignKey (profile_id, chain_id) references public.role (role_id, chain_id)|@fieldName role|@foreignFieldName profile';
    ALTER TABLE public.profile ADD CONSTRAINT pk_dd4rncu9tcndffad17esv1 PRIMARY KEY (profile_id, chain_id);
    CREATE INDEX idx_mxm2zdkwykhw4prrgsrd73 ON public.profile(owner, chain_id);
    CREATE INDEX idx_gnuynoftw6c9ehtkixtjaz ON public.profile(creator, chain_id);
COMMIT;