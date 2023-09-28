import {
    Address,
    BeforeAll,
    Event,
    LiveObject,
    OnEvent,
    Property,
    saveAll,
    Spec,
} from "@spec.dev/core";

import { decodeGenericRegistrationData, decodeRecipientIndexDonationVotingMerkleDistribution } from "../../../shared/decoders.ts";
import { getStatusFromInt } from "../../../shared/status.ts";
/**
 * DonationVotingMerkleDistribution Recipient
 */
@Spec({
    uniqueBy: ["strategy", "recipientId", "chainId"],
})
class DonationVotingMerkleDistributionRecipient extends LiveObject {
    @Property()
    recipientId: Address;

    @Property()
    recipientIndex: number;

    @Property()
    strategy: Address;

    @Property()
    poolId: string;

    @Property()
    recipientAddress: Address;

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
    setCommonProperties(event: Event) {
        this.strategy = event.origin.contractAddress
        this.recipientId = event.data.recipientId
    }

    @OnEvent("allov2.DonationVotingMerkleDistributionDirectTransferStrategy.Registered")
    @OnEvent("allov2.DonationVotingMerkleDistributionVaultStrategy.Registered")
    async onRegistration(event: Event) {
        const useRegistryAnchor = await this.contract.useRegistryAnchor()
        const poolId = await this.contract.getPoolId()

        // decode to get
        const {recipientIndex, encodedData } = decodeRecipientIndexDonationVotingMerkleDistribution(
            event.data.data
        )

        this.upsertRecipientOnRegistration(useRegistryAnchor, encodedData)
        this.status = getStatusFromInt(1)
        this.poolId = poolId.toString()
        this.recipientIndex = recipientIndex
        this.sender = event.data.sender
    }

    @OnEvent("allov2.DonationVotingMerkleDistributionDirectTransferStrategy.UpdatedRegistration")
    @OnEvent("allov2.DonationVotingMerkleDistributionVaultStrategy.UpdatedRegistration")
    async onUpdatedRegistration(event: Event) {
        const useRegistryAnchor = await this.contract.useRegistryAnchor()

        this.upsertRecipientOnRegistration(useRegistryAnchor, event.data.data)
        this.status = getStatusFromInt(event.data.status)
        this.sender = event.data.sender
    }

    @OnEvent("allov2.DonationVotingMerkleDistributionDirectTransferStrategy.RecipientStatusUpdated",  { autoSave: false })
    @OnEvent("allov2.DonationVotingMerkleDistributionVaultStrategy.RecipientStatusUpdated",  { autoSave: false })
    async onRecipientStatusUpdated(event: Event) {
        const applicationsPerRow = 64; // 256/4

        const rowIndex = event.data.index
        const fullRow = event.data.fullRow
        const bitsPerStatus = 4

        const startApplicationIndex = rowIndex * applicationsPerRow

        const recipients = []

        for (let index = 0; index < applicationsPerRow; index++) {
            // get recipientIndex
            const currentApplicationIndex = startApplicationIndex + index
            const colIndex = index * bitsPerStatus
            // get recipient status
            const status = (fullRow >> colIndex) & 15 // 1111

            // get recipient
            const recipient = await this.findOne(DonationVotingMerkleDistributionRecipient, {
                strategy: this.strategy,
                chainId: this.chainId,
                recipientIndex: currentApplicationIndex
            })

            if (recipient) {
                // update status
                recipient.status = getStatusFromInt(status)
                recipients.push(recipient)
            }
        }
        await saveAll(...recipients)
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

export default DonationVotingMerkleDistributionRecipient;
