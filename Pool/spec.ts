import { LiveObject, Spec, Property, Event, OnEvent, BigInt, Address, Json, Timestamp } from '@spec.dev/core'

/**
 * All Pools created on Allo
 */
@Spec({ 
    uniqueBy: ['poolId', 'chainId'] 
})
class Pool extends LiveObject {
    // TODO
    @Property()
    poolId: number

    // TODO: how do i link this to profileId ?

    @Property()
    strategy: Address

    @Property()
    token: Address

    @Property()
    amount: BigInt

    @Property()
    feePaid: BigInt

    @Property()
    baseFeePaid: BigInt

    @Property()
    metadata: Json

    @Property()
    createdAt: Timestamp

    @Property()
    updatedAt: Timestamp

    // ==== Event Handlers ===================

    @OnEvent('allov2.Allo.PoolCreated')
    onPoolCreated(event: Event) {
        this.poolId = event.data.poolId
        this.strategy = event.data.strategy
        this.token = event.data.token
        // TODO: how to link to Profile.profileId
        this.metadata = event.data.metadata

        this.createdAt = this.blockTimestamp
        this.updatedAt = this.blockTimestamp
    }

    @OnEvent('allov2.Allo.PoolMetadataUpdated')
    onPoolMetadataUpdated(event: Event) {
        this.metadata = event.data.metadata

        this.updatedAt = this.blockTimestamp
    }

    @OnEvent('allov2.Allo.PoolFunded')
    onPoolFunded(event: Event) {
        this.amount += event.data.amount
        this.feePaid += event.data.feePaid
    }

    @OnEvent('allov2.Allo.BaseFeePaid')
    onBaseFeePaid(event: Event) {
        this.baseFeePaid += event.data.baseFeePaid
    }
}

export default Pool