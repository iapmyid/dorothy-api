export interface ItemEntityInterface {
  _id?: string;
  category_id?: string;
  name?: string;
  sellingPrice?: number;
  createdAt?: Date;
  updatedAt?: Date;
  createdBy_id?: string;
  updatedBy_id?: string;
}

export class ItemEntity implements ItemEntityInterface {
  public _id?: string;
  public category_id?: string;
  public name?: string;
  public sellingPrice?: number;
  public createdAt?: Date;
  public updatedAt?: Date;
  public createdBy_id?: string;
  public updatedBy_id?: string;

  constructor(item: ItemEntityInterface) {
    this._id = item._id;
    this.category_id = item.category_id;
    this.name = item.name;
    this.sellingPrice = item.sellingPrice;
    this.createdAt = item.createdAt;
    this.updatedAt = item.updatedAt;
    this.createdBy_id = item.createdBy_id;
    this.updatedBy_id = item.updatedBy_id;
  }
}
