import { Address, BeforeAll, BigInt, Event, LiveObject, OnEvent, Property, Spec } from '@spec.dev/core'

import { decodeRfpRegistrationData } from '../../shared/decode'
import { getStatusFromInt } from '../../shared/status'

/**
 * RFP details
 */
@Spec({
    uniqueBy: ['strategyId', 'id', 'chainId']
})
class RFPRecipient extends LiveObject {

    @Property()
    recipientId: Address

    @Property()
    strategyId: Address

    @Property({ default: 0 })
    proposalBid: BigInt

    @Property()
    isRegistryAnchor: boolean

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
        this.strategyId = event.origin.contractAddress;
        this.recipientId = event.data.recipientId;
    }

    @OnEvent('allov2.RFPSimple.Registered')
    async onRegistration(event: Event) {

        const strategyContract = this.bind(this.address, 'allov2.RFPSimple')
        const useRegistryAnchor = await strategyContract.useRegistryAnchor()

        const decodedData = decodeRfpRegistrationData(useRegistryAnchor, event.data.data)
        
        const instance = await this.new(RFPRecipient, {
            recipientId: event.data.recipientId,
            strategyId: event.origin.contractAddress,
            proposalBid: decodedData.proposalBid,
            isRegistryAnchor: useRegistryAnchor,
            status: getStatusFromInt(0),
            metadataProtocol: decodedData.metadata.protocol,
            metadataPointer: decodedData.metadata.pointer,
            sender: event.data.sender
        })
        instance.save()
    }

    @OnEvent('allov2.RFPSimple.UpdatedRegistration')
    async onUpdatedRegistration(event: Event) {

        const decodedData = decodeRfpRegistrationData(this.isRegistryAnchor, event.data.data)

        this.proposalBid = decodedData.proposalBid
        this.metadataProtocol = decodedData.metadata.protocol
        this.metadataPointer = decodedData.metadata.pointer
        this.status = getStatusFromInt(0)  
        this.sender = event.data.sender
    }

    @OnEvent('allov2.RFPSimple.Allocated')
    onAllocation(event: Event) {
        this.status = getStatusFromInt(2)
        this.proposalBid = BigInt.from(event.data.proposalBid)
    }
}

export default RFPRecipient