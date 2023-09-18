import { Address, BeforeAll, BigInt, Event, LiveObject, OnEvent, Property, Spec } from '@spec.dev/core'

/**
 * Merkle Distribution details
 */
@Spec({
    uniqueBy: ['strategyId', "recipientId", 'chainId']
})
class DonationVotingMerkleDistributionPayout extends LiveObject {
    @Property()
    recipientId: Address
    
    @Property()
    strategyId: Address

    @Property()
    index: number

    @Property()
    amount: BigInt

    @Property()
    merkleProof: string[]

    // ====================
    // =  Event Handlers  =
    // ====================

    @BeforeAll()
    setCommonProperties(event: Event) {}

    @OnEvent('allov2.MerkleDistribution.DistributionUpdated')
    onDistributionUpdated(event: Event) {}

    @OnEvent('allov2.MerkleDistribution.BatchPayoutSuccessful')
    onBatchPayoutSuccessful(event: Event) {}
}

export default DonationVotingMerkleDistributionPayout