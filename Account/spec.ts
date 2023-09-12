import { LiveObject, Spec, Property, Event, OnEvent, Address } from '@spec.dev/core'

/**
 * Account which have roles associated with it on allo v2
 */
@Spec({ 
    uniqueBy: ['someProperty', 'chainId'] 
})
class Account extends LiveObject {
    // TODO
    @Property()
    someProperty: Address

    // ==== Event Handlers ===================

    @OnEvent('namespace.ContractName.EventName')
    onSomeEvent(event: Event) {
        this.someProperty = event.data.someProperty
    }
}

export default Account