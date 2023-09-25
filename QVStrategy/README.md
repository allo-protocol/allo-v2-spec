# Quadratic Voting Strategies

Strategies indexed by RFPStrategy Live Objects:
- [RFPSimpleStrategy](https://github.com/allo-protocol/allo-v2/blob/main/contracts/strategies/rfp-simple/RFPSimpleStrategy.sol)
- [RFPCommitteeStrategy](https://github.com/allo-protocol/allo-v2/blob/main/contracts/strategies/rfp-committee/RFPCommitteeStrategy.sol)

## Live Objects

This section captures the live objects and the events which would be used to index this

### Base   
- `event PoolActive(bool active);`
- `event TimestampsUpdated(uint256 registrationStartTime, uint256 registrationEndTime, uint256 allocationStartTime, uint256 allocationEndTime);`

### QVAllocator
- `event AllocatorAdded(address allocator, address sender);`
- `event AllocatorRemoved(address allocator, address sender);`

### QVRecipient
- `event RecipientStatusUpdated(address indexed recipientId, bytes data, address sender);`
- `event UpdatedRegistration(address indexed recipientId, bytes data, address sender, Status status);`
    
## Events Auto Indexed
This section lists out events which would auto indexed by spec and hence wouldn't require a custom live object to be created
- `event Allocated(address indexed recipientId, uint256 amount, address token, address sender);`
- `event Distributed(address indexed recipientId, address recipientAddress, uint256 amount, address sender);`
- `event Voted(address indexed recipientId, address voter);`
