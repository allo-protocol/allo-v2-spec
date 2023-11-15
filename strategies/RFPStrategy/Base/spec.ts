import { Address, BeforeAll, BigInt, Event, LiveObject, OnEvent, Property, Spec } from '@spec.dev/core'

import { decodeRFPCommitteeInitializedData, decodeRFPSimpleInitializedData } from "../../../shared/decoders.ts";

/**
 * RFP details
 */
@Spec({
    uniqueBy: ['strategy', 'chainId']
})
class RFP extends LiveObject {

    @Property()
    strategy: Address

    // @dev bytes32
    @Property()
    strategyId: string

    @Property()
    poolId: string

    @Property({ default: false })
    active: boolean

    @Property()
    maxBid: BigInt

    @Property()
    useRegistryAnchor: boolean

    @Property()
    metadataRequired: boolean

    @Property()
    voteThreshold: number

    @Property()
    acceptedRecipientId: Address

    // ====================
    // =  Event Handlers  =
    // ====================

    @BeforeAll()
    setCommonProperties(event: Event) {
        this.strategy = event.origin.contractAddress;
    }

    @OnEvent('allov2.RFPSimpleStrategy.Initialized')
    async onRFPSimpleInitalized(event: Event) {
        const { maxBid, useRegistryAnchor, metadataRequired} = decodeRFPSimpleInitializedData(
            event.data.data
        )

        this.maxBid = maxBid
        this.useRegistryAnchor = useRegistryAnchor
        this.metadataRequired = metadataRequired
        this.poolId = event.data.poolId.toString()
        this.voteThreshold = 1 // default to 1 for RFP Simple
        
        const strategyId = await this.contract.getStrategyId().toString()
        this.strategyId = strategyId
    }

    @OnEvent('allov2.RFPCommitteeStrategy.Initialized')
    async onRFPCommitteeInitalized(event: Event) {
        const { voteThreshold, maxBid, useRegistryAnchor, metadataRequired } = decodeRFPCommitteeInitializedData(
            event.data.data
        )

        this.maxBid = maxBid
        this.useRegistryAnchor = useRegistryAnchor
        this.metadataRequired = metadataRequired
        this.voteThreshold = voteThreshold
        this.poolId = event.data.poolId.toString()

        const strategyId = await this.contract.getStrategyId().toString()
        this.strategyId = strategyId
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

    @OnEvent('allov2.RFPSimpleStrategy.Allocated')
    @OnEvent('allov2.RFPCommitteeStrategy.Allocated')
    onAllocation(event: Event) {
        this.acceptedRecipientId = event.data.recipientId
    }
}

export default RFP