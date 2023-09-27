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
    }

    @OnEvent("allov2.DonationVotingMerkleDistributionDirectTransferStrategy.RecipientStatusUpdated")
    @OnEvent("allov2.DonationVotingMerkleDistributionVaultStrategy.RecipientStatusUpdated")
    async onRecipientStatusUpdated(event: Event) {
        const APPLICATIONS_PER_ROW = 64; // 256/4

        const rowIndex = event.data.index;
        const fullRow = event.data.fullRow;

        const startApplicationIndex = rowIndex * APPLICATIONS_PER_ROW;

        for (let i = 0; i < APPLICATIONS_PER_ROW; i++) {
            // const currentApplicationIndex = startApplicationIndex + i;
            // const status = fullRow
            //     .rightShift(u8(i * 2))
            //     .bitAnd(BigInt.fromI32(3))
            //     .toI32();
        }

        // const rowIndex = index / this._itemsPerRow;
        // const colIndex = (index % this._itemsPerRow) * this.bitsPerStatus;
        // const row = this.rows[rowIndex.toString()] ?? BigInt(0);
        // const value = (row >> colIndex) & this.maxStatus;

        // return Number(value);
    }

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
