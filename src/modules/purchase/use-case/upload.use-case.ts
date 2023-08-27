// Import required AWS SDK clients and commands for Node.js.
import { PutObjectCommand, CreateBucketCommand } from "@aws-sdk/client-s3";
import { objClean } from "@point-hub/express-utils";
import { format } from "date-fns";
import { PurchaseEntity } from "../model/purchase.entity.js";
import { CreatePurchaseRepository } from "../model/repository/create.repository.js";
import { UpdatePurchaseRepository } from "../model/repository/update.repository.js";
import { validate } from "../validation/create.validation.js";
import DatabaseConnection, { CreateOptionsInterface, DocumentInterface } from "@src/database/connection.js";
import { InventoryEntity } from "@src/modules/inventory/model/inventory.js";
import { CreateInventoryRepository } from "@src/modules/inventory/model/repository/create.repository.js";
import { ItemEntity } from "@src/modules/item/model/item.entity.js";
import { CreateItemRepository } from "@src/modules/item/model/repository/create.repository.js";
import { VerifyTokenUseCase } from "@src/modules/user/use-case/verify-token.use-case.js";
import { s3Client } from "@src/utils/s3.js";

export class UploadPurchaseUseCase {
  private db: DatabaseConnection;

  constructor(db: DatabaseConnection) {
    this.db = db;
  }

  public async handle(document: DocumentInterface, files: any[], options: CreateOptionsInterface) {
    try {
      /**
       * Request should come from authenticated user
       */
      // const verifyTokenUserService = new VerifyTokenUseCase(this.db);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      // const authUser = (await verifyTokenUserService.handle(options.authorizationHeader ?? "")) as any;

      // validate request body
      // validate(document);

      // const wasabiEndpoint = new AWS.Endpoint("s3.wasabisys.com");

      // const accessKeyId = process.env.AWS_ACCESS_KEY;
      // const secretAccessKey = process.env.AWS_SECRET_KEY;

      // Set the parameters
      const params = {
        Bucket: "dorothy-web",
        Key: `${document.name}-${document.color}.png`,
        Body: files[0].buffer,
      };

      const result = await s3Client.send(new PutObjectCommand(params));

      // update database
      const purchaseEntity = new PurchaseEntity({
        photoUrl: `https://f005.backblazeb2.com/file/dorothy-web/${params.Key}`,
      });

      const purchaseRepo = new UpdatePurchaseRepository(this.db);
      await purchaseRepo.handle(document._id, objClean(purchaseEntity), options);
      return result;
    } catch (error) {
      throw error;
    }
  }
}
