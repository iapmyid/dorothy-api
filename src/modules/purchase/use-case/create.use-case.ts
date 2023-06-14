import { objClean } from "@point-hub/express-utils";
import { PurchaseEntity } from "../model/purchase.entity.js";
import { CreatePurchaseRepository } from "../model/repository/create.repository.js";
import { validate } from "../validation/create.validation.js";
import DatabaseConnection, { CreateOptionsInterface, DocumentInterface } from "@src/database/connection.js";

export class CreatePurchaseUseCase {
  private db: DatabaseConnection;

  constructor(db: DatabaseConnection) {
    this.db = db;
  }

  public async handle(document: DocumentInterface, options: CreateOptionsInterface) {
    try {
      // validate request body
      validate(document);

      // save to database
      const purchaseEntity = objClean(
        new PurchaseEntity({
          date: document.date,
          warehouse_id: document.warehouse_id,
          supplier_id: document.supplier_id,
          itemCategory_id: document.itemCategory_id,
          code: document.code,
          name: document.name,
          size: document.size,
          totalQuantity: document.totalQuantity,
          price: document.price,
          totalPrice: document.totalPrice,
          profitMargin: document.profitMargin,
          totalProfit: document.totalProfit,
          totalSelling: document.totalSelling,
          sellingPrice: document.sellingPrice,
          createdAt: new Date(),
        })
      );
      console.log(purchaseEntity);
      const response = await new CreatePurchaseRepository(this.db).handle(purchaseEntity, options);

      return {
        acknowledged: response.acknowledged,
        _id: response._id,
      };
    } catch (error) {
      throw error;
    }
  }
}
