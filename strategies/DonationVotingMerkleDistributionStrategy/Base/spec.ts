import { Address, BeforeAll, Event, LiveObject, OnEvent, Property, Spec } from '@spec.dev/core'

import { decodeDonationVotingMerkleDistributionInitializedData } from "../../../shared/decoders.js";

/**
 * DonationVotingMerkleDistribution details
 */
@Spec({
    uniqueBy: ['strategyId', 'chainId'],
})
class DonationVotingMerkleDistribution extends LiveObject {
    @Property()
    strategyId: Address

    @Property()
    poolId: string

    // TODO: this is derived property can cannot be detected by event
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
    allowedTokens: Address[]

    @Property()
    merkleRoot: string

    @Property()
    distributionMetadataProtocol: number

    @Property()
    distributionMetadataPointer: string

    // ====================
    // =  Event Handlers  =
    // ====================

    @BeforeAll()
    setCommonProperties(event: Event) {
        this.strategyId = event.origin.contractAddress
    }

    @OnEvent('allov2.DonationVotingMerkleDistributionDirectTransferStrategy.Initialized')
    @OnEvent('allov2.DonationVotingMerkleDistributionVaultStrategy.Initialized')
    onInitalized(event: Event) {
        const {
            useRegistryAnchor,
            metadataRequired,
            registrationStartTime,
            registrationEndTime,
            allocationStartTime,
            allocationEndTime,
            allowedTokens
        } = decodeDonationVotingMerkleDistributionInitializedData(
            event.data.data
        )

        this.useRegistryAnchor = useRegistryAnchor
        this.metadataRequired = metadataRequired
        this.registrationStartTime = registrationStartTime
        this.registrationEndTime = registrationEndTime
        this.allocationStartTime = allocationStartTime
        this.allocationEndTime = allocationEndTime
        // TODO: check if valid assignment of allowedTokens
        this.allowedTokens = allowedTokens
        
        this.poolId = event.data.poolId.toString()
    }

    @OnEvent('allov2.DonationVotingMerkleDistributionDirectTransferStrategy.TimestampsUpdated')
    @OnEvent('allov2.DonationVotingMerkleDistributionVaultStrategy.TimestampsUpdated')
    onTimestampsUpdated(event: Event) {
        this.registrationStartTime = event.data.registrationStartTime
        this.registrationEndTime = event.data.registrationEndTime
        this.allocationStartTime = event.data.allocationStartTime
        this.allocationEndTime = event.data.allocationEndTime
    }

    @OnEvent('allov2.DonationVotingMerkleDistributionDirectTransferStrategy.DistributionUpdated')
    @OnEvent('allov2.DonationVotingMerkleDistributionVaultStrategy.DistributionUpdated')
    onDistributionUpdated(event: Event) {
        this.merkleRoot = event.data.merkleRoot

        const [protocol, pointer] = event.data.distributionMetadata
        this.distributionMetadataProtocol = protocol
        this.distributionMetadataPointer = pointer
    }
}

export default DonationVotingMerkleDistribution