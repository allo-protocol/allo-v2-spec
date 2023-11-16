import { Address, BeforeAll, Event, LiveTable, OnEvent, Property, saveAll,Spec } from '@spec.dev/core'

import { getStatusFromInt } from '../../../shared/status.ts'

/**
 * RFP Milestone details
 */
@Spec({
    uniqueBy: ['chainId', 'poolId', 'milestoneId']
})
class RFPMilestone extends LiveTable {

    @Property()
    milestoneId: number

    @Property()
    poolId: string

    @Property()
    strategy: Address

    @Property()
    recipientId: Address

    @Property()
    metadataProtocol: number

    @Property()
    metadataPointer: string

    @Property()
    amountPercentage: number

    @Property()
    status: string

    // ====================
    // =  Event Handlers  =
    // ====================

    @BeforeAll()
    setCommonProperties(event: Event) {
        this.strategy = event.origin.contractAddress;
        this.milestoneId = event.data.milestoneId;
    }

    @OnEvent('allov2.RFPSimpleStrategy.MilestonesSet', { autoSave: false })
    @OnEvent('allov2.RFPCommitteeStrategy.MilestonesSet', { autoSave: false })
    async onMilestonesSet(event: Event) {

       await this._softDeleteExistingMilestones();

        const milestoneLength = event.data.milestonesLength
        
        const recipientId = await this.contract.acceptedRecipientId()

        const poolId = await this.contract.getPoolId()

        // deno-lint-ignore no-explicit-any
        const rfpMilestones: any = [];

        for(let i = 0; i < milestoneLength; i++) {
            const milestone = await this.contract.getMilestone(i)
            
            // TODO: working to auto-reconstruct the tuple responses. Ask ben
            const [protocol, pointer] = milestone.metadata

            const rfpMilestone = this.new(RFPMilestone, {
                milestoneId: i,
                strategy: this.strategy,
                poolId: poolId.toString(),
                recipientId: recipientId,
                metadataProtocol: protocol,
                metadataPointer: pointer,
                amountPercentage: milestone.amountPercentage,
                status: getStatusFromInt(0)
            })
            rfpMilestones.push(rfpMilestone)
        }
        await saveAll(...rfpMilestones)
    }

    @OnEvent('allov2.RFPSimpleStrategy.MilstoneSubmitted')
    @OnEvent('allov2.RFPCommitteeStrategy.MilstoneSubmitted')
    onMilstoneSubmitted() {
        this.status = getStatusFromInt(1)
    }

    @OnEvent('allov2.RFPSimpleStrategy.MilestoneStatusChanged')
    @OnEvent('allov2.RFPCommitteeStrategy.MilestoneStatusChanged')
    onMilestoneStatusChanged(event: Event) {
        this.status = getStatusFromInt(event.data.status)
    }

    async _softDeleteExistingMilestones() {
        const existingMilestones = await this.find(RFPMilestone, {
            strategy: this.strategy,
            chainId: this.chainId
        })
        existingMilestones.forEach(milestone => {
            milestone.status = getStatusFromInt(7)
        })
        await saveAll(...existingMilestones)
    }
}

export default RFPMilestone