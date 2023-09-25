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
  uniqueBy: ["strategyId", "", "chainId"],
})
class QVAllocator extends LiveObject {
  @Property()
  strategyId: Address;

  @Property()
  allowedAllocators: Address[];

  // ====================
  // =  Event Handlers  =
  // ====================

  @BeforeAll()
  setCommonProperties(event: Event) {
    this.strategyId = event.origin.contractAddress;
  }

  @OnEvent("allov2.QVSimpleStrategy.AllocatorAdded")
  async onAllocatorAdded(event: Event) {
    await this.load();

    const allocator = event.data.allocator;
    this.allowedAllocators = this.allowedAllocators.concat(allocator);
  }

  @OnEvent("allov2.QVSimpleStrategy.AllocatorRemoved")
  async onAllocatorRemoved(event: Event) {
    await this.load();

    const allocator = event.data.allocator;
    this.allowedAllocators = this.allowedAllocators.filter(
      (a) => a !== allocator
    );
  }
}

export default QVAllocator;
