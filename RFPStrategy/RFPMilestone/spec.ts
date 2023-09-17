import { Address, BeforeAll, Event, LiveObject, OnEvent, Property, saveAll,Spec } from '@spec.dev/core'

import { getStatusFromInt } from '../../shared/status.ts'

/**
 * RFP Milestone details
 */
@Spec({
    uniqueBy: ['strategyId', 'milestoneId', 'chainId']
})
class RFPMilestone extends LiveObject {

    @Property()
    milestoneId: number

    @Property()
    strategyId: Address

    @Property()
    recipientId: Address

    @Property()
    metadataProtocol: number

    @Property()
    metadataPointer: string

    @Property()
    status: string

    // ====================
    // =  Event Handlers  =
    // ====================

    @BeforeAll()
    setCommonProperties(event: Event) {
        this.strategyId = event.origin.contractAddress;
        this.milestoneId = event.data.milestoneId;
    }

    @OnEvent('allov2.RFPSimpleStrategy.MilestonesSet', { autoSave: false })
    @OnEvent('allov2.RFPCommitteeStrategy.MilestonesSet', { autoSave: false })
    async onMilestonesSet() {

       await this._softDeleteExistingMilestones();

        const milestoneLength = await this.contract.getMilestoneCount()
        
        const recipientId = await this.contract.acceptedRecipientId()

        // deno-lint-ignore no-explicit-any
        const rfpMilestones: any = [];

        for(let i = 0; i < milestoneLength; i++) {
            const milestone = await this.contract.getMilestone(i)
            
            const [protocol, pointer] = milestone.metadata

            const rfpMilestone = this.new(RFPMilestone, {
                milestoneId: i,
                strategyId: this.strategyId,
                recipientId: recipientId,
                metadataProtocol: protocol,
                metadataPointer: pointer,
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
            strategyId: this.strategyId
        })
        existingMilestones.forEach(milestone => {
            milestone.status = getStatusFromInt(7)
        })
        await saveAll(...existingMilestones)
    }
}

export default RFPMilestone