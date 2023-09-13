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

    @Property()
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

    // TODO-SPEC: Is this needed cause RFPCommitteeStrategy extends RFPSimple 
    // @OnEvent('allov2.RFPCommitteeStrategy.PoolActive')
    @OnEvent('allov2.RFPSimple.PoolActive')
    onPoolStatusUpdate(event: Event) {
        this.active = event.data.flag
    }

    // @OnEvent('allov2.RFPCommitteeStrategy.MaxBidIncreased')
    @OnEvent('allov2.RFPSimple.MaxBidIncreased')
    async onMaxBidIncreased(event: Event) {
        await this.load();
        this.maxBid = this.maxBid.plus(event.data.amount)
    }
}

export default RFP