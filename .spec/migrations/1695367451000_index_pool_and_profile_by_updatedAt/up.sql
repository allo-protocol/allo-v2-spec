BEGIN;
    CREATE INDEX idx_profile_index_by_updatedAt ON public.profile(updated_at);
    CREATE INDEX idx_pool_index_by_updatedAt ON public.pool(updated_at);
COMMIT;