import {
  Address,
  BeforeAll,
  Event,
  LiveObject,
  OnEvent,
  Property,
  Spec,
} from "@spec.dev/core";

import { decodeMerkleRegistrationData } from "../../shared/decoders.ts";
/**
 * Merkle Recipient details
 */
@Spec({
  uniqueBy: ["strategyId", "recipientId", "chainId"],
})
class DonationVotingMerkleDistributionRecipient extends LiveObject {
  @Property()
  recipientId: Address;

  @Property()
  strategyId: Address;

  @Property()
  isRegistryAnchor: boolean;

  @Property()
  status: number;

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
    this.strategyId = event.origin.contractAddress;
  }

  // @OnEvent("allov2.MerkleDistribution.Registered")
  // async onRegistration(event: Event) {
  //   const useRegistryAnchor = await this.contract.useRegistryAnchor();

  //   const { metadata } = decodeMerkleRegistrationData(
  //     useRegistryAnchor,
  //     event.data.data
  //   );

  //   this.recipientId = event.data.recipientId;
  //   this.isRegistryAnchor = useRegistryAnchor;
  //   this.status = event.data.status;
  //   this.metadataProtocol = metadata?.protocol;
  //   this.metadataPointer = metadata?.pointer;
  // }

  // @OnEvent("allov2.MerkleDistribution.UpdatedRegistration")
  // async onUpdatedRegistration(event: Event) {
  //   this.recipientId = event.data.recipientId;
  // }

  // @OnEvent("allov2.MerkleDistribution.RecipientStatusUpdated")
  // async onRecipientStatusUpdated(event: Event) {
  //   this.sender = event.data.sender;
  //   this.status = event.data.status;
  // }

}

export default DonationVotingMerkleDistributionRecipient;
