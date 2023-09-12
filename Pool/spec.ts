import {
    Address,
    BeforeAll,
    BigInt,
    Event,
    LiveObject,
    OnEvent,
    Property,
    Spec,
    Timestamp,
} from "@spec.dev/core";

import { generatePoolRoleIds } from "../shared/roles";

/**
 * All Pools created on Allo
 */
@Spec({
    uniqueBy: ["poolId", "chainId"],
})
class Pool extends LiveObject {
    @Property()
    poolId: string;

    // @dev: Links to Profile.profileId
    @Property()
    profileId: Address;

    @Property()
    strategy: Address;

    @Property()
    token: Address;

    @Property({ default: 0 })
    amount: BigInt;

    @Property({ default: 0 })
    feePaid: BigInt;

    @Property({ default: 0 })
    baseFeePaid: BigInt;

    @Property()
    metadataProtocol: number;

    @Property()
    metadataPointer: string;

    @Property()
    managerRoleId: string;

    @Property()
    adminRoleId: string;

    @Property()
    createdAt: Timestamp;

    // ====================
    // =  Event Handlers  =
    // ====================

    @BeforeAll()
    setCommonProperties(event: Event) {
        this.poolId = event.data.poolId.toString();
    }

    @OnEvent("allov2.Allo.PoolCreated")
    onPoolCreated(event: Event) {
        this.profileId = event.data.profileId;
        this.strategy = event.data.strategy;
        this.token = event.data.token;

        // @dev : ignore this as it would be handled on PoolFunded event
        // this.amount = BigInt.from(event.data.amount)

        const [pointer, protocol] = event.data.metadata;
        this.metadataPointer = pointer;
        this.metadataProtocol = protocol;

        const [managerRoleId, adminRoleId] = generatePoolRoleIds(this.poolId);
        this.managerRoleId = managerRoleId;
        this.adminRoleId = adminRoleId;

        this.createdAt = this.blockTimestamp;
    }

    @OnEvent("allov2.Allo.PoolMetadataUpdated")
    onPoolMetadataUpdated(event: Event) {
        const [pointer, protocol] = event.data.metadata;
        this.metadataPointer = pointer;
        this.metadataProtocol = protocol;
    }

    @OnEvent("allov2.Allo.PoolFunded")
    async onPoolFunded(event: Event) {
        await this.load();

        this.amount = this.amount.plus(event.data.amount);
        this.feePaid = this.feePaid.plus(event.data.feePaid);
    }

    @OnEvent("allov2.Allo.BaseFeePaid")
    async onBaseFeePaid(event: Event) {
        await this.load();
        this.baseFeePaid = this.baseFeePaid.plus(event.data.amount);
    }
}

export default Pool;
