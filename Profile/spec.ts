import {
    Address,
    BeforeAll,
    Event,
    LiveObject,
    OnEvent,
    Property,
    Spec,
    Timestamp,
} from "@spec.dev/core";

/**
 * All Profiles created on Registry
 */
@Spec({
    uniqueBy: ["profileId", "chainId"],
})
class Profile extends LiveObject {
    @Property()
    profileId: Address;

    @Property()
    nonce: number;

    @Property()
    name: string;

    @Property()
    metadataProtocol: number;

    @Property()
    metadataPointer: string;

    @Property()
    owner: Address;

    @Property()
    anchor: Address;

    @Property()
    createdAt: Timestamp;

    // TODO: would this be a new object Account, new object Role and then create a join  of sorts?
    // Reference : https://github.com/allo-protocol/allo-v2-graph/blob/main/schema.graphql
    @Property()
    members: Address[];

    // ====================
    // =  Event Handlers  =
    // ====================

    @BeforeAll()
    setCommonProperties(event: Event) {
    }

    @OnEvent("allov2.Profile.ProfileCreated")
    onSomeEvent(event: Event) {
        this.profileId = event.data.profileId;
        this.nonce = event.data.nonce;

        this.name = event.data.name;
        [this.metadataPointer, this.metadataProtocol] = event.data.metadata;
        this.owner = event.data.owner;
        this.anchor = event.data.anchor;

        this.createdAt = this.blockTimestamp;
    }

    @OnEvent("allov2.Profile.ProfileNameUpdated")
    onProfileNameUpdated(event: Event) {
        this.name = event.data.name;
        this.anchor = event.data.anchor;
    }

    @OnEvent("allov2.Profile.ProfileMetadataUpdated")
    onProfileMetadataUpdated(event: Event) {
        [this.metadataPointer, this.metadataProtocol] = event.data.metadata;
    }

    @OnEvent("allov2.Profile.ProfileOwnerUpdated")
    onProfileOwnerUpdated(event: Event) {
        this.owner = event.data.owner;
    }

    // _revokeRole
    // _grantRole
}

export default Profile;
