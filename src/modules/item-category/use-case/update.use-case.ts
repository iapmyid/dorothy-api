import { objClean } from "@point-hub/express-utils";
import { ItemCategoryEntity } from "../model/item-category.entity.js";
import { UpdateItemCategoryRepository } from "../model/repository/update.repository.js";
import { validate } from "../validation/update.validation.js";
import DatabaseConnection, { UpdateOptionsInterface, DocumentInterface } from "@src/database/connection.js";

export class UpdateItemCategoryUseCase {
  private db: DatabaseConnection;

  constructor(db: DatabaseConnection) {
    this.db = db;
  }

  public async handle(id: string, document: DocumentInterface, options: UpdateOptionsInterface) {
    try {
      // validate request body
      validate(document);

      // update database
      const itemCategoryEntity = new ItemCategoryEntity({
        name: document.name,
        updatedAt: new Date(),
      });

      const itemCategoryRepository = new UpdateItemCategoryRepository(this.db);
      await itemCategoryRepository.handle(id, objClean(itemCategoryEntity), options);

      return;
    } catch (error) {
      throw error;
    }
  }
}
