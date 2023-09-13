import { Address, BeforeAll, Event, LiveObject, OnEvent, Property, saveAll,Spec } from '@spec.dev/core'

import { getStatusFromInt } from '../../shared/status'

/**
 * RFP Milestone details
 */
@Spec({
    uniqueBy: ['strategyId', 'id', 'chainId']
})
class RFPMilestone extends LiveObject {

    @Property()
    milestoneId: number

    @Property()
    strategyId: Address

    @Property()
    metadataProtocol: number

    @Property()
    metadataPointer: stringg

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

    @OnEvent('allov2.RFPSimple.MilestonesSet')
    async onMilestonesSet(event: Event) {
        // TODO-SPEC: figure out fetch all milestones from strategyId and mark them as deleted state in status
        // when invoked the second time
        // this is for soft delete ^

        const strategyContract = this.bind(this.address, 'allov2.RFPSimple')
        // TODO-ALLO: implement getMilestoneLength external function 
        const milestoneLength = await strategyContract.getMilestoneCount()
        
        const rfpMilestones: any = [];

        for(let i = 0; i < milestoneLength; i++) {
            const milestone = await strategyContract.getMilestone(i)
            
            const [protocol, pointer] = milestone.metadata

            const rfpMilestone = await this.new(RFPMilestone, {
                milestoneId: i,
                strategyId: event.origin.contractAddress,
                metadataProtocol: protocol,
                metadataPointer: pointer,
                status: getStatusFromInt(0)
            })
            rfpMilestones.push(rfpMilestone)
        }
        await saveAll(...rfpMilestones)
    }

    @OnEvent('allov2.RFPSimple.MilstoneSubmitted')
    async onMilstoneSubmitted(event: Event) {
        this.status = getStatusFromInt(1)
    }

    @OnEvent('allov2.RFPSimple.MilestoneStatusChanged')
    async onMilestoneStatusChanged(event: Event) {
        this.status = getStatusFromInt(event.data.status)
    }
}

export default RFPMilestone