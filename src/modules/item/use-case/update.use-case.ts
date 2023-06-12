import { objClean } from "@point-hub/express-utils";
import { ItemEntity } from "../model/item.entity.js";
import { UpdateItemRepository } from "../model/repository/update.repository.js";
import { validate } from "../validation/update.validation.js";
import DatabaseConnection, { UpdateOptionsInterface, DocumentInterface } from "@src/database/connection.js";

export class UpdateItemUseCase {
  private db: DatabaseConnection;

  constructor(db: DatabaseConnection) {
    this.db = db;
  }

  public async handle(id: string, document: DocumentInterface, options: UpdateOptionsInterface) {
    try {
      // validate request body
      validate(document);

      // update database
      const itemEntity = new ItemEntity({
        name: document.name,
        sellingPrice: document.sellingPrice,
        updatedAt: new Date(),
      });

      const itemRepository = new UpdateItemRepository(this.db);
      await itemRepository.handle(id, objClean(itemEntity), options);

      return;
    } catch (error) {
      throw error;
    }
  }
}
