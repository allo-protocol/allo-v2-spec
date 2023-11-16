BEGIN;
    CREATE TABLE public.pool (
        pool_id character varying not null,
        chain_id character varying not null,
        profile_id character varying,
        strategy character varying,
        token character varying,
        amount character varying default '0',
        fee_paid character varying default '0',
        base_fee_paid character varying default '0',
        metadata_protocol integer,
        metadata_pointer character varying,
        manager_role_id character varying,
        admin_role_id character varying,
        created_at timestamp with time zone,
        block_hash character varying not null,
        block_number bigint not null,
        updated_at timestamp with time zone not null
    );
    COMMENT ON TABLE public.pool IS E'@foreignKey (profile_id, chain_id) references public.profile (profile_id, chain_id)|@fieldName profile|@foreignFieldName pools\n@foreignKey (manager_role_id, chain_id) references public.role (role_id, chain_id)|@fieldName managerRole|@foreignFieldName managerPools\n@foreignKey (admin_role_id, chain_id) references public.role (role_id, chain_id)|@fieldName adminRole|@foreignFieldName adminPools';
    ALTER TABLE public.pool ADD CONSTRAINT pk_1wangzv7d5vnjbhiawbn6g PRIMARY KEY (pool_id, chain_id);
    CREATE INDEX idx_ddexoyjknfeihhs6dittzy ON public.pool(profile_id, chain_id);
    CREATE INDEX idx_evkwdwuoqdxnml7qpgd3vk ON public.pool(manager_role_id, chain_id);
    CREATE INDEX idx_rkrxbbk9mvpsurdzezcvhd ON public.pool(admin_role_id, chain_id);
COMMIT;