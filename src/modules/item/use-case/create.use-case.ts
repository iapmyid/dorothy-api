import { objClean } from "@point-hub/express-utils";
import { ItemEntity } from "../model/item.entity.js";
import { CreateItemRepository } from "../model/repository/create.repository.js";
import { validate } from "../validation/create.validation.js";
import DatabaseConnection, { CreateOptionsInterface, DocumentInterface } from "@src/database/connection.js";

export class CreateItemUseCase {
  private db: DatabaseConnection;

  constructor(db: DatabaseConnection) {
    this.db = db;
  }

  public async handle(document: DocumentInterface, options: CreateOptionsInterface) {
    try {
      // validate request body
      validate(document);

      // save to database
      const itemEntity = objClean(
        new ItemEntity({
          name: document.name,
          sellingPrice: document.sellingPrice,
          createdAt: new Date(),
        })
      );

      const response = await new CreateItemRepository(this.db).handle(itemEntity, options);

      return {
        acknowledged: response.acknowledged,
        _id: response._id,
      };
    } catch (error) {
      throw error;
    }
  }
}
