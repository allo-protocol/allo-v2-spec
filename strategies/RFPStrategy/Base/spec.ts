import { Address, BeforeAll, BigInt, Event, LiveObject, OnEvent, Property, Spec } from '@spec.dev/core'

import { decodeRFPCommitteeInitializedData, decodeRFPSimpleInitializedData } from "../../../shared/decoders.js";

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
    poolId: string

    @Property({ default: false })
    active: boolean

    @Property({ default: 0 })
    maxBid: BigInt

    @Property()
    useRegistryAnchor: boolean

    @Property()
    metadataRequired: boolean

    @Property()
    voteThreshold: number

    // ====================
    // =  Event Handlers  =
    // ====================

    @BeforeAll()
    setCommonProperties(event: Event) {
        this.strategyId = event.origin.contractAddress;
    }

    @OnEvent('allov2.RFPSimpleStrategy.Initialized')
    onRFPSimpleInitalized(event: Event) {
        const { maxBid, useRegistryAnchor, metadataRequired} = decodeRFPSimpleInitializedData(
            event.data.data
        )

        this.maxBid = maxBid
        this.useRegistryAnchor = useRegistryAnchor
        this.metadataRequired = metadataRequired
        this.poolId = event.data.poolId.toString()
        this.voteThreshold = 1
    }

    @OnEvent('allov2.RFPCommitteeStrategy.Initialized')
    onRFPCommitteeInitalized(event: Event) {
        const { voteThreshold, maxBid, useRegistryAnchor, metadataRequired } = decodeRFPCommitteeInitializedData(
            event.data.data
        )

        this.maxBid = maxBid
        this.useRegistryAnchor = useRegistryAnchor
        this.metadataRequired = metadataRequired
        this.voteThreshold = voteThreshold
        this.poolId = event.data.poolId.toString()
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