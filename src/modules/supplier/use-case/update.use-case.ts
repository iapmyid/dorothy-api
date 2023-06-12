import { objClean } from "@point-hub/express-utils";
import { UpdateSupplierRepository } from "../model/repository/update.repository.js";
import { SupplierEntity } from "../model/supplier.entity.js";
import { validate } from "../validation/update.validation.js";
import DatabaseConnection, { UpdateOptionsInterface, DocumentInterface } from "@src/database/connection.js";

export class UpdateSupplierUseCase {
  private db: DatabaseConnection;

  constructor(db: DatabaseConnection) {
    this.db = db;
  }

  public async handle(id: string, document: DocumentInterface, options: UpdateOptionsInterface) {
    try {
      // validate request body
      validate(document);

      // update database
      const supplierEntity = new SupplierEntity({
        name: document.name,
        address: document.address,
        phone: document.phone,
        email: document.email,
        updatedAt: new Date(),
      });

      const supplierRepository = new UpdateSupplierRepository(this.db);
      await supplierRepository.handle(id, objClean(supplierEntity), options);

      return;
    } catch (error) {
      throw error;
    }
  }
}
