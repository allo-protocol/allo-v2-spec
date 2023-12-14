import { Address, BeforeAll, Event, LiveTable, OnEvent, Property, Spec, isNullAddress } from '@spec.dev/core'

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
    totalUnits: number

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
    onRegistration(event: Event) {

        const  {
            registryAnchor,
            recipientAddress,
            metadata
        } = decodeSQFSuperFluidRegistrationData(
            event.data.data
        );

        this.recipientAddress = recipientAddress
        this.isUsingRegistryAnchor = isNullAddress(registryAnchor)
        this.metadataProtocol = metadata.protocol
        this.metadataPointer = metadata.pointer
        this.sender = event.data.sender

        this.status = getStatusFromInt(1)
    }

    @OnEvent('allov2.SQFSuperFluidStrategy.Allocated')
    onAllocated(event: Event) {
        this.flowRate = event.data.amount
    }

    @OnEvent('allov2.SQFSuperFluidStrategy.TotalUnitsUpdated')
    onTotalUnitsUpdated(event: Event) {
        this.totalUnits = event.data.totalUnits
    }

    @OnEvent('allov2.SQFSuperFluidStrategy.Reviewed')
    async onReviewed(event: Event) {
        this.status = getStatusFromInt(event.data.recipientStatus)
        const superApp = await this.contract.superApps(this.recipientId)
        this.superApp = superApp
    }

    @OnEvent('allov2.SQFSuperFluidStrategy.Canceled')
    onCanceled(event: Event) {
        this.flowRate = 0
        this.status = getStatusFromInt(6)
    }
}

export default SQFSuperFluidRecipient