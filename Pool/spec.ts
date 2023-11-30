import {
    Address,
    BeforeAll,
    BigInt,
    Event,
    getERC20TokenMetadata,
    Json,
    LiveTable,
    OnEvent,
    Property,
    Spec,
    Timestamp,
} from "@spec.dev/core";

import { getStrategyContractGroup } from "../shared/contractCall.ts";
import { generatePoolRoleIds } from "../shared/roles.ts";

/**
 * All Pools created on Allo
 */
@Spec({
    uniqueBy: ["poolId", "chainId"],
})
class Pool extends LiveTable {
    @Property()
    poolId: string;

    // @dev: Links to Profile.profileId
    @Property()
    profileId: Address;

    @Property()
    strategyName: string;

    // @dev : bytes32
    @Property()
    strategyId: string;

    @Property()
    strategy: Address;

    @Property()
    token: Address;

    @Property()
    tokenMetadata: Json;

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
    async onPoolCreated(event: Event) {
        this.profileId = event.data.profileId;
        this.strategy = event.data.strategy;
        this.token = event.data.token.toLowerCase();
        this.tokenMetadata = await getERC20TokenMetadata(this.chainId, this.token)

        // @dev : ignore this as it would be handled on PoolFunded event
        // this.amount = BigInt.from(event.data.amount)

        const [protocol, pointer] = event.data.metadata;
        this.metadataPointer = pointer;
        this.metadataProtocol = protocol;

        const [managerRoleId, adminRoleId] = generatePoolRoleIds(this.poolId);
        this.managerRoleId = managerRoleId;
        this.adminRoleId = adminRoleId;

        this.createdAt = this.blockTimestamp;

        const { strategyId, contractGroups, contractGroupName } = await getStrategyContractGroup(this.chainId, this.strategy)
        if (contractGroups && contractGroups?.length > 0) {
            for (const contractGroup of contractGroups) {
                this.addContractToGroup(this.strategy, contractGroup)
            }
            this.strategyId = strategyId
            this.strategyName = contractGroupName
        }
    }

    @OnEvent("allov2.Allo.PoolMetadataUpdated")
    onPoolMetadataUpdated(event: Event) {
        const [protocol, pointer] = event.data.metadata;
        this.metadataPointer = pointer;
        this.metadataProtocol = protocol;
    }

    @OnEvent("allov2.Allo.PoolFunded")
    async onPoolFunded(event: Event) {
        await this.load();
        this.amount = this.amount.plus(event.data.amount);
        this.feePaid = this.feePaid.plus(event.data.fee);
    }

    @OnEvent("allov2.Allo.BaseFeePaid")
    async onBaseFeePaid(event: Event) {
        await this.load();
        this.baseFeePaid = this.baseFeePaid.plus(event.data.amount);
    }
}

export default Pool;
