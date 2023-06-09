import { objClean } from "@point-hub/express-utils";
import { format } from "date-fns";
import { PurchaseEntity } from "../model/purchase.entity.js";
import { CreatePurchaseRepository } from "../model/repository/create.repository.js";
import { validate } from "../validation/create.validation.js";
import DatabaseConnection, { CreateOptionsInterface, DocumentInterface } from "@src/database/connection.js";
import { InventoryEntity } from "@src/modules/inventory/model/inventory.js";
import { CreateInventoryRepository } from "@src/modules/inventory/model/repository/create.repository.js";
import { ItemEntity } from "@src/modules/item/model/item.entity.js";
import { CreateItemRepository } from "@src/modules/item/model/repository/create.repository.js";
import { VerifyTokenUseCase } from "@src/modules/user/use-case/verify-token.use-case.js";

export class CreatePurchaseUseCase {
  private db: DatabaseConnection;

  constructor(db: DatabaseConnection) {
    this.db = db;
  }

  public async handle(document: DocumentInterface, options: CreateOptionsInterface) {
    try {
      /**
       * Request should come from authenticated user
       */
      const verifyTokenUserService = new VerifyTokenUseCase(this.db);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const authUser = (await verifyTokenUserService.handle(options.authorizationHeader ?? "")) as any;

      // validate request body
      validate(document);

      const createdAt = new Date();
      const barcode = format(new Date(), "ddyyIIhhmmss");

      // save to database
      const itemEntity = objClean(
        new ItemEntity({
          itemCategory_id: document.itemCategory_id,
          barcode: barcode,
          name: document.name,
          sellingPrice: document.sellingPrice,
          createdAt: createdAt,
          createdBy_id: authUser._id,
        })
      );
      const responseItem = await new CreateItemRepository(this.db).handle(itemEntity, { session: options.session });

      // save to database
      const purchaseEntity = objClean(
        new PurchaseEntity({
          date: document.date,
          warehouse_id: document.warehouse_id,
          supplier_id: document.supplier_id,
          itemCategory_id: document.itemCategory_id,
          item_id: responseItem._id,
          barcode: barcode,
          name: document.name,
          size: document.size,
          totalQuantity: document.totalQuantity,
          price: document.price,
          totalPrice: document.totalPrice,
          profitMargin: document.profitMargin,
          totalProfit: document.totalProfit,
          totalSelling: document.totalSelling,
          sellingPrice: document.sellingPrice,
          createdAt: createdAt,
          createdBy_id: authUser._id,
        })
      );
      const response = await new CreatePurchaseRepository(this.db).handle(purchaseEntity, { session: options.session });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      for (const el of document.size) {
        if (el.quantity) {
          // save to database
          const inventoryEntity = objClean(
            new InventoryEntity({
              warehouse_id: document.warehouse_id,
              reference: "purchase",
              reference_id: response._id,
              item_id: responseItem._id,
              size: el.label,
              quantity: el.quantity,
              createdAt: createdAt,
            })
          );
          await new CreateInventoryRepository(this.db).handle(inventoryEntity, { session: options.session });
        }
      }
      return {
        acknowledged: response.acknowledged,
        _id: response._id,
      };
    } catch (error) {
      throw error;
    }
  }
}
