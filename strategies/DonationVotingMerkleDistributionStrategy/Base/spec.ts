import { Address, BeforeAll, Event, LiveTable, OnEvent, Property, Spec } from '@spec.dev/core'

import { decodeDonationVotingMerkleDistributionInitializedData } from "../../../shared/decoders.ts";

/**
 * DonationVotingMerkleDistribution details
 */
@Spec({
    uniqueBy: ['chainId', 'poolId'],
})
class DonationVotingMerkleDistribution extends LiveTable {
    @Property()
    strategy: Address

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
    async setCommonProperties(event: Event) {
        const poolId = await this.contract.getPoolId()

        this.poolId = poolId.toString()
        this.strategy = event.origin.contractAddress
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
        this.allowedTokens = allowedTokens        
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