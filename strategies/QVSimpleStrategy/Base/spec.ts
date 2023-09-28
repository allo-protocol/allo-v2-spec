import { Address, BeforeAll, Event, LiveObject, OnEvent, Property, Spec } from '@spec.dev/core'

import { decodeQVSimpleInitializedData } from "../../../shared/decoders.ts";

/**
 * QVSimple details
 */
@Spec({
    uniqueBy: ['strategy', 'chainId'],
})
class QVSimple extends LiveObject {
    @Property()
    strategy: Address

    @Property()
    poolId: string

    // Note: this is derived property can cannot be detected by event
    // @Property()
    // active: boolean

    @Property()
    useRegistryAnchor: boolean

    @Property()
    metadataRequired: boolean

    @Property()
    registrationStartTime: number

    @Property()
    registrationEndTime: number

    @Property()
    allocationStartTime: number

    @Property()
    allocationEndTime: number

    @Property()
    maxVoiceCreditsPerAllocator: number

    @Property()
    reviewThreshold: number

    @Property()
    totalRecipientVotes: number

    // ====================
    // =  Event Handlers  =
    // ====================

    @BeforeAll()
    setCommonProperties(event: Event) {
        this.strategy = event.origin.contractAddress
    }

    @OnEvent('allov2.QVSimpleStrategy.Initialized')
    onInitalized(event: Event) {
        const {
            useRegistryAnchor,
            metadataRequired,
            reviewThreshold,
            registrationStartTime,
            registrationEndTime,
            allocationStartTime,
            allocationEndTime,
            maxVoiceCreditsPerAllocator
        } = decodeQVSimpleInitializedData(
            event.data.data
        )

        this.useRegistryAnchor = useRegistryAnchor
        this.metadataRequired = metadataRequired
        this.reviewThreshold = reviewThreshold
        this.registrationStartTime = registrationStartTime
        this.registrationEndTime = registrationEndTime
        this.allocationStartTime = allocationStartTime
        this.allocationEndTime = allocationEndTime
        this.maxVoiceCreditsPerAllocator = maxVoiceCreditsPerAllocator

        this.poolId = event.data.poolId.toString()
    }

    @OnEvent('allov2.QVSimpleStrategy.TimestampsUpdated')
    onTimestampsUpdated(event: Event) {
        this.registrationStartTime = event.data.registrationStartTime
        this.registrationEndTime = event.data.registrationEndTime
        this.allocationStartTime = event.data.allocationStartTime
        this.allocationEndTime = event.data.allocationEndTime
    }
}

export default QVSimple