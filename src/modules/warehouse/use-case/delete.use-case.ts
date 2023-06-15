import { ApiError } from "@point-hub/express-error-handler";
import { DeleteWarehouseRepository } from "../model/repository/delete.repository.js";
import DatabaseConnection, { DeleteOptionsInterface, QueryInterface } from "@src/database/connection.js";
import { RetrieveAllPurchaseRepository } from "@src/modules/purchase/model/repository/retrieve-all.repository.js";

export class DeleteWarehouseUseCase {
  private db: DatabaseConnection;

  constructor(db: DatabaseConnection) {
    this.db = db;
  }

  public async handle(id: string, options: DeleteOptionsInterface) {
    try {
      const purchaseData = await new RetrieveAllPurchaseRepository(this.db).handle({
        fields: "",
        filter: {
          warehouse_id: id,
        },
        page: 1,
        pageSize: 1,
        sort: "",
      } as QueryInterface);

      if (purchaseData.data.length > 0) {
        throw new ApiError(400);
      }

      const response = await new DeleteWarehouseRepository(this.db).handle(id, options);

      return {
        acknowledged: response.acknowledged,
        deletedCount: response.deletedCount,
      };
    } catch (error) {
      throw error;
    }
  }
}
