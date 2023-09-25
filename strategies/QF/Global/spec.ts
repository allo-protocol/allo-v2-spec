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

@Spec({
  uniqueBy: ["strategyId", "chainId"],
})
class QF extends LiveObject {
  @Property()
  strategyId: Address;

  @Property()
  poolId: string;

  @Property({ default: false })
  active: boolean;

  @Property({ default: 0 })
  balance: BigInt;

  // ====================
  // =  Event Handlers  =
  // ====================

  @BeforeAll()
  setCommonProperties(event: Event) {
    this.strategyId = event.origin.contractAddress;
  }

  @OnEvent(
    "allov2.DonationVotingMerkleDistributionDirectTransferStrategy.Initialized"
  )
  onDonationVotingMerkleDistributionDirectTransferStrategyInitalized(
    event: Event
  ) {
    this.poolId = event.data.poolId.toString();

    // TODO: Add the decocer for the data
  }

  @OnEvent("allov2.DonationVotingMerkleDistributionVaultStrategy.Donated")
  onDonationVotingMerkleDistributionVaultStrategyInitialized(event: Event) {
    this.poolId = event.data.poolId.toString();

    // TODO: Add the decocer for the data
  }

  // TODO: what other global events do we need to listen to?

  @OnEvent(
    "allov2.DonationVotingMerkleDistributionDirectTransferStrategy.PoolActive"
  )
  @OnEvent("allov2.DonationVotingMerkleDistributionVaultStrategy.PoolActive")
  onPoolStatusUpdate(event: Event) {
    this.active = event.data.flag;
  }
}

export default QF;
