import { objClean } from "@point-hub/express-utils";
import { CreateTransferItemRepository } from "../model/repository/create.repository.js";
import { TransferItemEntity } from "../model/transfer-item.entity.js";
import { validate } from "../validation/create.validation.js";
import DatabaseConnection, { CreateOptionsInterface, DocumentInterface } from "@src/database/connection.js";
import { InventoryEntity } from "@src/modules/inventory/model/inventory.js";
import { CreateInventoryRepository } from "@src/modules/inventory/model/repository/create.repository.js";
import { ItemEntity } from "@src/modules/item/model/item.entity.js";
import { CreateItemRepository } from "@src/modules/item/model/repository/create.repository.js";
import { VerifyTokenUseCase } from "@src/modules/user/use-case/verify-token.use-case.js";

export class CreateTransferItemUseCase {
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

      // save to database
      const transferItemEntity = objClean(
        new TransferItemEntity({
          date: document.date,
          warehouseOrigin_id: document.warehouseOrigin_id,
          warehouseDestination_id: document.warehouseDestination_id,
          item_id: document.item_id,
          size: document.size,
          totalQuantity: document.totalQuantity,
          createdAt: createdAt,
          createdBy_id: authUser._id,
        })
      );
      const response = await new CreateTransferItemRepository(this.db).handle(transferItemEntity, {
        session: options.session,
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      for (const el of document.size) {
        if (el.quantity) {
          // save to database
          const inventoryEntity = objClean(
            new InventoryEntity({
              warehouse_id: document.warehouseOrigin_id,
              reference: "transfer item",
              reference_id: response._id,
              item_id: document.item_id,
              size: el.label,
              quantity: el.quantity * -1,
              createdAt: createdAt,
            })
          );
          await new CreateInventoryRepository(this.db).handle(inventoryEntity, { session: options.session });

          // save to database
          const inventoryEntityDestination = objClean(
            new InventoryEntity({
              warehouse_id: document.warehouseDestination_id,
              reference: "transfer item",
              reference_id: response._id,
              item_id: document.item_id,
              size: el.label,
              quantity: el.quantity,
              createdAt: createdAt,
            })
          );
          await new CreateInventoryRepository(this.db).handle(inventoryEntityDestination, { session: options.session });
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
