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
class QVSimple extends LiveObject {
  @Property()
  strategyId: Address;

  @Property()
  chainId: number;

  // ====================
  // =  Event Handlers  =
  // ====================

  @BeforeAll()
  setCommonProperties(event: Event) {
    this.strategyId = event.origin.contractAddress;
  }
}

export default QVSimple;
