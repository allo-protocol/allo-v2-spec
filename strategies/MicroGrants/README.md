# MicroGrants Strategy

Strategies indexed by MicroGrants Live Objects:
- [MicroGrants](https://github.com/allo-protocol/allo-v2/blob/main/contracts/strategies/_poc/micro-grants/MicroGrantsStrategy.sol)


## Live Objects

This section captures the live objects and the events which would be used to index this

### Base   
- `event Initialized()`
- `event MaxRequestedAmountIncreased(uint256 maxRequestedAmount);`
- `event TimestampsUpdated(uint64 allocationStartTime, uint64 allocationEndTime, address sender);`
- `event ApprovalThresholdUpdated(uint256 approvalThreshold);`

### Recipient
- `event Registered(address indexed recipientId, bytes data, address sender);`
- `event UpdatedRegistration(address indexed recipientId, bytes data, address sender);`
- `event Allocated(address indexed recipientId, Status status, address sender);`
- `event Distributed(address indexed recipientId, address recipientAddress, uint256 amount, address sender);`

## Events Auto Indexed
This section lists out events which would auto indexed by spec and hence wouldn't require a custom live object to be created
- `event Allocated(address indexed recipientId, Status status, address sender);`
- `event Distributed(address indexed recipientId, address recipientAddress, uint256 amount, address sender);`
