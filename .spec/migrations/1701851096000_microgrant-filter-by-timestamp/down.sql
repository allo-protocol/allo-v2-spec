-- Drop function to filter microGrants before allocationStartTime
DROP FUNCTION IF EXISTS public.micro_grants_before_start_time(start_time int4);

-- Drop function to filter microGrants after allocationEndTime
DROP FUNCTION IF EXISTS public.micro_grants_after_end_time(end_time int4);

-- Drop function to filter microGrants between allocationStartTime and allocationEndTime
DROP FUNCTION IF EXISTS public.micro_grants_between_times(start_time int4, end_time int4);
