import { Address, BeforeAll, Event, LiveTable, OnEvent, Property, Spec } from '@spec.dev/core'

import { getStatusFromInt } from '../../../shared/status.ts'

/**
 * MicroGrantsDistribution details
 */
@Spec({
    uniqueBy: [ 'chainId', 'poolId', 'recipientId']
})
class MicroGrantsDistribution extends LiveTable {
    @Property()
    recipientId: Address
    
    @Property()
    strategy: Address
    
    @Property()
    poolId: string

    @Property()
    recipientAddress: Address

    @Property()
    amount: string

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
    
    @OnEvent('allov2.MicroGrantsStrategy.Distributed')
    @OnEvent('allov2.MicroGrantsGovStrategy.Distributed')
    @OnEvent('allov2.MicroGrantsHatsStrategy.Distributed')
    onDistribution(event: Event) {
        this.recipientAddress = event.data.recipientAddress
        this.amount = event.data.amount
        this.sender = event.data.sender
    }
}

export default MicroGrantsDistribution