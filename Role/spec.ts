import {
  Event,
  LiveTable,
  OnEvent,
  Property,
  saveAll,
  Spec,
} from "@spec.dev/core";

import { generatePoolRoleIds } from "../shared/roles.ts";

/**
 * A role on Allo.
 */
@Spec({
  uniqueBy: ["roleId", "chainId"],
})
class Role extends LiveTable {
  @Property()
  roleId: string;

  // ====================
  // =  Event Handlers  =
  // ====================

  // @dev: This is cause Profile.owner is not set via OZ roles
  @OnEvent("allov2.Registry.ProfileCreated")
  createProfileRole(event: Event) {
    this.roleId = event.data.profileId;
  }

  @OnEvent("allov2.Allo.RoleGranted")
  @OnEvent("allov2.Registry.RoleGranted")
  createAccountRole(event: Event) {
    this.roleId = event.data.role;
  }

  @OnEvent("allov2.Allo.PoolCreated", { autoSave: false })
  async createPoolRoles(event: Event) {
    await saveAll(
      ...generatePoolRoleIds(event.data.poolId.toString()).map((roleId) =>
        this.new(Role, { roleId })
      )
    );
  }
}

export default Role;
