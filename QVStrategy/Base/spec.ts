import {
  Address,
  BeforeAll,
  Event,
  LiveObject,
  OnEvent,
  Property,
  Spec,
} from "@spec.dev/core";

@Spec({
  uniqueBy: ["strategyId", "chainId"],
})
class QV extends LiveObject {
  protected contractGroup: string;

  constructor(_contractGroup: string) {
    super();
    this.contractGroup = _contractGroup;
  }

  @Property()
  strategyId: Address;

  @Property()
  active: boolean;

  @Property()
  registryGating: boolean;

  @Property()
  metadataRequired: boolean;

  @Property()
  registrationStartTime: number;

  @Property()
  registrationEndTime: number;

  @Property()
  allocationStartTime: number;

  @Property()
  allocationEndTime: number;

  @Property()
  registry: Address;

  // ====================
  // =  Event Handlers  =
  // ====================

  @BeforeAll()
  setCommonProperties(event: Event) {
    this.strategyId = event.origin.contractAddress;
  }

  // todo: how to set initial params? (active, registryGating, metadataRequired, timestamps..)

  @OnEvent("allov2.BaseStrategy.Initialized")
  async onInitialized(event: Event) {
    this.active = true;
    this.registryGating = event.data.registryGating;
    this.metadataRequired = event.data.metadataRequired;
    this.registry = event.data.registry;
  }

  @OnEvent(`allov2.${this.contractGroup}.TimestampsUpdated`)
  async onTimestampsUpdated(event: Event) {
    await this.load();

    this.registrationStartTime = event.data.registrationStartTime;
    this.registrationEndTime = event.data.registrationEndTime;
    this.allocationStartTime = event.data.allocationStartTime;
    this.allocationEndTime = event.data.allocationEndTime;
  }
}

export default QV;
