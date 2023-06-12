export interface WarehouseEntityInterface {
  _id?: string;
  name?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class WarehouseEntity implements WarehouseEntityInterface {
  public _id?: string;
  public name?: string;
  public createdAt?: Date;
  public updatedAt?: Date;

  constructor(warehouse: WarehouseEntityInterface) {
    this._id = warehouse._id;
    this.name = warehouse.name;
    this.createdAt = warehouse.createdAt;
    this.updatedAt = warehouse.updatedAt;
  }
}
