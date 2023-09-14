import { Address, BeforeAll, BigInt, Event, LiveObject, OnEvent, Property, Spec } from '@spec.dev/core'

import { decodeRFPRegistrationData } from '../../shared/decoders.ts'
import { getStatusFromInt } from '../../shared/status.ts'

@Spec({
    uniqueBy: ['strategyId', 'recipientId', 'chainId']
})

class QVRecipient extends LiveObject {

  @Property()
  recipientId: Address

  @Property()
  strategyId: Address

  @Property({ default: 0 })
  totalVotesReceived: BigInt

  @Property()
  isRegistryAnchor: boolean

  @Property()
  status: string

  @Property()
  metadataProtocol: number

  @Property()
  metadataPointer: string

  @Property()
  sender: Address

  @Property()
  recipientAddress: Address

  // ====================
  // =  Event Handlers  =
  // ====================

  @BeforeAll()
  setCommonProperties(event: Event) {
    this.strategyId = event.origin.contractAddress
    this.recipientId = event.data.recipientId
  }

  
}

export default QVRecipient

    // struct Recipient {
    //     // slot 0
    //     uint256 totalVotesReceived;
    //     // slot 1
    //     bool useRegistryAnchor;
    //     address recipientAddress;
    //     Metadata metadata;
    //     Status recipientStatus;
    // }