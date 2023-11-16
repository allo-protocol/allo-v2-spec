BEGIN;
    CREATE INDEX idx_allo_transaction_block_timestamp ON public.allo_transaction(block_timestamp);
COMMIT;