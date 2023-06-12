import { RetrieveItemRepository } from "../model/repository/retrieve.repository.js";
import DatabaseConnection, { RetrieveOptionsInterface } from "@src/database/connection.js";

interface ResponseInterface {
  _id: string;
  name?: string;
  sellingPrice?: number;
  createdAt?: Date;
}

export class RetrieveItemUseCase {
  private db: DatabaseConnection;

  constructor(db: DatabaseConnection) {
    this.db = db;
  }

  public async handle(id: string, options?: RetrieveOptionsInterface): Promise<ResponseInterface> {
    try {
      const response = await new RetrieveItemRepository(this.db).handle(id, options);

      return {
        _id: response._id,
        name: response.name,
        sellingPrice: response.sellingPrice,
        createdAt: response.createdAt,
      };
    } catch (error) {
      throw error;
    }
  }
}
