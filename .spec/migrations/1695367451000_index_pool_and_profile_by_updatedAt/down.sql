BEGIN;
    DROP INDEX public.idx_profile_index_by_updatedAt;
    DROP INDEX public.idx_pool_index_by_updatedAt;
COMMIT;