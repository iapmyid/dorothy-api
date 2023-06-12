export interface SupplierEntityInterface {
  _id?: string;
  name?: string;
  address?: string;
  phone?: string;
  email?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class SupplierEntity implements SupplierEntityInterface {
  public _id?: string;
  public name?: string;
  public address?: string;
  public phone?: string;
  public email?: string;
  public createdAt?: Date;
  public updatedAt?: Date;

  constructor(supplier: SupplierEntityInterface) {
    this._id = supplier._id;
    this.name = supplier.name;
    this.address = supplier.address;
    this.phone = supplier.phone;
    this.email = supplier.email;
    this.createdAt = supplier.createdAt;
    this.updatedAt = supplier.updatedAt;
  }
}
