import {
    Address,
    BeforeAll,
    BigInt,
    Event,
    LiveTable,
    OnEvent,
    Property,
    resolveMetadata,
    saveAll,
    Spec,
    TransactionHash
} from '@spec.dev/core'
import { getStatusFromInt } from "../../../shared/status.ts";

/**
 * Merkle Distribution details
 */
@Spec({
    uniqueBy: ['chainId', "poolId", 'recipientId']
})
class DonationVotingMerkleDistributionPayout extends LiveTable {

    @Property()
    recipientId: Address
    
    @Property()
    strategy: Address

    @Property()
    poolId: string

    @Property()
    index: number

    @Property()
    amount: BigInt

    @Property()
    token: Address

    @Property()
    transactionHash: TransactionHash

    @Property()
    merkleProof: string[]

    @Property()
    status: string

    // ====================
    // =  Event Handlers  =
    // ====================

    @BeforeAll()
    async setCommonProperties(event: Event) {
        const poolId = await this.contract.getPoolId()

        this.poolId = poolId.toString()
        this.strategy = event.origin.contractAddress
        this.recipientId = event.data.recipientId
    }

    @OnEvent('allov2.DonationVotingMerkleDistributionDirectTransferStrategy.DistributionUpdated', { autoSave: false })
    @OnEvent('allov2.DonationVotingMerkleDistributionVaultStrategy.DistributionUpdated', { autoSave: false })
    async onDistributionUpdated(event: Event) {

        const [protocol, pointer] = event.data.distributionMetadata

        await this._softDeleteExistingPayouts()

        // deno-lint-ignore no-explicit-any
        const payouts: any = []

        const poolId = await this.contract.getPoolId()

        const payoutsMetadata = await resolveMetadata(pointer, { protocol })
        for (let i = 0; i <= payoutsMetadata.length; i++) {
            // create new payout record
            const payout = this.new(DonationVotingMerkleDistributionPayout, {
                poolId: poolId.toString(),
                strategy: this.strategy,
                index: payoutsMetadata[i].index,
                recipientId: payoutsMetadata[i].recipientId,
                amount: payoutsMetadata[i].amount,
                merkleProof: payoutsMetadata[i].proof,
                status: getStatusFromInt(1), // Pending
            })
            payouts.push(payout)

        }

        await saveAll(...payouts)
    }

    @OnEvent('allov2.DonationVotingMerkleDistributionDirectTransferStrategy.FundsDistributed')
    @OnEvent('allov2.DonationVotingMerkleDistributionVaultStrategy.FundsDistributed')
    onFundDistributed(event: Event) {
        this.status = getStatusFromInt(2) // Accepted
        this.token = event.data.token
        this.transactionHash = event.origin.transactionHash
    }


    async _softDeleteExistingPayouts() {
        const existingPayouts = await this.find(DonationVotingMerkleDistributionPayout, {
            strategy: this.strategy,
            chainId: this.chainId
        })
        existingPayouts.forEach(payout => {
            payout.status = getStatusFromInt(7)
        })
        await saveAll(...existingPayouts)
    }

}

export default DonationVotingMerkleDistributionPayout