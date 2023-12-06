-- Function to filter microGrants before allocationStartTime
CREATE OR REPLACE FUNCTION public.upcoming_micro_grants()
RETURNS SETOF public.micro_grant AS $$
    SELECT * FROM public.micro_grant
    WHERE allocation_start_time > EXTRACT(EPOCH FROM CURRENT_TIMESTAMP)::int4;
$$ LANGUAGE sql STABLE;

COMMENT ON FUNCTION upcoming_micro_grants() IS E'@filterable\n@sortable';


-- Function to filter microGrants after allocationEndTime
CREATE OR REPLACE FUNCTION public.ended_micro_grants()
RETURNS SETOF public.micro_grant AS $$
    SELECT * FROM public.micro_grant
    WHERE allocation_end_time < EXTRACT(EPOCH FROM CURRENT_TIMESTAMP)::int4;
$$ LANGUAGE sql STABLE;

COMMENT ON FUNCTION ended_micro_grants() IS E'@filterable\n@sortable';


-- Function to filter microGrants between allocationStartTime and allocationEndTime
CREATE OR REPLACE FUNCTION public.active_micro_grants()
RETURNS SETOF public.micro_grant AS $$
    SELECT * FROM public.micro_grant
    WHERE allocation_start_time <= EXTRACT(EPOCH FROM CURRENT_TIMESTAMP)::int4
        AND allocation_end_time >= EXTRACT(EPOCH FROM CURRENT_TIMESTAMP)::int4;
$$ LANGUAGE sql STABLE;

COMMENT ON FUNCTION active_micro_grants() IS E'@filterable\n@sortable';
