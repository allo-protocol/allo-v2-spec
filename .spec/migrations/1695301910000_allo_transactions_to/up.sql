BEGIN;
    CREATE FUNCTION allo_transactions_to("chainId" varchar, "toAddress" varchar) 
    RETURNS setof allo_transaction AS $$
        SELECT allo_transaction.* FROM allo_transaction 
        WHERE chain_id = "chainId" 
        AND to_address = "toAddress";
    $$ LANGUAGE sql STABLE;
    COMMENT ON FUNCTION allo_transactions_to("chainId" varchar, "toAddress" varchar) is E'@filterable\n@sortable';
COMMIT;