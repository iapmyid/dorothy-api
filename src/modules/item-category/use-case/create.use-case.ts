import { objClean } from "@point-hub/express-utils";
import { ItemCategoryEntity } from "../model/item-category.entity.js";
import { CreateItemCategoryRepository } from "../model/repository/create.repository.js";
import { validate } from "../validation/create.validation.js";
import DatabaseConnection, { CreateOptionsInterface, DocumentInterface } from "@src/database/connection.js";

export class CreateItemCategoryUseCase {
  private db: DatabaseConnection;

  constructor(db: DatabaseConnection) {
    this.db = db;
  }

  public async handle(document: DocumentInterface, options: CreateOptionsInterface) {
    try {
      // validate request body
      validate(document);

      // save to database
      const itemCategoryEntity = objClean(
        new ItemCategoryEntity({
          name: document.name,
          createdAt: new Date(),
        })
      );

      const response = await new CreateItemCategoryRepository(this.db).handle(itemCategoryEntity, options);

      return {
        acknowledged: response.acknowledged,
        _id: response._id,
      };
    } catch (error) {
      throw error;
    }
  }
}
