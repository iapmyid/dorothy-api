import { AggregatePosRepository } from "../model/repository/aggregate.repository.js";
import DatabaseConnection, { QueryInterface, RetrieveAllOptionsInterface } from "@src/database/connection.js";
import { fields } from "@src/database/mongodb/mongodb-querystring.js";
import { VerifyTokenUseCase } from "@src/modules/user/use-case/verify-token.use-case.js";

export class RetrieveAllPosUseCase {
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
            from: "warehouses",
            localField: "warehouse_id",
            foreignField: "_id",
            pipeline: [{ $project: { name: 1 } }],
            as: "warehouse",
          },
        },
        {
          $lookup: {
            from: "customers",
            localField: "customer_id",
            foreignField: "_id",
            pipeline: [{ $project: { name: 1 } }],
            as: "customer",
          },
        },
        {
          $set: {
            warehouse: {
              $arrayElemAt: ["$warehouse", 0],
            },
            customer: {
              $arrayElemAt: ["$customer", 0],
            },
          },
        },
        { $unset: ["warehouse_id", "customer_id"] },
      ];

      if (query && query.fields) {
        pipeline.push({ $project: fields(query.fields) });
      }

      if (query && query.sort) {
        pipeline.push({ $sort: { createdAt: -1 } });
      }

      if (query && query.filter) {
        // pipeline.push({ $match: { ...query.filter } });
      }

      const response = await new AggregatePosRepository(this.db).handle(pipeline, query, options);
      console.log(response);
      return {
        data: response.data,
        pagination: response.pagination,
      };
    } catch (error) {
      throw error;
    }
  }
}
