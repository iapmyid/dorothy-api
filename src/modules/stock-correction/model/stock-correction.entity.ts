export interface sizeTypes {
  label?: string;
  quantity?: number;
}

export interface StockCorrectionEntityInterface {
  _id?: string;
  date?: string;
  warehouse_id?: string;
  item_id?: string;
  size?: sizeTypes[];
  totalQuantity?: number;
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
  createdBy_id?: string;
  updatedBy_id?: string;
}

export class StockCorrectionEntity implements StockCorrectionEntityInterface {
  public _id?: string;
  public date?: string;
  public warehouse_id?: string;
  public item_id?: string;
  public size?: sizeTypes[];
  public totalQuantity?: number;
  public notes?: string;
  public createdAt?: Date;
  public updatedAt?: Date;
  public createdBy_id?: string;
  public updatedBy_id?: string;

  constructor(stockCorrection: StockCorrectionEntityInterface) {
    this._id = stockCorrection._id;
    this.date = stockCorrection.date;
    this.warehouse_id = stockCorrection.warehouse_id;
    this.item_id = stockCorrection.item_id;
    this.size = stockCorrection.size;
    this.totalQuantity = stockCorrection.totalQuantity;
    this.notes = stockCorrection.notes;
    this.createdAt = stockCorrection.createdAt;
    this.updatedAt = stockCorrection.updatedAt;
    this.createdBy_id = stockCorrection.createdBy_id;
    this.updatedBy_id = stockCorrection.updatedBy_id;
  }
}
