BEGIN;
    ALTER TABLE public.pool DROP COLUMN token_metadata;
COMMIT;