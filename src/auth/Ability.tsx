import { AbilityBuilder, createMongoAbility } from "@casl/ability";

import { UserRole } from "../interfaces/types";

export const defineAbility = (roles: UserRole[]) => {
  const { can, cannot, build } = new AbilityBuilder(createMongoAbility);

  if (roles.includes(UserRole.User)) {
    can("access", "main");
    can("access", "account");
    cannot("access", "holidays");
    cannot("access", "devices");
    cannot("access", "reports");
    cannot("access", "courses");
  }

  if (roles.includes(UserRole.Admin)) {
    can("access", "main");
    can("access", "holidays");
    can("access", "users");
    can("access", "devices");
    can("access", "reports");
    can("access", "courses");
  }

  return build();
};
