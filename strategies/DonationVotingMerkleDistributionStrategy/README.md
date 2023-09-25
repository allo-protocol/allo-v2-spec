# Donation Voting Merkle Distribution Strategy

Strategies indexed by DonationVotingMerkleDistributionStrategy Live Objects:
- [DonationVotingMerkleDistributionBaseStrategy](https://github.com/allo-protocol/allo-v2/blob/main/contracts/strategies/donation-voting-merkle-base/DonationVotingMerkleDistributionBaseStrategy.sol)
- [DonationVotingMerkleDistributionVaultStrategy](https://github.com/allo-protocol/allo-v2/blob/main/contracts/strategies/donation-voting-merkle-distribution-vault/DonationVotingMerkleDistributionVaultStrategy.sol)
- [DonationVotingMerkleDistributionDirectTransferStrategy](https://github.com/allo-protocol/allo-v2/blob/main/contracts/strategies/donation-voting-merkle-distribution-direct-transfer/DonationVotingMerkleDistributionDirectTransferStrategy.sol)

## Live Objects

This section captures the live objects and the events which would be used to index this

### Base
- `event TimestampsUpdated(uint64 registrationStartTime, uint64 registrationEndTime, uint64 allocationStartTime, uint64 allocationEndTime, address sender);`
- `event DistributionUpdated(bytes32 merkleRoot, Metadata metadata);`


### Recipient
- `event Registered(address indexed recipientId, bytes data, address sender);`
- `event UpdatedRegistration(address indexed recipientId, bytes data, address sender, uint8 status);`
- `event RecipientStatusUpdated(uint256 indexed rowIndex, uint256 fullRow, address sender);`


### Payout
Populate list of recipients who should be paid and track payment status.
- `event DistributionUpdated(bytes32 merkleRoot, Metadata metadata);`  // Decode metadata to get payouts
- `event FundsDistributed(uint256 amount, address grantee, address indexed token, address indexed recipientId);`

### Events Auto Indexed
- `event Allocated(address indexed recipientId, uint256 amount, address token, address sender);`
- `event BatchPayoutSuccessful(address indexed sender);`
- `event FundsDistributed(uint256 amount, address grantee, address indexed token, address indexed recipientId);`
- `event Claimed(address indexed recipientId, address recipientAddress, uint256 amount, address token);`