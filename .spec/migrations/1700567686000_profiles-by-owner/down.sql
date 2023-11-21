BEGIN;
    DROP FUNCTION profiles_by_owner("chainId" varchar, "owner" varchar);
COMMIT;