import {
  Address,
  BeforeAll,
  BigInt,
  Event,
  LiveObject,
  OnEvent,
  Property,
  Spec,
} from "@spec.dev/core";

import {
  decodeQVRegistrationData,
  decodeRFPRegistrationData,
} from "../../shared/decoders.ts";
import { getStatusFromInt } from "../../shared/status.ts";

@Spec({
  uniqueBy: ["strategyId", "recipientId", "chainId"],
})
class QVRecipient extends LiveObject {
  @Property()
  recipientId: Address;

  @Property()
  strategyId: Address;

  @Property({ default: 0 })
  totalVotesReceived: BigInt;

  @Property()
  isRegistryAnchor: boolean;

  @Property()
  status: string;

  @Property()
  metadataProtocol: number;

  @Property()
  metadataPointer: string;

  @Property()
  sender: Address;

  @Property()
  recipientAddress: Address;

  // ====================
  // =  Event Handlers  =
  // ====================

  @BeforeAll()
  setCommonProperties(event: Event) {
    this.strategyId = event.origin.contractAddress;
    this.recipientId = event.data.recipientId;
  }

  @OnEvent("allov2.QVSimpleStrategy.Registered")
  async onRegistered(event: Event) {
    const useRegistryAnchor = await this.contract.useRegistryAnchor();

    const decodedData = decodeQVRegistrationData(
      useRegistryAnchor,
      event.data.data
    );

    this.recipientAddress = decodedData.recipientAddress;
    this.metadataProtocol = decodedData.metadata?.protocol;
    this.metadataPointer = decodedData.metadata?.pointer;
    this.status = getStatusFromInt(1);
    this.sender = event.data.sender;
  }

  @OnEvent("allov2.QVSimpleStrategy.UpdatedRegistration")
  async onUpdatedRegistration(event: Event) {
    await this.load();
    const decodedData = decodeQVRegistrationData(
      this.isRegistryAnchor,
      event.data.data
    );

    this.recipientAddress = decodedData.recipientAddress;
    this.metadataProtocol = decodedData.metadata?.metadataProtocol;
    this.metadataPointer = decodedData.metadata?.metadataPointer;
    this.status = getStatusFromInt(0);
    this.sender = event.data.sender;
  }

  @OnEvent("allov2.QVBaseStrategy.RecipientStatusUpdated")
  async onRecipientStatusUpdated(event: Event) {
    this.status = getStatusFromInt(event.data.status);
    this.sender = event.data.sender;
  }

  @OnEvent("allov2.QVBaseStrategy.Reviewed")
  async onReviewed(event: Event) {
    this.status = getStatusFromInt(event.data.status);
    this.sender = event.data.sender;
  }

  @OnEvent("allov2.QVBaseStrategy.Allocated")
  async onAllocated(event: Event) {
    this.totalVotesReceived = event.data.votes;
    this.sender = event.data.allocator;
  }
}

export default QVRecipient;

// struct Recipient {
//     // slot 0
//     uint256 totalVotesReceived;
//     // slot 1
//     bool useRegistryAnchor;
//     address recipientAddress;
//     Metadata metadata;
//     Status recipientStatus;
// }
