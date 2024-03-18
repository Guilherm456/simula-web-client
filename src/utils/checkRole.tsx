import { Roles } from "@models/user.model";

const checkRole = (role: Roles, userRole: string) => {
  const roleHierarchy = {
    guest: ["guest", "user", "admin"],
    user: ["user", "admin"],
    admin: ["admin"],
  };

  if (role in roleHierarchy) return roleHierarchy[role]?.includes(userRole);
  else return false;
};

export default checkRole;
