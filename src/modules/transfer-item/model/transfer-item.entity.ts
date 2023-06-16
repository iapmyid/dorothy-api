export interface sizeTypes {
  label?: string;
  quantity?: number;
}

export interface TransferItemEntityInterface {
  _id?: string;
  date?: string;
  warehouseOrigin_id?: string;
  warehouseDestination_id?: string;
  item_id?: string;
  size?: sizeTypes[];
  totalQuantity?: number;
  createdAt?: Date;
  updatedAt?: Date;
  createdBy_id?: string;
  updatedBy_id?: string;
}

export class TransferItemEntity implements TransferItemEntityInterface {
  public _id?: string;
  public date?: string;
  public warehouseOrigin_id?: string;
  public warehouseDestination_id?: string;
  public item_id?: string;
  public size?: sizeTypes[];
  public totalQuantity?: number;
  public createdAt?: Date;
  public updatedAt?: Date;
  public createdBy_id?: string;
  public updatedBy_id?: string;

  constructor(transferItem: TransferItemEntityInterface) {
    this._id = transferItem._id;
    this.date = transferItem.date;
    this.warehouseOrigin_id = transferItem.warehouseOrigin_id;
    this.warehouseDestination_id = transferItem.warehouseDestination_id;
    this.item_id = transferItem.item_id;
    this.size = transferItem.size;
    this.totalQuantity = transferItem.totalQuantity;
    this.createdAt = transferItem.createdAt;
    this.updatedAt = transferItem.updatedAt;
    this.createdBy_id = transferItem.createdBy_id;
    this.updatedBy_id = transferItem.updatedBy_id;
  }
}
