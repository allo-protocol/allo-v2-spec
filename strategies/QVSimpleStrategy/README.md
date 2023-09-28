# QVSimple Strategy

Strategies indexed by RFPStrategy Live Objects:
- [QVSimpleStrategy](https://github.com/allo-protocol/allo-v2/blob/main/contracts/strategies/qv-simple/QVSimpleStrategy.sol)

## Live Objects

This section captures the live objects and the events which would be used to index this

### Base

- `event Initialized()`
- `event TimestampsUpdated(uint64 registrationStartTime, uint64 registrationEndTime, uint64 allocationStartTime, uint64 allocationEndTime, address sender)`

### Recipient

- `event Registered(address indexed recipientId, bytes data, address sender);`
- `event UpdatedRegistration(address indexed recipientId, bytes data, address sender, Status status);`
- `event RecipientStatusUpdated(address indexed recipientId, Status status, address sender);`
- `event Allocated(address indexed recipientId, uint256 votes, address allocator);` // To track votes received


## Events Auto Indexed

- `emit AllocatorAdded(_allocator, msg.sender);`
- `emit AllocatorRemoved(_allocator, msg.sender);`
- `event Reviewed(address indexed recipientId, Status status, address sender);`
- `event Allocated(address indexed recipientId, uint256 votes, address allocator);`
- `event Distributed(address indexed recipientId, address recipientAddress, uint256 amount, address sender);`
