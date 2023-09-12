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

/**
 * Global data
 */
@Spec({
    uniqueBy: ["chainId"],
})
class Allo extends LiveObject {
    @Property()
    registry: Address;

    @Property({ default: 0 })
    feePercentage: BigInt;

    @Property({ default: 0 })
    baseFee: BigInt;

    @Property()
    treasury: Address;

    @Property()
    cloneableStrategies: Address[];

    // ====================
    // =  Event Handlers  =
    // ====================

    @BeforeAll()
    setCommonProperties(event: Event) { }

    @OnEvent("allov2.Allo.RegistryUpdated")
    onSomeEvent(event: Event) {
        this.registry = event.data.registry;
    }

    @OnEvent("allov2.Allo.FeePercentageUpdated")
    onFeePercentageUpdated(event: Event) {
        this.feePercentage = BigInt.from(event.data.feePercentage);
    }

    @OnEvent("allov2.Allo.BaseFeeUpdated")
    onBaseFeeUpdated(event: Event) {
        this.baseFee = BigInt.from(event.data.baseFee);
    }

    @OnEvent("allov2.Allo.TreasuryUpdated")
    onTreasuryUpdated(event: Event) {
        this.treasury = event.data.treasury;
    }

    @OnEvent("allov2.Allo.StrategyApproved")
    async onStrategyApproved(event: Event) {
        await this.load();

        this.cloneableStrategies.push(event.data.strategy);
    }

    @OnEvent("allov2.Allo.StrategyRemoved")
    async onStrategyRemoved(event: Event) {
        await this.load();

        this.cloneableStrategies = this.cloneableStrategies.filter(
            (strategy) => strategy !== event.data.strategy
        );
    }
}

export default Allo;
