import { RetrieveAllItemCategoryRepository } from "../model/repository/retrieve-all.repository.js";
import DatabaseConnection, { QueryInterface, RetrieveAllOptionsInterface } from "@src/database/connection.js";

export class RetrieveAllItemCategoryUseCase {
  private db: DatabaseConnection;

  constructor(db: DatabaseConnection) {
    this.db = db;
  }

  public async handle(query: QueryInterface, options?: RetrieveAllOptionsInterface) {
    try {
      const filter = query.filter;
      query.filter = {
        $or: [{ name: { $regex: filter.name ?? "", $options: "i" } }],
      };
      const response = await new RetrieveAllItemCategoryRepository(this.db).handle(query, options);

      return {
        data: response.data,
        pagination: response.pagination,
      };
    } catch (error) {
      throw error;
    }
  }
}
