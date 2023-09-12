import { Event, LiveObject, OnEvent, Property, saveAll,Spec } from '@spec.dev/core'

import { generatePoolRoleIds } from '../shared/roles.ts'

/**
 * A role on Allo.
 */
@Spec({
    uniqueBy: ['roleId', 'chainId']
})
class Role extends LiveObject {

    @Property()
    roleId: string

    // ====================
    // =  Event Handlers  =
    // ====================

    // @dev: This is cause Profile.owner is not set via OZ roles
    @OnEvent('allov2.Registry.ProfileCreated')
    createProfileRole(event: Event) {
        this.roleId = event.data.profileId
    }

    @OnEvent('allov2.Allo.RoleGranted')
    @OnEvent('allov2.Allo.RoleRevoked')
    @OnEvent('allov2.Registry.RoleRevoked')
    @OnEvent('allov2.Registry.RoleGranted')
    createAccountRole(event: Event) {
        // TODO: why do we need this for RoleRevoked?
        this.roleId = event.data.role
    }

    @OnEvent('allov2.Allo.PoolCreated', { autoSave: false })
    async createPoolRoles(event: Event) {
        await saveAll(...generatePoolRoleIds(event.data.poolId).map(
            roleId => this.new(Role, { roleId })
        ))
    }
}

export default Role