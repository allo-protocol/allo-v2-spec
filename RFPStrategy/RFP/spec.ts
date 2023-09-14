import { Address, BeforeAll, BigInt, Event, LiveObject, OnEvent, Property, Spec } from '@spec.dev/core'

/**
 * RFP details
 */
@Spec({
    uniqueBy: ['strategyId', 'chainId']
})
class RFP extends LiveObject {

    @Property()
    strategyId: Address

    @Property({ default: false })
    active: boolean

    @Property({ default: 0 })
    maxBid: BigInt

    // ====================
    // =  Event Handlers  =
    // ====================

    @BeforeAll()
    setCommonProperties(event: Event) {
        this.strategyId = event.origin.contractAddress;
    }

    @OnEvent('allov2.RFPSimpleStrategy.PoolActive')
    @OnEvent('allov2.RFPCommitteeStrategy.PoolActive')
    onPoolStatusUpdate(event: Event) {
        this.active = event.data.flag
    }

    @OnEvent('allov2.RFPSimpleStrategy.MaxBidIncreased')
    @OnEvent('allov2.RFPCommitteeStrategy.MaxBidIncreased')
    async onMaxBidIncreased(event: Event) {
        await this.load();
        this.maxBid = this.maxBid.plus(event.data.amount)
    }
}

export default RFP