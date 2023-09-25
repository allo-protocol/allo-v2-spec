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
class DirectQF extends LiveObject {
    @Property()
    strategyId: Address;
}

export default DirectQF;
