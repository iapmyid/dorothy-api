import { RetrieveItemRepository } from "../model/repository/retrieve.repository.js";
import DatabaseConnection, { RetrieveOptionsInterface } from "@src/database/connection.js";
import { VerifyTokenUseCase } from "@src/modules/user/use-case/verify-token.use-case.js";

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

  public async handle(id: string, options: RetrieveOptionsInterface): Promise<ResponseInterface> {
    try {
      /**
       * Request should come from authenticated user
       */
      const verifyTokenUserService = new VerifyTokenUseCase(this.db);
      await verifyTokenUserService.handle(options.authorizationHeader ?? "");

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
