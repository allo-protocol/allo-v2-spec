import { Address, BeforeAll, BigInt, Event, LiveTable, OnEvent, Property, Spec } from '@spec.dev/core'

import { decodeSQFSuperFluidInitializedData } from "../../../shared/decoders.ts";

/**
 * SQFSuperFluids details
 */
@Spec({
    uniqueBy: ['chainId', 'poolId']
})
class SQFSuperFluids extends LiveTable {

    @Property()
    strategy: Address

    // @dev bytes32
    @Property()
    strategyId: string

    @Property()
    poolId: string

    // Note: this is derived property can cannot be detected by event
    // @Property()
    // active: boolean

    @Property()
    useRegistryAnchor: boolean

    @Property()
    metadataRequired: boolean

    @Property()
    registrationStartTime: number

    @Property()
    registrationEndTime: number

    @Property()
    allocationStartTime: number

    @Property()
    allocationEndTime: number

    @Property()
    passportDecoder: Address

    @Property()
    minPassportScore: BigInt

    @Property()
    superFluidHost: Address

    @Property()
    allocationSuperToken: Address

    @Property()
    initialSuperAppBalance: BigInt

    @Property()
    gdaPool: Address

    @Property()
    distributionFlowRate: BigInt

    // ====================
    // =  Event Handlers  =
    // ====================

    @BeforeAll()
    async setCommonProperties(event: Event) {
        const poolId = await this.contract.getPoolId()

        this.poolId = poolId.toString()
        this.strategy = event.origin.contractAddress;
    }

    @OnEvent('allov2.SQFSuperFluidStrategy.Initialized')
    async onMicroGrantsInitalized(event: Event) {
        const {
            useRegistryAnchor,
            metadataRequired,
            passportDecoder,
            superfluidHost,
            allocationSuperToken,
            registrationStartTime,
            registrationEndTime,
            allocationStartTime,
            allocationEndTime,
            minPassportScore,
            initialSuperAppBalance,
        } = decodeSQFSuperFluidInitializedData(
            event.data.data
        )

        this.useRegistryAnchor = useRegistryAnchor
        this.metadataRequired = metadataRequired
        this.passportDecoder = passportDecoder
        this.superFluidHost = superfluidHost
        this.allocationSuperToken = allocationSuperToken
        this.registrationStartTime = registrationStartTime
        this.registrationEndTime = registrationEndTime
        this.allocationStartTime = allocationStartTime
        this.allocationEndTime = allocationEndTime
        this.minPassportScore = minPassportScore
        this.initialSuperAppBalance = initialSuperAppBalance

        this.distributionFlowRate = BigInt.from(0)

        const strategyId = (await this.contract.getStrategyId()).toString()
        this.strategyId = strategyId
    }

    @OnEvent('allov2.SQFSuperFluidStrategy.TimestampsUpdated')
    onPoolTimestampUpdate(event: Event) {
        this.registrationStartTime = event.data.registrationStartTime
        this.registrationEndTime = event.data.registrationEndTime
        this.allocationStartTime = event.data.allocationStartTime
        this.allocationEndTime = event.data.allocationEndTime
    }

    @OnEvent('allov2.SQFSuperFluidStrategy.MinPassportScoreUpdated')
    onMinPassportScoreUpdate(event: Event) {
        this.minPassportScore = event.data.minPassportScore
    }

    @OnEvent('allov2.SQFSuperFluidStrategy.Distributed')
    onDistributionStarted(event: Event) {
        this.distributionFlowRate = event.data.flowRate
    }
}

export default SQFSuperFluids