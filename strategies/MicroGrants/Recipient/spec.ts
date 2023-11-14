import { Address, BeforeAll, BigInt, Event, LiveObject, OnEvent, Property, Spec } from '@spec.dev/core'

import { decodeMicroGrantsRegistrationData } from '../../../shared/decoders.ts'
import { getStatusFromInt } from '../../../shared/status.ts'

/**
 * MicroGrants details
 */
@Spec({
    uniqueBy: ['strategy', 'recipientId', 'chainId']
})
class MicroGrantsRecipient extends LiveObject {
    @Property()
    recipientId: Address

    @Property()
    strategy: Address

    @Property()
    poolId: string

    @Property()
    recipientAddress: Address;

    @Property()
    requestedAmount: BigInt

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

    @OnEvent('allov2.MicroGrantsStrategy.Registered')
    @OnEvent('allov2.MicroGrantsStrategy.UpdatedRegistration')
    async onRegistration(event: Event) {

        const  {
            registryAnchor,
            recipientAddress,
            requestedAmount,
            metadata
        } = decodeMicroGrantsRegistrationData(
            event.data.data
        );

        const poolId = await this.contract.getPoolId()
        
        this.poolId = poolId.toString()
        this.recipientAddress = recipientAddress
        this.isUsingRegistryAnchor = registryAnchor == "0x0000000000000000000000000000000000000000"
        this.requestedAmount = requestedAmount
        this.metadataProtocol = metadata.protocol
        this.metadataPointer = metadata.pointer
        this.sender = event.data.sender

        // Note: Only possible status is Pending / Accepted
        this.status = getStatusFromInt(1)
    }

    @OnEvent('allov2.MicroGrantsStrategy.Distributed')
    onAllocation(event: Event) {
        // Note: this means that the recipient has been allocated funds
        this.status = getStatusFromInt(2)
    }

}

export default MicroGrantsRecipient