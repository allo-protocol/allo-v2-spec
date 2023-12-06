-- Drop function to filter microGrants before allocationStartTime
DROP FUNCTION IF EXISTS public.upcoming_micro_grants();

-- Drop function to filter microGrants after allocationEndTime
DROP FUNCTION IF EXISTS public.ended_micro_grants();

-- Drop function to filter microGrants between allocationStartTime and allocationEndTime
DROP FUNCTION IF EXISTS public.active_micro_grants();
