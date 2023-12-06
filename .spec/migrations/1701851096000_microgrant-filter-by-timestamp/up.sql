-- Function to filter microGrants before allocationStartTime
CREATE OR REPLACE FUNCTION public.micro_grants_before_start_time(start_time int4)
RETURNS SETOF public.micro_grant AS $$
    SELECT * FROM public.micro_grant
    WHERE allocation_start_time < start_time;
$$ LANGUAGE sql STABLE;

COMMENT ON FUNCTION micro_grants_before_start_time(start_time int4) IS E'@filterable\n@sortable';


-- Function to filter microGrants after allocationEndTime
CREATE OR REPLACE FUNCTION public.micro_grants_after_end_time(end_time int4)
RETURNS SETOF public.micro_grant AS $$
    SELECT * FROM public.micro_grant
    WHERE allocation_end_time > end_time;
$$ LANGUAGE sql STABLE;

COMMENT ON FUNCTION micro_grants_after_end_time(end_time int4) IS E'@filterable\n@sortable';


-- Function to filter microGrants between allocationStartTime and allocationEndTime
CREATE OR REPLACE FUNCTION public.micro_grants_between_times(start_time int4, end_time int4)
RETURNS SETOF public.micro_grant AS $$
    SELECT * FROM public.micro_grant
    WHERE allocation_start_time >= start_time
        AND allocation_end_time <= end_time;
$$ LANGUAGE sql STABLE;

COMMENT ON FUNCTION micro_grants_between_times(start_time int4, end_time int4) IS E'@filterable\n@sortable';
