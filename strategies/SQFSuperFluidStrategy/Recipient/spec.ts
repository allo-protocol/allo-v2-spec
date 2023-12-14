import { Address, BeforeAll, BigInt, Event, LiveTable, OnEvent, Property, Spec, isNullAddress } from '@spec.dev/core'

import { decodeSQFSuperFluidRegistrationData } from '../../../shared/decoders.ts'
import { getStatusFromInt } from '../../../shared/status.ts'

/**
 * SQFSuperFluidRecipients details
 */
@Spec({
    uniqueBy: [ 'chainId', 'poolId', 'recipientId']
})
class SQFSuperFluidRecipient extends LiveTable {
    @Property()
    recipientId: Address

    @Property()
    strategy: Address

    @Property()
    poolId: string

    @Property()
    recipientAddress: Address;

    @Property()
    totalUnits: BigInt

    @Property()
    flowRate: number

    @Property()
    superApp: Address

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
    async setCommonProperties(event: Event) {
        const poolId = await this.contract.getPoolId()

        this.poolId = poolId.toString()
        this.strategy = event.origin.contractAddress
        this.recipientId = event.data.recipientId
    }

    @OnEvent('allov2.SQFSuperFluidStrategy.Registered')
    @OnEvent('allov2.SQFSuperFluidStrategy.UpdatedRegistration')
    async onRegistration(event: Event) {

        // const  {
        //     registryAnchor,
        //     recipientAddress,
        //     requestedAmount,
        //     metadata
        // } = decodeMicroGrantsRegistrationData(
        //     event.data.data
        // );
        
        // this.recipientAddress = recipientAddress
        // this.isUsingRegistryAnchor = isNullAddress(registryAnchor)
        // this.requestedAmount = requestedAmount
        // this.metadataProtocol = metadata.protocol
        // this.metadataPointer = metadata.pointer
        // this.sender = event.data.sender

        // // Note: Only possible status is Pending / Accepted
        // this.status = getStatusFromInt(1)
    }

    // @OnEvent('allov2.MicroGrantsStrategy.Distributed')
    // @OnEvent('allov2.MicroGrantsGovStrategy.Distributed')
    // @OnEvent('allov2.MicroGrantsHatsStrategy.Distributed')
    // onAllocation(event: Event) {
    //     // Note: this means that the recipient has been allocated funds
    //     this.status = getStatusFromInt(2)
    // }

}

export default SQFSuperFluidRecipient