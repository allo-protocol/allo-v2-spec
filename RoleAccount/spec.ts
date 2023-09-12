import { LiveObject, Spec, Property, Event, OnEvent, Address } from '@spec.dev/core'

/**
 * Relationship between Role and Account in allo v2
 */
@Spec({ 
    uniqueBy: ['someProperty', 'chainId'] 
})
class RoleAccount extends LiveObject {
    // TODO
    @Property()
    someProperty: Address

    // ==== Event Handlers ===================

    @OnEvent('namespace.ContractName.EventName')
    onSomeEvent(event: Event) {
        this.someProperty = event.data.someProperty
    }
}

export default RoleAccount