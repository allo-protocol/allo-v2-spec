import { Address, BeforeAll, Event, LiveObject, OnEvent, Property, saveAll,Spec } from '@spec.dev/core'

import { getStatusFromInt } from '../../shared/status'

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

    @OnEvent('allov2.RFPSimple.MilestonesSet', { autoSave: false })
    async onMilestonesSet(event: Event) {
        const existingMilestones = await this.find(RFPMilestone, {
            strategyId: this.strategyId
        })
        existingMilestones.forEach(milestone => {
            milestone.status = 'deleted-or-something' // TODO-SPEC:
        })
        await saveAll(...existingMilestones)

        // TODO-ALLO: implement getMilestoneLength external function 
        const milestoneLength = await this.contract.getMilestoneCount()
        
        // deno-lint-ignore no-explicit-any
        const rfpMilestones: any = [];

        for(let i = 0; i < milestoneLength; i++) {
            const milestone = await this.contract.getMilestone(i)
            
            const [protocol, pointer] = milestone.metadata

            const rfpMilestone = this.new(RFPMilestone, {
                milestoneId: i,
                strategyId: this.strategyId,
                metadataProtocol: protocol,
                metadataPointer: pointer,
                status: getStatusFromInt(0)
            })
            rfpMilestones.push(rfpMilestone)
        }
        await saveAll(...rfpMilestones)
    }

    // TODO-SPEC: should we reomove the async/await here? are we awaiting anyghing under the hood?
    @OnEvent('allov2.RFPSimple.MilstoneSubmitted')
    async onMilstoneSubmitted() {
        this.status = await getStatusFromInt(1)
    }

    @OnEvent('allov2.RFPSimple.MilestoneStatusChanged')
    async onMilestoneStatusChanged(event: Event) {
        this.status = await getStatusFromInt(event.data.status)
    }
}

export default RFPMilestone