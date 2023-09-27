import {
    Address,
    BeforeAll,
    Event,
    LiveObject,
    OnEvent,
    Property,
    Spec,
} from "@spec.dev/core";

import { decodeDonationVotingMerkleDistributionRegistrationData } from "../../../shared/decoders.ts";
import { getStatusFromInt } from "../../../shared/status.ts";
/**
 * Merkle Recipient details
 */
@Spec({
    uniqueBy: ["strategy", "recipientId", "chainId"],
})
class DonationVotingMerkleDistributionRecipient extends LiveObject {
    @Property()
    recipientId: Address;

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

    // @Property({default: false})
    // hasClaimed: boolean;

    // ====================
    // =  Event Handlers  =
    // ====================

    @BeforeAll()
    setCommonProperties(event: Event) {
        this.strategy = event.origin.contractAddress
        this.recipientId = event.data.recipientId
    }

    @OnEvent(
        "allov2.DonationVotingMerkleDistributionDirectTransferStrategy.Registered"
    )
    @OnEvent("allov2.DonationVotingMerkleDistributionVaultStrategy.Registered")
    async onRegistration(event: Event) {
        const useRegistryAnchor = await this.contract.useRegistryAnchor()
        const poolId = await this.contract.getPoolId()

        this.upsertRecipientOnRegistration(useRegistryAnchor, event)
        this.status = getStatusFromInt(1)
        this.poolId = poolId.toString()
    }

    @OnEvent(
        "allov2.DonationVotingMerkleDistributionDirectTransferStrategy.UpdatedRegistration"
    )
    @OnEvent(
        "allov2.DonationVotingMerkleDistributionVaultStrategy.UpdatedRegistration"
    )
    async onUpdatedRegistration(event: Event) {
        const useRegistryAnchor = await this.contract.useRegistryAnchor()

        this.upsertRecipientOnRegistration(useRegistryAnchor, event)
        this.status = getStatusFromInt(event.data.status)
        // TODO: validate to ensure record is updated and not inserted
    }

    // TODO: FIX
    // @OnEvent("allov2.DonationVotingMerkleDistributionDirectTransferStrategy.RecipientStatusUpdated")
    // async onRecipientStatusUpdated(event: Event) {
    //   this.sender = event.data.sender;
    //   this.status = event.data.status;
    // }

    // TODO: Update status to paid out on payout

    upsertRecipientOnRegistration(useRegistryAnchor: boolean, event: Event) {
        const { isUsingRegistryAnchor, recipientAddress, metadata } =
            decodeDonationVotingMerkleDistributionRegistrationData(
                useRegistryAnchor,
                event.data.data
            )

        this.isUsingRegistryAnchor = isUsingRegistryAnchor
        this.recipientAddress = recipientAddress
        this.metadataProtocol = metadata.protocol
        this.metadataPointer = metadata.pointer
        this.sender = event.data.sender
    }
}

export default DonationVotingMerkleDistributionRecipient;
