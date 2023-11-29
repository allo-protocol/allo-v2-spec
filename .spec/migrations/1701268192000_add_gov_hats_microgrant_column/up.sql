BEGIN;
    ALTER TABLE public.micro_grant ADD COLUMN gov varchar;
    ALTER TABLE public.micro_grant ADD COLUMN snapshot_reference int8;
    ALTER TABLE public.micro_grant ADD COLUMN min_vote_power varchar;
    ALTER TABLE public.micro_grant ADD COLUMN hats varchar;
    ALTER TABLE public.micro_grant ADD COLUMN hat_id varchar;
COMMIT;