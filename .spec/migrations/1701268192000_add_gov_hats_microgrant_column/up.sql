BEGIN;
    ALTER TABLE public.micro_grant ADD COLUMN gov varchar;
    ALTER TABLE public.micro_grant ADD COLUMN snapshotReference int4;
    ALTER TABLE public.micro_grant ADD COLUMN minVotePower varchar;
    ALTER TABLE public.micro_grant ADD COLUMN hats varchar;
    ALTER TABLE public.micro_grant ADD COLUMN hatId varchar;
COMMIT;