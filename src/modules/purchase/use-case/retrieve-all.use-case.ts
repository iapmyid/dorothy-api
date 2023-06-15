import { AggregatePurchaseRepository } from "../model/repository/aggregate.repository.js";
import DatabaseConnection, { QueryInterface, RetrieveAllOptionsInterface } from "@src/database/connection.js";
import { fields, limit, page, skip, sort } from "@src/database/mongodb/mongodb-querystring.js";

export class RetrieveAllPurchaseUseCase {
  private db: DatabaseConnection;

  constructor(db: DatabaseConnection) {
    this.db = db;
  }

  public async handle(query: QueryInterface, options?: RetrieveAllOptionsInterface) {
    try {
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
            from: "suppliers",
            localField: "supplier_id",
            foreignField: "_id",
            pipeline: [{ $project: { name: 1 } }],
            as: "supplier",
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
            warehouse: {
              $arrayElemAt: ["$warehouse", 0],
            },
          },
        },
        {
          $set: {
            supplier: {
              $arrayElemAt: ["$supplier", 0],
            },
          },
        },
        {
          $set: {
            itemCategory: {
              $arrayElemAt: ["$itemCategory", 0],
            },
          },
        },
        { $unset: ["warehouse_id", "supplier_id", "itemCategory_id"] },
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

      const response = await new AggregatePurchaseRepository(this.db).handle(pipeline, query, options);

      return {
        data: response.data,
        pagination: response.pagination,
      };
    } catch (error) {
      throw error;
    }
  }
}