import { Address, BeforeAll, Event, LiveTable, OnEvent, Property, Spec } from '@spec.dev/core'

import { getStatusFromInt } from '../../../shared/status.ts'

/**
 * MicroGrantsAllocation details
 */
@Spec({
    uniqueBy: [ 'chainId', 'poolId', 'recipientId']
})
class MicroGrantsAllocation extends LiveTable {
    @Property()
    recipientId: Address

    @Property()
    strategy: Address

    @Property()
    poolId: string

    @Property()
    status: string

    @Property()
    sender: Address

    // ====================
    // =  Event Handlers  =
    // ====================

    @BeforeAll()
    async setCommonProperties(event: Event) {
        const poolId = await this.contract.getPoolId()

        this.poolId = poolId.toString()
        this.strategy = event.origin.contractAddress
        this.recipientId = event.data.recipientId
    }

    @OnEvent('allov2.MicroGrantsStrategy.Allocated')
    @OnEvent('allov2.MicroGrantsGovStrategy.Allocated')
    @OnEvent('allov2.MicroGrantsHatsStrategy.Allocated')
    onAllocation(event: Event) {
        this.status = getStatusFromInt(event.data.status)
        this.sender = event.data.sender
    }

}

export default MicroGrantsAllocation