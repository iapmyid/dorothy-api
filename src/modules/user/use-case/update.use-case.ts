import { objClean } from "@point-hub/express-utils";
import { UpdateUserRepository } from "../model/repository/update.repository.js";
import { UserEntity } from "../model/user.entity.js";
import { validate } from "../validation/update.validation.js";
import DatabaseConnection, { UpdateOptionsInterface, DocumentInterface } from "@src/database/connection.js";

export class UpdateUserUseCase {
  private db: DatabaseConnection;

  constructor(db: DatabaseConnection) {
    this.db = db;
  }

  public async handle(id: string, document: DocumentInterface, options: UpdateOptionsInterface) {
    try {
      // validate request body
      validate(document);

      // update database
      const userEntity = new UserEntity({
        role: document.role,
        updatedAt: new Date(),
      });

      const userRepository = new UpdateUserRepository(this.db);
      await userRepository.handle(id, objClean(userEntity), options);

      return;
    } catch (error) {
      throw error;
    }
  }
}
