import { RetrieveCustomerRepository } from "../model/repository/retrieve.repository.js";
import DatabaseConnection, { RetrieveOptionsInterface } from "@src/database/connection.js";

export interface ResponseInterface {
  _id: string;
  name?: string;
  address?: string;
  phone?: string;
  email?: string;
  createdAt?: Date;
}

export class RetrieveCustomerUseCase {
  private db: DatabaseConnection;

  constructor(db: DatabaseConnection) {
    this.db = db;
  }

  public async handle(id: string, options?: RetrieveOptionsInterface): Promise<ResponseInterface> {
    try {
      const response = await new RetrieveCustomerRepository(this.db).handle(id, options);

      return {
        _id: response._id,
        name: response.name,
        address: response.address,
        phone: response.phone,
        email: response.email,
        createdAt: response.createdAt,
      };
    } catch (error) {
      throw error;
    }
  }
}
