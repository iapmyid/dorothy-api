export interface CustomerEntityInterface {
  _id?: string;
  name?: string;
  address?: string;
  phone?: string;
  email?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class CustomerEntity implements CustomerEntityInterface {
  public _id?: string;
  public name?: string;
  public address?: string;
  public phone?: string;
  public email?: string;
  public createdAt?: Date;
  public updatedAt?: Date;

  constructor(customer: CustomerEntityInterface) {
    this._id = customer._id;
    this.name = customer.name;
    this.address = customer.address;
    this.phone = customer.phone;
    this.email = customer.email;
    this.createdAt = customer.createdAt;
    this.updatedAt = customer.updatedAt;
  }
}
