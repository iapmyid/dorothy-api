export interface sizeTypes {
  label?: string;
  quantity?: number;
}

export interface PurchaseEntityInterface {
  _id?: string;
  date?: string;
  warehouse_id?: string;
  supplier_id?: string;
  itemCategory_id?: string;
  code?: string;
  name?: string;
  size?: sizeTypes[];
  totalQuantity?: number;
  price?: number;
  totalPrice?: number;
  profitMargin?: number;
  totalProfit?: number;
  totalSelling?: number;
  sellingPrice?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export class PurchaseEntity implements PurchaseEntityInterface {
  public _id?: string;
  public date?: string;
  public warehouse_id?: string;
  public supplier_id?: string;
  public itemCategory_id?: string;
  public code?: string;
  public name?: string;
  public size?: sizeTypes[];
  public totalQuantity?: number;
  public price?: number;
  public totalPrice?: number;
  public profitMargin?: number;
  public totalProfit?: number;
  public totalSelling?: number;
  public sellingPrice?: number;
  public createdAt?: Date;
  public updatedAt?: Date;

  constructor(purchase: PurchaseEntityInterface) {
    this._id = purchase._id;
    this.date = purchase.date;
    this.warehouse_id = purchase.warehouse_id;
    this.supplier_id = purchase.supplier_id;
    this.itemCategory_id = purchase.itemCategory_id;
    this.code = purchase.code;
    this.name = purchase.name;
    this.size = purchase.size;
    this.totalQuantity = purchase.totalQuantity;
    this.price = purchase.price;
    this.totalPrice = purchase.totalPrice;
    this.profitMargin = purchase.profitMargin;
    this.totalProfit = purchase.totalProfit;
    this.totalSelling = purchase.totalSelling;
    this.sellingPrice = purchase.sellingPrice;
    this.createdAt = purchase.createdAt;
    this.updatedAt = purchase.updatedAt;
  }
}
