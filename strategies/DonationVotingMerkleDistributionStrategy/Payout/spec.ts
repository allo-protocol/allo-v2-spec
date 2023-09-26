import { Address, BeforeAll, BigInt, Event, LiveObject, OnEvent, Property, resolveMetadata, Spec,TransactionHash } from '@spec.dev/core'
import { saveAll } from 'https://esm.sh/v132/@spec.dev/core@0.0.122/dist/main/lib/helpers/db.js';

import { getStatusFromInt } from "../../../shared/status.ts";

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
    setCommonProperties(event: Event) {
        this.strategyId = event.origin.contractAddress
        this.recipientId = event.data.recipientId
    }

    @OnEvent('allov2.DonationVotingMerkleDistributionDirectTransferStrategy.DistributionUpdated', { autoSave: false })
    @OnEvent('allov2.DonationVotingMerkleDistributionVaultStrategy.DistributionUpdated', { autoSave: false })
    async onDistributionUpdated(event: Event) {

        const [protocol, pointer] = event.data.distributionMetadata

        await this._softDeleteExistingPayouts()

        // deno-lint-ignore no-explicit-any
        const payouts: any = []

        const payoutsMetadata = await resolveMetadata(pointer, { protocol })
        for (let i = 0; i <= payoutsMetadata.length; i++) {
            // create new payout record
            const payout = this.new(DonationVotingMerkleDistributionPayout, {
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
            strategyId: this.strategyId,
            chainId: this.chainId
        })
        existingPayouts.forEach(payout => {
            payout.status = getStatusFromInt(7)
        })
        await saveAll(...existingPayouts)
    }

}

export default DonationVotingMerkleDistributionPayout