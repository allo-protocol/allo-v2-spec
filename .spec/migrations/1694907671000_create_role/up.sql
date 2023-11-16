BEGIN;
    CREATE TABLE public.role (
        role_id character varying not null,
        chain_id character varying not null,
        block_hash character varying not null,
        block_number bigint not null,
        updated_at timestamp with time zone not null
    );
    COMMENT ON TABLE public.role IS 'Roles which are used in allo v2 core';
    ALTER TABLE public.role ADD CONSTRAINT pk_kn7sa5ywnhrbejbv1k1tu5 PRIMARY KEY (role_id, chain_id);
COMMIT;