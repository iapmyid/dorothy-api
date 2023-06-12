import { objClean } from "@point-hub/express-utils";
import { UpdateWarehouseRepository } from "../model/repository/update.repository.js";
import { WarehouseEntity } from "../model/warehouse.entity.js";
import { validate } from "../validation/update.validation.js";
import DatabaseConnection, { UpdateOptionsInterface, DocumentInterface } from "@src/database/connection.js";

export class UpdateWarehouseUseCase {
  private db: DatabaseConnection;

  constructor(db: DatabaseConnection) {
    this.db = db;
  }

  public async handle(id: string, document: DocumentInterface, options: UpdateOptionsInterface) {
    try {
      // validate request body
      validate(document);

      // update database
      const warehouseEntity = new WarehouseEntity({
        name: document.name,
        updatedAt: new Date(),
      });

      const warehouseRepository = new UpdateWarehouseRepository(this.db);
      await warehouseRepository.handle(id, objClean(warehouseEntity), options);

      return;
    } catch (error) {
      throw error;
    }
  }
}
