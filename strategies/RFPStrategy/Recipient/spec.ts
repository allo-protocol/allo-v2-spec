import { Address, BeforeAll, BigInt, Event, LiveTable, OnEvent, Property, Spec } from '@spec.dev/core'

import { decodeRFPRegistrationData } from '../../../shared/decoders.ts'
import { getStatusFromInt } from '../../../shared/status.ts'

/**
 * RFP details
 */
@Spec({
    uniqueBy: [ 'chainId', 'poolId', 'recipientId']
})
class RFPRecipient extends LiveTable {
    @Property()
    recipientId: Address

    @Property()
    strategy: Address

    @Property()
    poolId: string

    @Property()
    recipientAddress: Address;

    @Property()
    proposalBid: BigInt

    @Property()
    isUsingRegistryAnchor: boolean

    @Property()
    status: string

    @Property()
    metadataProtocol: number

    @Property()
    metadataPointer: string

    @Property()
    sender: Address

    // ====================
    // =  Event Handlers  =
    // ====================

    @BeforeAll()
    setCommonProperties(event: Event) {
        this.strategy = event.origin.contractAddress
        this.recipientId = event.data.recipientId
    }

    @OnEvent('allov2.RFPSimpleStrategy.Registered')
    @OnEvent('allov2.RFPCommitteeStrategy.Registered')
    @OnEvent('allov2.RFPSimpleStrategy.UpdatedRegistration')
    @OnEvent('allov2.RFPCommitteeStrategy.UpdatedRegistration')
    async onRegistration(event: Event) {
        const useRegistryAnchor = await this.contract.useRegistryAnchor()
        const { recipientAddress, isUsingRegistryAnchor, proposalBid, metadata } = decodeRFPRegistrationData(
            useRegistryAnchor, event.data.data
        );

        const poolId = await this.contract.getPoolId()
        
        this.poolId = poolId.toString()
        this.recipientAddress = recipientAddress
        this.isUsingRegistryAnchor = isUsingRegistryAnchor
        this.proposalBid = proposalBid
        this.metadataProtocol = metadata.protocol
        this.metadataPointer = metadata.pointer
        this.sender = event.data.sender

        // Note: there is no appealed status for RFP
        this.status = getStatusFromInt(0)
    }

    @OnEvent('allov2.RFPSimpleStrategy.Allocated')
    @OnEvent('allov2.RFPCommitteeStrategy.Allocated')
    onAllocation(event: Event) {
        this.status = getStatusFromInt(2)
        this.proposalBid = BigInt.from(event.data.proposalBid)
    }

}

export default RFPRecipient