import { LiveObject, Spec, Property, Event, OnEvent, Address } from '@spec.dev/core'

/**
 * Role which are used in allo v2 core
 */
@Spec({ 
    uniqueBy: ['someProperty', 'chainId'] 
})
class Role extends LiveObject {
    // TODO
    @Property()
    someProperty: Address

    // ==== Event Handlers ===================

    @OnEvent('namespace.ContractName.EventName')
    onSomeEvent(event: Event) {
        this.someProperty = event.data.someProperty
    }
}

export default Role