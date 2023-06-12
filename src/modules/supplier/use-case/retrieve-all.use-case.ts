import { RetrieveAllSupplierRepository } from "../model/repository/retrieve-all.repository.js";
import DatabaseConnection, { QueryInterface, RetrieveAllOptionsInterface } from "@src/database/connection.js";

export class RetrieveAllSupplierUseCase {
  private db: DatabaseConnection;

  constructor(db: DatabaseConnection) {
    this.db = db;
  }

  public async handle(query: QueryInterface, options?: RetrieveAllOptionsInterface) {
    try {
      const filter = query.filter;
      query.filter = {
        $or: [
          { name: { $regex: filter.name ?? "", $options: "i" } },
          { address: { $regex: filter.address ?? "", $options: "i" } },
          { phone: { $regex: filter.phone ?? "", $options: "i" } },
          { email: { $regex: filter.email ?? "", $options: "i" } },
        ],
      };
      const response = await new RetrieveAllSupplierRepository(this.db).handle(query, options);

      return {
        data: response.data,
        pagination: response.pagination,
      };
    } catch (error) {
      throw error;
    }
  }
}
