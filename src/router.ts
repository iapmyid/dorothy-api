import express, { Express } from "express";
import supplierRouter from "./modules/supplier/router.js";
import userRouter from "./modules/user/router.js";
import warehouseRouter from "./modules/warehouse/router.js";

export default function () {
  const app: Express = express();

  /**
   * Register all available modules
   * <modules>/router.ts
   */
  app.use("/v1/users", userRouter);
  app.use("/v1/warehouses", warehouseRouter);
  app.use("/v1/suppliers", supplierRouter);
  return app;
}
