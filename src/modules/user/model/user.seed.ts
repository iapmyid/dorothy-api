import { UserRolesTypes, UserStatusTypes } from "./user.entity.js";
import { hash } from "@src/utils/hash.js";

export const userSeeds = [
  {
    name: "Admin",
    username: "admin",
    password: await hash("adm2023"),
    role: UserRolesTypes.Administrator,
    status: UserStatusTypes.Active,
    createdAt: new Date(),
  },
  {
    name: "Cashier",
    username: "cashier",
    password: await hash("cashier2023"),
    role: UserRolesTypes.Cashier,
    status: UserStatusTypes.Active,
    createdAt: new Date(),
  },
];
