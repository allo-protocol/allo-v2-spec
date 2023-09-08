import { LiveObject, Spec, Property, Event, OnEvent, Address, Timestamp } from '@spec.dev/core'

/**
 * Global data
 */
@Spec({ 
    uniqueBy: ['chainId'] 
})
class Allo extends LiveObject {
    
    @Property()
    registry: Address

    @Property()
    feePercentage: BigInt

    @Property()
    baseFee: BigInt

    @Property()
    treasury: Address

    // TODO: ask what the best way to do this. create a new object ?
    @Property()
    cloneableStrategies: Address[]

    @Property()
    updatedAt: Timestamp

    // ==== Event Handlers ===================

    @OnEvent('allov2.Allo.RegistryUpdated')
    onSomeEvent(event: Event) {
        this.registry = event.data.registry
        this.updatedAt = this.blockTimestamp
    }

    @OnEvent('allov2.Allo.FeePercentageUpdated')
    onFeePercentageUpdated(event: Event) {
        this.feePercentage = event.data.feePercentage
        this.updatedAt = this.blockTimestamp
    }

    @OnEvent('allov2.Allo.BaseFeeUpdated')
    onBaseFeeUpdated(event: Event) {
        this.baseFee = event.data.baseFee
        this.updatedAt = this.blockTimestamp
    }

    @OnEvent('allov2.Allo.TreasuryUpdated')
    onTreasuryUpdated(event: Event) {
        this.treasury = event.data.treasury
        this.updatedAt = this.blockTimestamp
    }

    // TODO: would strategies have to be another object
    // @OnEvent('allov2.Allo.StrategyApproved')
    // onStrategyApproved(event: Event) {
    //     this.cloneableStrategies.push(event.data.strategy)
    //     this.updatedAt = this.blockTimestamp
    // }

    // @OnEvent('allov2.Allo.StrategyRemoved')
    // onStrategyRemoved(event: Event) {
    //     this.cloneableStrategies = this.cloneableStrategies.filter((strategy) => strategy !== event.data.strategy)
    //     this.updatedAt = this.blockTimestamp
    // }
}

export default Allo