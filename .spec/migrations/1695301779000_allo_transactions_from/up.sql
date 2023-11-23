BEGIN;
    CREATE FUNCTION public.allo_transactions_from("chainId" varchar, "fromAddress" varchar) 
    RETURNS setof public.allo_transaction AS $$
        SELECT allo_transaction.* FROM allo_transaction 
        WHERE chain_id = "chainId" 
        AND from_address = "fromAddress";
    $$ LANGUAGE sql STABLE;
    COMMENT ON FUNCTION allo_transactions_from("chainId" varchar, "fromAddress" varchar) is E'@filterable\n@sortable';
COMMIT;