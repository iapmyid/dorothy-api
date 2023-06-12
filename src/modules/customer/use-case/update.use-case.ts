import { objClean } from "@point-hub/express-utils";
import { CustomerEntity } from "../model/customer.entity.js";
import { UpdateCustomerRepository } from "../model/repository/update.repository.js";
import { validate } from "../validation/update.validation.js";
import DatabaseConnection, { UpdateOptionsInterface, DocumentInterface } from "@src/database/connection.js";

export class UpdateCustomerUseCase {
  private db: DatabaseConnection;

  constructor(db: DatabaseConnection) {
    this.db = db;
  }

  public async handle(id: string, document: DocumentInterface, options: UpdateOptionsInterface) {
    try {
      // validate request body
      validate(document);

      // update database
      const customerEntity = new CustomerEntity({
        name: document.name,
        address: document.address,
        phone: document.phone,
        email: document.email,
        updatedAt: new Date(),
      });

      const customerRepository = new UpdateCustomerRepository(this.db);
      await customerRepository.handle(id, objClean(customerEntity), options);

      return;
    } catch (error) {
      throw error;
    }
  }
}
