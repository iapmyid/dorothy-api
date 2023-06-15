export interface ItemEntityInterface {
  _id?: string;
  itemCategory_id?: string;
  name?: string;
  sellingPrice?: number;
  createdAt?: Date;
  updatedAt?: Date;
  createdBy_id?: string;
  updatedBy_id?: string;
}

export class ItemEntity implements ItemEntityInterface {
  public _id?: string;
  public itemCategory_id?: string;
  public name?: string;
  public sellingPrice?: number;
  public createdAt?: Date;
  public updatedAt?: Date;
  public createdBy_id?: string;
  public updatedBy_id?: string;

  constructor(item: ItemEntityInterface) {
    this._id = item._id;
    this.itemCategory_id = item.itemCategory_id;
    this.name = item.name;
    this.sellingPrice = item.sellingPrice;
    this.createdAt = item.createdAt;
    this.updatedAt = item.updatedAt;
    this.createdBy_id = item.createdBy_id;
    this.updatedBy_id = item.updatedBy_id;
  }
}
