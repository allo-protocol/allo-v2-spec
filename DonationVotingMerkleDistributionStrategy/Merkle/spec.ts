import { Address, BeforeAll, Event, LiveObject, OnEvent, Property, Spec } from '@spec.dev/core'

/**
 * Merkle Timestamp details
 */
@Spec({
    uniqueBy: ['strategyId', 'chainId'],
})
class Merkle extends LiveObject {
    @Property()
    strategyId: Address

    @Property()
    active: boolean

    @Property()
    registrationStartTime: number

    @Property()
    registrationEndTime: number

    @Property()
    allocationStartTime: number

    @Property()
    allocationEndTime: number

    @Property()
    sender: Address

    // ====================
    // =  Event Handlers  =
    // ====================

    @BeforeAll()
    setCommonProperties(event: Event) {
        this.strategyId = event.origin.contractAddress
    }

    @OnEvent('allov2.MerkleDistribution.PoolActive')
    onPoolStatusUpdate(event: Event) {
        this.active = event.data.flag
    }

    @OnEvent('allov2.MerkleDistribution.TimestampsUpdated')
    async onTimestampsUpdated(event: Event) {
        this.registrationStartTime = event.data.registrationStartTime
        this.registrationEndTime = event.data.registrationEndTime
        this.allocationStartTime = event.data.allocationStartTime
        this.allocationEndTime = event.data.allocationEndTime
        this.sender = event.data.sender
    }
}

export default Merkle