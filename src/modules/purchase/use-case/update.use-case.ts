import { objClean } from "@point-hub/express-utils";
import { PurchaseEntity } from "../model/purchase.entity.js";
import { UpdatePurchaseRepository } from "../model/repository/update.repository.js";
import { validate } from "../validation/update.validation.js";
import DatabaseConnection, { UpdateOptionsInterface, DocumentInterface } from "@src/database/connection.js";

export class UpdatePurchaseUseCase {
  private db: DatabaseConnection;

  constructor(db: DatabaseConnection) {
    this.db = db;
  }

  public async handle(id: string, document: DocumentInterface, options: UpdateOptionsInterface) {
    try {
      // validate request body
      validate(document);

      // update database
      const purchaseEntity = new PurchaseEntity({
        date: document.date,
        warehouse_id: document.warehouse_id,
        supplier_id: document.supplier_id,
        itemCategory_id: document.itemCategory_id,
        code: document.code,
        name: document.name,
        size: document.size,
        totalQuantity: parseFloat(document.totalQuantity),
        price: document.price,
        totalPrice: document.totalPrice,
        profitMargin: document.profitMargin,
        totalProfit: document.totalProfit,
        totalSelling: document.totalSelling,
        sellingPrice: document.sellingPrice,
        updatedAt: new Date(),
      });

      const purchaseRepository = new UpdatePurchaseRepository(this.db);
      await purchaseRepository.handle(id, objClean(purchaseEntity), options);

      return;
    } catch (error) {
      throw error;
    }
  }
}
