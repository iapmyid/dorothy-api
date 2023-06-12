import { RetrieveUserRepository } from "../model/repository/retrieve.repository.js";
import { UserStatusTypes } from "../model/user.entity.js";
import DatabaseConnection, { RetrieveOptionsInterface } from "@src/database/connection.js";

interface ResponseInterface {
  _id: string;
  name?: string;
  username?: string;
  role?: string;
  status?: UserStatusTypes;
  createdAt?: Date;
}

export class RetrieveUserUseCase {
  private db: DatabaseConnection;

  constructor(db: DatabaseConnection) {
    this.db = db;
  }

  public async handle(id: string, options?: RetrieveOptionsInterface): Promise<ResponseInterface> {
    try {
      const response = await new RetrieveUserRepository(this.db).handle(id, options);

      return {
        _id: response._id,
        name: response.name,
        username: response.username,
        role: response.role,
        status: response.status,
        createdAt: response.createdAt,
      };
    } catch (error) {
      throw error;
    }
  }
}
