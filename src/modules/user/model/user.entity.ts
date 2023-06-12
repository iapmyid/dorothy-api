export enum UserStatusTypes {
  Active = "active",
  Suspended = "suspended",
}

export enum UserRolesTypes {
  Admin = "admin",
  Cashier = "cashier",
}

export interface UserEntityInterface {
  _id?: string;
  name?: string;
  username?: string;
  password?: string;
  role?: UserRolesTypes;
  status?: UserStatusTypes;
  createdAt?: Date;
  updatedAt?: Date;
}

export class UserEntity implements UserEntityInterface {
  public _id?: string;
  public name?: string;
  public username?: string;
  public password?: string;
  public role?: UserRolesTypes;
  public status?: UserStatusTypes;
  public createdAt?: Date;
  public updatedAt?: Date;

  constructor(user: UserEntityInterface) {
    this._id = user._id;
    this.name = user.name;
    this.username = user.username;
    this.password = user.password;
    this.role = user.role;
    this.status = user.status;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }
}
