import { AggregateItemRepository } from "../model/repository/aggregate.repository.js";
import DatabaseConnection, { QueryInterface, RetrieveAllOptionsInterface } from "@src/database/connection.js";
import { fields } from "@src/database/mongodb/mongodb-querystring.js";
import { VerifyTokenUseCase } from "@src/modules/user/use-case/verify-token.use-case.js";

export class RetrieveAllItemUseCase {
  private db: DatabaseConnection;

  constructor(db: DatabaseConnection) {
    this.db = db;
  }

  public async handle(query: QueryInterface, options: RetrieveAllOptionsInterface) {
    try {
      /**
       * Request should come from authenticated user
       */
      const verifyTokenUserService = new VerifyTokenUseCase(this.db);
      await verifyTokenUserService.handle(options.authorizationHeader ?? "");

      const filter = query.filter;
      query.filter = {
        $or: [{ name: { $regex: filter.name ?? "", $options: "i" } }],
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const pipeline: any[] = [
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

      if (query && query.fields) {
        pipeline.push({ $project: fields(query.fields) });
      }

      if (query && query.sort) {
        pipeline.push({ $sort: { createdAt: -1 } });
      }

      if (query && query.filter) {
        pipeline.push({ $match: { ...query.filter } });
      }

      const response = await new AggregateItemRepository(this.db).handle(pipeline, query, options);

      return {
        data: response.data,
        pagination: response.pagination,
      };
    } catch (error) {
      throw error;
    }
  }
}
