BEGIN;
    CREATE INDEX idx_profile_index_by_createdAt ON public.profile(created_at);
COMMIT;