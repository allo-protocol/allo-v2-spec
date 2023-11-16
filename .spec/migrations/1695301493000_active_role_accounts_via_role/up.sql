BEGIN;
    CREATE FUNCTION role_active_accounts(r role) 
    RETURNS setof role_account AS $$
        SELECT ra.* FROM role_account ra 
            WHERE ra.role_id = r.role_id 
            AND ra.chain_id = r.chain_id 
            AND is_active = true;
    $$ LANGUAGE sql stable;
COMMIT;