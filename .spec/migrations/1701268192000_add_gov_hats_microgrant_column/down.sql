BEGIN;
    ALTER TABLE public.micro_grant DROP COLUMN gov;
    ALTER TABLE public.micro_grant DROP COLUMN snapshotReference;
    ALTER TABLE public.micro_grant DROP COLUMN minVotePower;
    ALTER TABLE public.micro_grant DROP COLUMN hats;
    ALTER TABLE public.micro_grant DROP COLUMN hatId;
COMMIT;