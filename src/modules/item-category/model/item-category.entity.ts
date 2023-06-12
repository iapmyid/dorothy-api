export interface ItemCategoryEntityInterface {
  _id?: string;
  name?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class ItemCategoryEntity implements ItemCategoryEntityInterface {
  public _id?: string;
  public name?: string;
  public createdAt?: Date;
  public updatedAt?: Date;

  constructor(itemCategory: ItemCategoryEntityInterface) {
    this._id = itemCategory._id;
    this.name = itemCategory.name;
    this.createdAt = itemCategory.createdAt;
    this.updatedAt = itemCategory.updatedAt;
  }
}
