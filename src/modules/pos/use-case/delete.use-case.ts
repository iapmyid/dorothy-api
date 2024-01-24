import { ApiError } from "@point-hub/express-error-handler";
import { objClean } from "@point-hub/express-utils";
import { RetrievePosRepository } from "../model/repository/retrieve.repository.js";
import { UpdatePosRepository } from "../model/repository/update.repository.js";
import DatabaseConnection, { DeleteOptionsInterface } from "@src/database/connection.js";
import { InventoryEntity } from "@src/modules/inventory/model/inventory.js";
import { CreateInventoryRepository } from "@src/modules/inventory/model/repository/create.repository.js";
import { VerifyTokenUseCase } from "@src/modules/user/use-case/verify-token.use-case.js";

export class DeletePosUseCase {
  private db: DatabaseConnection;

  constructor(db: DatabaseConnection) {
    this.db = db;
  }

  public async handle(id: string, options: DeleteOptionsInterface) {
    try {
      /**
       * Request should come from authenticated user
       */
      const verifyTokenUserService = new VerifyTokenUseCase(this.db);
      await verifyTokenUserService.handle(options.authorizationHeader ?? "");

      const response = await new UpdatePosRepository(this.db).handle(id, { void: true }, options);

      const item = await new RetrievePosRepository(this.db).handle(id);
      if (item.void) {
        throw new ApiError(400);
      }
      const createdAt = new Date();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (!item.items) {
        return;
      }
      for (const el of item.items) {
        if (el.quantity) {
          // save to database
          const inventoryEntity = objClean(
            new InventoryEntity({
              warehouse_id: item.warehouse_id,
              reference: "pos",
              reference_id: item._id,
              item_id: el._id,
              size: el.size,
              color: el.color,
              quantity: el.quantity,
              createdAt: createdAt,
            })
          );
          await new CreateInventoryRepository(this.db).handle(inventoryEntity, { session: options.session });
        }
      }

      return {
        acknowledged: response.acknowledged,
        matchedCount: response.matchedCount,
      };
    } catch (error) {
      throw error;
    }
  }
}
