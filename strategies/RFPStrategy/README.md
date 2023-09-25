# RFP Strategies

Strategies indexed by RFPStrategy Live Objects:
- [RFPSimpleStrategy](https://github.com/allo-protocol/allo-v2/blob/main/contracts/strategies/rfp-simple/RFPSimpleStrategy.sol)
- [RFPCommitteeStrategy](https://github.com/allo-protocol/allo-v2/blob/main/contracts/strategies/rfp-committee/RFPCommitteeStrategy.sol)

## Live Objects

This section captures the live objects and the events which would be used to index this

### Global   
- `event PoolActive(bool active);`
- `event MaxBidIncreased(uint256 maxBid);`

### Milestone
- `event MilestonesSet();`
- `event MilstoneSubmitted(uint256 milestoneId);`
- `event MilestoneStatusChanged(uint256 milestoneId, Status status);`

### Recipient
- `event Registered(address indexed recipientId, bytes data, address sender);`
- `event UpdatedRegistration(address indexed recipientId, bytes data, address sender);`
    
## Events Auto Indexed
This section lists out events which would auto indexed by spec and hence wouldn't require a custom live object to be created
- `event Allocated(address indexed recipientId, uint256 amount, address token, address sender);`
- `event Distributed(address indexed recipientId, address recipientAddress, uint256 amount, address sender);`
- `event Voted(address indexed recipientId, address voter);`
