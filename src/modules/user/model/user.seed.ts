import { UserRolesTypes, UserStatusTypes } from "./user.entity.js";

export const userSeeds = [
  {
    name: "Admin",
    username: "admin",
    password: "admin2023",
    role: UserRolesTypes.Admin,
    status: UserStatusTypes.Active,
    createdAt: new Date(),
  },
  {
    name: "Cashier",
    username: "cashier",
    password: "cashier2023",
    role: UserRolesTypes.Admin,
    status: UserStatusTypes.Active,
    createdAt: new Date(),
  },
];
