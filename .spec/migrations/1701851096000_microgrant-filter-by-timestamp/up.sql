-- Function to filter microGrants before allocationStartTime
CREATE OR REPLACE FUNCTION public.upcoming_micro_grants(start_time int4)
RETURNS SETOF public.micro_grant AS $$
    SELECT * FROM public.micro_grant
    WHERE allocation_start_time < start_time;
$$ LANGUAGE sql STABLE;

COMMENT ON FUNCTION upcoming_micro_grants(start_time int4) IS E'@filterable\n@sortable';


-- Function to filter microGrants after allocationEndTime
CREATE OR REPLACE FUNCTION public.ended_micro_grants(end_time int4)
RETURNS SETOF public.micro_grant AS $$
    SELECT * FROM public.micro_grant
    WHERE allocation_end_time > end_time;
$$ LANGUAGE sql STABLE;

COMMENT ON FUNCTION ended_micro_grants(end_time int4) IS E'@filterable\n@sortable';


-- Function to filter microGrants between allocationStartTime and allocationEndTime
CREATE OR REPLACE FUNCTION public.active_micro_grants(start_time int4, end_time int4)
RETURNS SETOF public.micro_grant AS $$
    SELECT * FROM public.micro_grant
    WHERE allocation_start_time >= start_time
        AND allocation_end_time <= end_time;
$$ LANGUAGE sql STABLE;

COMMENT ON FUNCTION active_micro_grants(start_time int4, end_time int4) IS E'@filterable\n@sortable';
