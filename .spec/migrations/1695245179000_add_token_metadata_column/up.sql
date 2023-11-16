BEGIN;
    ALTER TABLE public.pool ADD COLUMN token_metadata json;
COMMIT;