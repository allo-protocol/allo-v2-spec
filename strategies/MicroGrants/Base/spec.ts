import { Address, BeforeAll, BigInt, Event, LiveObject, OnEvent, Property, Spec } from '@spec.dev/core'

import { decodeMicroGrantsInitializedData } from "../../../shared/decoders.ts";

/**
 * MicroGrants details
 */
@Spec({
    uniqueBy: ['strategy', 'chainId']
})
class MicroGrants extends LiveObject {

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
        
        const strategyId = await this.contract.getStrategyId().toString()
        this.strategyId = strategyId
    }

    @OnEvent('allov2.MicroGrantsStrategy.TimestampsUpdated')
    onPoolTimestampUpdate(event: Event) {
        this.allocationStartTime = event.data.allocationStartTime
        this.allocationEndTime = event.data.allocationEndTime
    }

    @OnEvent('allov2.MicroGrantsStrategy.ApprovalThresholdUpdated')
    onPoolApprovalThresholdUpdate(event: Event) {
        this.approvalThreshold = event.data.approvalThreshold
    }

    @OnEvent('allov2.MicroGrantsStrategy.MaxRequestedAmountIncreased')
    onMaxRequestedAmountIncreased(event: Event) {
        this.maxRequestedAmount = this.maxRequestedAmount.plus(event.data.maxRequestedAmount)
    }
}

export default MicroGrants