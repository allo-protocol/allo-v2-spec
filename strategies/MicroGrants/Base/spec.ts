import { Address, BeforeAll, BigInt, Event, LiveTable, OnEvent, Property, Spec } from '@spec.dev/core'

import { decodeMicroGrantsGovInitializedData, decodeMicroGrantsHatsInitializedData, decodeMicroGrantsInitializedData } from "../../../shared/decoders.ts";

/**
 * MicroGrants details
 */
@Spec({
    uniqueBy: ['chainId', 'poolId']
})
class MicroGrants extends LiveTable {

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
    allocationStartTime: number
    
    @Property()
    allocationEndTime: number

    @Property()
    approvalThreshold: number
    
    @Property()
    maxRequestedAmount: BigInt

    // ==  Unique to MicroGrantsGov ==
    @Property()
    gov: Address

    @Property()
    snapshotReference: number

    @Property()
    minVotePower: number

    // == Unique to MicroGrantsHats ==
    @Property()
    hats: Address

    @Property()
    hatId: number

    // ====================
    // =  Event Handlers  =
    // ====================

    @BeforeAll()
    setCommonProperties(event: Event) {
        this.strategy = event.origin.contractAddress;
    }

    @OnEvent('allov2.MicroGrantsStrategy.Initialized')
    async onMicroGrantsInitalized(event: Event) {
        const {
            useRegistryAnchor,
            allocationStartTime,
            allocationEndTime,
            approvalThreshold,
            maxRequestedAmount
        } = decodeMicroGrantsInitializedData(
            event.data.data
        )

        this.useRegistryAnchor = useRegistryAnchor
        this.allocationStartTime = allocationStartTime
        this.allocationEndTime = allocationEndTime
        this.approvalThreshold = approvalThreshold
        this.maxRequestedAmount = maxRequestedAmount

        this.poolId = event.data.poolId.toString()
        
        const strategyId = (await this.contract.getStrategyId()).toString()
        this.strategyId = strategyId
    }

    @OnEvent('allov2.MicroGrantsGovStrategy.Initialized')
    async onMicroGrantsGovInitalized(event: Event) {
        const {
            useRegistryAnchor,
            allocationStartTime,
            allocationEndTime,
            approvalThreshold,
            maxRequestedAmount,
            gov,
            snapshotReference,
            minVotePower,
        } = decodeMicroGrantsGovInitializedData(
            event.data.data
        )

        this.useRegistryAnchor = useRegistryAnchor
        this.allocationStartTime = allocationStartTime
        this.allocationEndTime = allocationEndTime
        this.approvalThreshold = approvalThreshold
        this.maxRequestedAmount = maxRequestedAmount
        this.gov = gov
        this.snapshotReference = snapshotReference
        this.minVotingPower = minVotingPower

        // TODO: wire in other details

        this.poolId = event.data.poolId.toString()
        
        const strategyId = (await this.contract.getStrategyId()).toString()
        this.strategyId = strategyId
    }


    @OnEvent('allov2.MicroGrantsHatsStrategy.Initialized')
    async onMicroGrantsHatsInitalized(event: Event) {
        const {
            useRegistryAnchor,
            allocationStartTime,
            allocationEndTime,
            approvalThreshold,
            maxRequestedAmount,
            hatsContract,
            hatsId
        } = decodeMicroGrantsHatsInitializedData(
            event.data.data
        )

        this.useRegistryAnchor = useRegistryAnchor
        this.allocationStartTime = allocationStartTime
        this.allocationEndTime = allocationEndTime
        this.approvalThreshold = approvalThreshold
        this.maxRequestedAmount = maxRequestedAmount

        this.hatsContract = hatsContract
        this.hatId = hatsId

        this.poolId = event.data.poolId.toString()
        
        const strategyId = (await this.contract.getStrategyId()).toString()
        this.strategyId = strategyId
    }


    @OnEvent('allov2.MicroGrantsStrategy.TimestampsUpdated')
    @OnEvent('allov2.MicroGrantsGovStrategy.TimestampsUpdated')
    @OnEvent('allov2.MicroGrantsHatsStrategy.TimestampsUpdated')
    onPoolTimestampUpdate(event: Event) {
        this.allocationStartTime = event.data.allocationStartTime
        this.allocationEndTime = event.data.allocationEndTime
    }

    @OnEvent('allov2.MicroGrantsStrategy.ApprovalThresholdUpdated')
    @OnEvent('allov2.MicroGrantsGovStrategy.ApprovalThresholdUpdated')
    @OnEvent('allov2.MicroGrantsHatsStrategy.ApprovalThresholdUpdated')
    onPoolApprovalThresholdUpdate(event: Event) {
        this.approvalThreshold = event.data.approvalThreshold
    }

    @OnEvent('allov2.MicroGrantsStrategy.MaxRequestedAmountIncreased')
    @OnEvent('allov2.MicroGrantsGovStrategy.MaxRequestedAmountIncreased')
    @OnEvent('allov2.MicroGrantsHatsStrategy.MaxRequestedAmountIncreased')
    onMaxRequestedAmountIncreased(event: Event) {
        this.maxRequestedAmount = this.maxRequestedAmount.plus(event.data.maxRequestedAmount)
    }
}

export default MicroGrants