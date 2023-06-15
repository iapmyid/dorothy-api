import { DeleteUserRepository } from "../model/repository/delete.repository.js";
import { VerifyTokenUseCase } from "./verify-token.use-case.js";
import DatabaseConnection, { DeleteOptionsInterface } from "@src/database/connection.js";

export class DeleteUserUseCase {
  private db: DatabaseConnection;

  constructor(db: DatabaseConnection) {
    this.db = db;
  }

  public async handle(id: string, options: DeleteOptionsInterface) {
    try {
      /**
       * Request should come from authenticated user
       */
      const verifyTokenUserService = new VerifyTokenUseCase(this.db);
      await verifyTokenUserService.handle(options.authorizationHeader ?? "");

      const response = await new DeleteUserRepository(this.db).handle(id, options);

      return {
        acknowledged: response.acknowledged,
        deletedCount: response.deletedCount,
      };
    } catch (error) {
      throw error;
    }
  }
}
