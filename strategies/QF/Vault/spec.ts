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
class VaultQF extends LiveObject {
    @Property()
    strategyId: Address;
}

export default VaultQF;
