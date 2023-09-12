import {
  Address,
  BeforeAll,
  BigInt,
  Event,
  Json,
  LiveObject,
  OnEvent,
  Property,
  Spec,
  Timestamp,
} from "@spec.dev/core";

/**
 * All Pools created on Allo
 */
@Spec({
  uniqueBy: ["poolId", "chainId"],
})
class Pool extends LiveObject {
  @Property()
  poolId: number;

  // @dev: Links to Profile.profileId
  @Property()
  profileId: Address;

  @Property()
  strategy: Address;

  @Property()
  token: Address;

  @Property()
  amount: BigInt;

  @Property()
  feePaid: BigInt;

  @Property()
  baseFeePaid: BigInt;

  @Property()
  metadataProtocol: number;

  @Property()
  metadataPointer: string;

  @Property()
  createdAt: Timestamp;

  @Property()
  updatedAt: Timestamp;

  // ====================
  // =  Event Handlers  =
  // ====================

  @BeforeAll()
  setCommonProperties(event: Event) {
    this.updatedAt = this.blockTimestamp;
  }

  @OnEvent("allov2.Allo.PoolCreated")
  onPoolCreated(event: Event) {
    this.poolId = event.data.poolId;
    this.strategy = event.data.strategy;
    this.token = event.data.token;
    this.profileId = event.data.profileId;
    [
      this.metadataPointer,
      this.metadataProtocol
    ] = event.data.metadata;

    this.createdAt = this.blockTimestamp;
  }

  @OnEvent("allov2.Allo.PoolMetadataUpdated")
  onPoolMetadataUpdated(event: Event) {
    [
      this.metadataPointer,
      this.metadataProtocol
    ] = event.data.metadata;
  }

  @OnEvent("allov2.Allo.PoolFunded")
  onPoolFunded(event: Event) {
    this.amount += event.data.amount;
    this.feePaid += event.data.feePaid;
  }

  @OnEvent("allov2.Allo.BaseFeePaid")
  onBaseFeePaid(event: Event) {
    this.baseFeePaid += event.data.baseFeePaid;
  }
}

export default Pool;
