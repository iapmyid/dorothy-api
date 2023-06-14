import { ObjectId } from "mongodb";
import { sizeTypes } from "../model/purchase.entity.js";
import { AggregatePurchaseRepository } from "../model/repository/aggregate.repository.js";
import DatabaseConnection, { QueryInterface, RetrieveOptionsInterface } from "@src/database/connection.js";

export interface ResponseInterface {
  _id: string;
  date?: string;
  warehouse?: { name?: string };
  supplier?: { name?: string };
  itemCategory?: { name?: string };
  code?: string;
  name?: string;
  size?: sizeTypes[];
  totalQuantity?: number;
  price?: number;
  totalPrice?: number;
  profitMargin?: number;
  totalProfit?: number;
  totalSelling?: number;
  sellingPrice?: number;
  createdAt?: Date;
}

export class RetrievePurchaseUseCase {
  private db: DatabaseConnection;

  constructor(db: DatabaseConnection) {
    this.db = db;
  }

  public async handle(id: string, options?: RetrieveOptionsInterface): Promise<ResponseInterface> {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const pipeline: any[] = [
        {
          $match: {
            _id: new ObjectId(id),
          },
        },
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

      const response = await new AggregatePurchaseRepository(this.db).handle(
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
        date: response.data[0].date,
        warehouse: response.data[0].warehouse,
        supplier: response.data[0].supplier,
        itemCategory: response.data[0].itemCategory,
        code: response.data[0].code,
        name: response.data[0].name,
        size: response.data[0].size,
        totalQuantity: response.data[0].totalQuantity,
        price: response.data[0].price,
        totalPrice: response.data[0].totalPrice,
        profitMargin: response.data[0].profitMargin,
        totalProfit: response.data[0].totalProfit,
        totalSelling: response.data[0].totalSelling,
        sellingPrice: response.data[0].sellingPrice,
        createdAt: response.data[0].createdAt,
      };
    } catch (error) {
      throw error;
    }
  }
}
