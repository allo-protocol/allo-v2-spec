import { LiveObject, Spec, Property, Event, OnEvent, Address, BigInt, Json, Timestamp } from '@spec.dev/core'

/**
 * All Profiles created on Registry
 */
@Spec({ 
    uniqueBy: ['profileId', 'chainId'] 
})
class Profile extends LiveObject {
    
    @Property()
    profileId: Address

    // TODO: int256
    // TODO: what are the supported datatypes?
    @Property()
    nonce: number

    @Property()
    name: string

    @Property()
    metadata: Json

    @Property()
    owner: Address  

    @Property()
    anchor: Address

    @Property()
    createdAt: Timestamp

    @Property()
    updatedAt: Timestamp

    // TODO: would this be a new object Account, new object Role and then create a join  of sorts?
    // Reference : https://github.com/allo-protocol/allo-v2-graph/blob/main/schema.graphql
    @Property()
    members: Address[]
    

    // ==== Event Handlers ===================

    @OnEvent('allov2.Profile.ProfileCreated')
    onSomeEvent(event: Event) {
        this.profileId = event.data.profileId
        this.nonce = event.data.nonce
    
        this.name = event.data.name
        this.metadata = event.data.metadata
        // TODO: i can use resolveMetadata to fetch the metadata to add more information ?
        // Do i pass the ipfs pinning service ?
        this.owner = event.data.owner
        this.anchor = event.data.anchor

        this.createdAt = this.blockTimestamp
        this.updatedAt = this.blockTimestamp
    }

    @OnEvent('allov2.Profile.ProfileNameUpdated')
    onProfileNameUpdated(event: Event) {

        this.name = event.data.name
        this.anchor = event.data.anchor

        this.updatedAt = this.blockTimestamp
    }

    @OnEvent('allov2.Profile.ProfileMetadataUpdated')
    onProfileMetadataUpdated(event: Event) { 

        this.metadata = event.data.metadata
        this.updatedAt = this.blockTimestamp
    }

    @OnEvent('allov2.Profile.ProfileOwnerUpdated')
    onProfileOwnerUpdated(event: Event) {
        this.owner = event.data.owner

        this.updatedAt = this.blockTimestamp
    }

    // _revokeRole
    // _grantRole
}

export default Profile