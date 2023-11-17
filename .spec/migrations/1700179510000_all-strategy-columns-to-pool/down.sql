BEGIN;
    ALTER TABLE public.pool DROP COLUMN strategy_id;
    ALTER TABLE public.pool DROP COLUMN strategy_name;
COMMIT;