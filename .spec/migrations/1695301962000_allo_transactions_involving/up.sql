BEGIN;
    CREATE FUNCTION allo_transactions_involving("chainId" varchar, "address" varchar) 
    RETURNS setof allo_transaction AS $$
        SELECT allo_transaction.* FROM allo_transaction 
        WHERE chain_id = "chainId" 
        AND (to_address = "address" OR from_address = "address");
    $$ LANGUAGE sql STABLE;
    COMMENT ON FUNCTION allo_transactions_involving("chainId" varchar, "address" varchar) is E'@filterable\n@sortable';
COMMIT;