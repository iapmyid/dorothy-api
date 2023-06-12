export interface ItemEntityInterface {
  _id?: string;
  category_id?: string;
  name?: string;
  sellingPrice?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export class ItemEntity implements ItemEntityInterface {
  public _id?: string;
  public category_id?: string;
  public name?: string;
  public sellingPrice?: number;
  public createdAt?: Date;
  public updatedAt?: Date;

  constructor(item: ItemEntityInterface) {
    this._id = item._id;
    this.category_id = item.category_id;
    this.name = item.name;
    this.sellingPrice = item.sellingPrice;
    this.createdAt = item.createdAt;
    this.updatedAt = item.updatedAt;
  }
}
