import {
  Address,
  BeforeAll,
  Event,
  LiveObject,
  OnEvent,
  Property,
  Spec,
  Timestamp,
} from "@spec.dev/core";

/**
 * Global data
 */
@Spec({
  uniqueBy: ["chainId"],
})
class Allo extends LiveObject {
  @Property()
  registry: Address;

  @Property()
  feePercentage: BigInt;

  @Property()
  baseFee: BigInt;

  @Property()
  treasury: Address;

  @Property()
  cloneableStrategies: Address[];

  @Property()
  updatedAt: Timestamp;

  // ====================
  // =  Event Handlers  =
  // ====================

  @BeforeAll()
  setCommonProperties(event: Event) {
    this.updatedAt = this.blockTimestamp;
  }

  @OnEvent("allov2.Allo.RegistryUpdated")
  onSomeEvent(event: Event) {
    this.registry = event.data.registry;
  }

  @OnEvent("allov2.Allo.FeePercentageUpdated")
  onFeePercentageUpdated(event: Event) {
    this.feePercentage = event.data.feePercentage;
  }

  @OnEvent("allov2.Allo.BaseFeeUpdated")
  onBaseFeeUpdated(event: Event) {
    this.baseFee = event.data.baseFee;
  }

  @OnEvent("allov2.Allo.TreasuryUpdated")
  onTreasuryUpdated(event: Event) {
    this.treasury = event.data.treasury;
  }

  @OnEvent("allov2.Allo.StrategyApproved")
  onStrategyApproved(event: Event) {
    this.cloneableStrategies.push(event.data.strategy);
  }

  @OnEvent("allov2.Allo.StrategyRemoved")
  onStrategyRemoved(event: Event) {
    this.cloneableStrategies = this.cloneableStrategies.filter(
      (strategy) => strategy !== event.data.strategy
    );
  }
}

export default Allo;
