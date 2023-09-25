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

import { decodeRFPRegistrationData } from "../../shared/decoders.ts";
import { getStatusFromInt } from "../../shared/status.ts";

/**
 * RFP details
 */
@Spec({
  uniqueBy: ["strategyId", "recipientId", "chainId"],
})
class RFPRecipient extends LiveObject {
  @Property()
  recipientId: Address;

  @Property()
  strategyId: Address;

  @Property({ default: 0 })
  proposalBid: BigInt;

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

  // ====================
  // =  Event Handlers  =
  // ====================

  @BeforeAll()
  setCommonProperties(event: Event) {
    this.strategyId = event.origin.contractAddress;
    this.recipientId = event.data.recipientId;
  }

  @OnEvent("allov2.RFPSimpleStrategy.Registered")
  @OnEvent("allov2.RFPCommitteeStrategy.Registered")
  async onRegistered(event: Event) {
    const useRegistryAnchor = await this.contract.useRegistryAnchor();

    const { proposalBid, metadata } = decodeRFPRegistrationData(
      useRegistryAnchor,
      event.data.data
    );

    this.proposalBid = proposalBid;
    this.isRegistryAnchor = useRegistryAnchor;
    this.status = getStatusFromInt(0);
    this.metadataProtocol = metadata?.protocol;
    this.metadataPointer = metadata?.pointer;
    this.sender = event.data.sender;
  }

  @OnEvent("allov2.RFPSimpleStrategy.UpdatedRegistration")
  @OnEvent("allov2.RFPCommitteeStrategy.UpdatedRegistration")
  async onUpdatedRegistration(event: Event) {
    // make sure we have access to the current value for this.isRegistryAnchor
    await this.load();
    const decodedData = decodeRFPRegistrationData(
      this.isRegistryAnchor,
      event.data.data
    );

    this.proposalBid = decodedData.proposalBid;
    this.metadataProtocol = decodedData.metadata?.protocol;
    this.metadataPointer = decodedData.metadata?.pointer;
    this.status = getStatusFromInt(0);
    this.sender = event.data.sender;
  }

  @OnEvent("allov2.RFPSimpleStrategy.Allocated")
  @OnEvent("allov2.RFPCommitteeStrategy.Allocated")
  onAllocation(event: Event) {
    this.status = getStatusFromInt(2);
    this.proposalBid = BigInt.from(event.data.proposalBid);
  }
}

export default RFPRecipient;
