import { Address, BeforeAll, Event, LiveTable, OnEvent, Property, Spec } from '@spec.dev/core'

import { decodeGenericRegistrationData } from '../../../shared/decoders.ts'
import { getStatusFromInt } from '../../../shared/status.ts'

/**
 * QVSimple Recipient details
 */
@Spec({
    uniqueBy: [ 'chainId', 'poolId', 'recipientId']
})
class QVSimpleRecipient extends LiveTable {
    @Property()
    recipientId: Address;

    @Property()
    strategy: Address;

    @Property()
    poolId: string;

    @Property()
    recipientAddress: Address;

    @Property()
    totalVotesReceived: number;

    @Property()
    isUsingRegistryAnchor: boolean;

    @Property()
    status: string;

    @Property()
    metadataProtocol: number;

    @Property()
    metadataPointer: string;

    @Property()
    sender: Address;

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

    @OnEvent('allov2.QVSimpleStrategy.Registered')
    @OnEvent('allov2.QVSimpleStrategy.UpdatedRegistration')
    async onRegistration(event: Event) {
        const useRegistryAnchor = await this.contract.registryGating()

        this.upsertRecipientOnRegistration(useRegistryAnchor, event.data.data)
        this.status = getStatusFromInt(event.data.status)
        this.sender = event.data.sender
    }

    @OnEvent('allov2.QVSimpleStrategy.RecipientStatusUpdated')
    onRecipientStatusUpdated(event: Event) {
        this.status = getStatusFromInt(event.data.status)
    }

    @OnEvent('allov2.QVSimpleStrategy.Allocated')
    onAllocation(event: Event) {
        this.totalVotesReceived += event.data.votes
    }

    upsertRecipientOnRegistration(useRegistryAnchor: boolean, data: any) {
        const { isUsingRegistryAnchor, recipientAddress, metadata } =
            decodeGenericRegistrationData(
                useRegistryAnchor,
                data
            )

        this.isUsingRegistryAnchor = isUsingRegistryAnchor
        this.recipientAddress = recipientAddress
        this.metadataProtocol = metadata.protocol
        this.metadataPointer = metadata.pointer
    }
}

export default QVSimpleRecipient