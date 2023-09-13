import { Address,Event, LiveObject, OnEvent, Property, Spec } from '@spec.dev/core'

/**
 * All accounts on Allo V2.
 */
@Spec({
    uniqueBy: ['accountId', 'chainId']
})
class Account extends LiveObject {

    @Property()
    accountId: Address

    // ====================
    // =  Event Handlers  =
    // ====================

    // @dev: This is cause Profile.owner is not set via OZ roles
    @OnEvent('allov2.Registry.ProfileCreated')
    createForProfileOwner(event: Event) {
        this.accountId = event.data.owner
    }

    @OnEvent('allov2.Allo.RoleGranted')
    @OnEvent('allov2.Registry.RoleGranted')
    createForRole(event: Event) {
        this.accountId = event.data.account
    }
}

export default Account