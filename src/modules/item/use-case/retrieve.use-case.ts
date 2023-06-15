import { ObjectId } from "mongodb";
import { AggregateItemRepository } from "../model/repository/aggregate.repository.js";
import DatabaseConnection, { QueryInterface, RetrieveOptionsInterface } from "@src/database/connection.js";
import { VerifyTokenUseCase } from "@src/modules/user/use-case/verify-token.use-case.js";

interface ResponseInterface {
  _id: string;
  name?: string;
  sellingPrice?: number;
  itemCategory: {
    name: string;
  };
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

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const pipeline: any[] = [
        {
          $match: {
            _id: new ObjectId(id),
          },
        },
        {
          $lookup: {
            from: "itemCategories",
            localField: "itemCategory_id",
            foreignField: "_id",
            pipeline: [{ $project: { name: 1 } }],
            as: "itemCategory",
          },
        },
        {
          $set: {
            itemCategory: {
              $arrayElemAt: ["$itemCategory", 0],
            },
          },
        },
        { $unset: ["itemCategory_id"] },
      ];

      const response = await new AggregateItemRepository(this.db).handle(
        pipeline,
        {
          fields: "",
          filter: {},
          page: 1,
          pageSize: 1,
          sort: "",
        } as QueryInterface,
        options
      );

      return {
        _id: response.data[0]._id,
        name: response.data[0].name,
        sellingPrice: response.data[0].sellingPrice,
        itemCategory: response.data[0].itemCategory,
        createdAt: response.data[0].createdAt,
      };
    } catch (error) {
      throw error;
    }
  }
}
