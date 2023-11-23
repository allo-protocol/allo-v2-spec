BEGIN;
    CREATE FUNCTION public.profiles_by_owner("chainId" varchar, "owner" varchar) 
    RETURNS setof public.profile AS $$
        SELECT profile.* FROM profile 
        WHERE chain_id = $1
        AND owner = $2;
    $$ LANGUAGE sql STABLE;
    COMMENT ON FUNCTION profiles_by_owner("chainId" varchar, "owner" varchar) is E'@filterable\n@sortable';
COMMIT;