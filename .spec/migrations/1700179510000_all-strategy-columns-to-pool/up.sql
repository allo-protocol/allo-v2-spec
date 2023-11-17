BEGIN;
    ALTER TABLE public.pool ADD COLUMN strategy_id varchar;
    ALTER TABLE public.pool ADD COLUMN strategy_name varchar;
COMMIT;