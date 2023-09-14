## Strategies to be indexed
  // ==== Event Handlers ===================


    // @OnEvent("allov2.BaseStrategy.Allocated")
    // @OnEvent("allov2.BaseStrategy.Allocated")
    // onAllocatedRFPSimple(event: Event) {
    //     // decode data1
    // }

    // @OnEvent("allov2.RFPSimple.Registered")
    // onAllocatedQVSimple(event: Event) {
    //     // decode data2
    // }


    // ==== STRATEGY 2 MERKLE DISTRIBUTION QF =====
    // https://github.com/allo-protocol/allo-v2/blob/main/contracts/strategies/donation-voting-merkle-base/DonationVotingMerkleDistributionBaseStrategy.sol

    // emit TimestampsUpdated(
    //     registrationStartTime, registrationEndTime, allocationStartTime, allocationEndTime, msg.sender
    // );
    // emit DistributionUpdated(merkleRoot, distributionMetadata);
    
    // emit Registered(recipientId, extendedData, _sender);
    // emit UpdatedRegistration(recipientId, _data, _sender, _getUintRecipientStatus(recipientId));
    // emit RecipientStatusUpdated(rowIndex, fullRow, msg.sender);
    
    // emit Allocated(recipientId, amount, token, _sender);
    
    // emit BatchPayoutSuccessful(_sender); NOT NEEDED
    // emit FundsDistributed(amount, recipientAddress, pool.token, recipientId);

    // ==== STRATEGY 3 =====
    // https://github.com/allo-protocol/allo-v2/blob/main/contracts/strategies/qv-base/QVBaseStrategy.sol
    
    // emit TimestampsUpdated(
    //     registrationStartTime, registrationEndTime, allocationStartTime, allocationEndTime, msg.sender
    // );
        
    // emit Registered(recipientId, _data, _sender);
    // emit UpdatedRegistration(recipientId, _data, _sender, recipient.recipientStatus);
    // emit RecipientStatusUpdated(recipientId, recipientStatus, address(0));
    // emit Reviewed(recipientId, recipientStatus, msg.sender);
    
    // emit Allocated(_recipientId, voteResult, _sender);
    
    // event AllocatorAdded(address indexed allocator, address sender);
    // event AllocatorRemoved(address indexed allocator, address sender);

    // emit Distributed(recipientId, recipient.recipientAddress, amount, _sender);
