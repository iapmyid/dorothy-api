import { ApiError } from "@point-hub/express-error-handler";
import Validatorjs from "validatorjs";
import { DocumentInterface } from "@src/database/connection.js";

// https://github.com/mikeerickson/validatorjs
export const validate = (document: DocumentInterface) => {
  try {
    const validation = new Validatorjs(document, {
      warehouse_id: "required|string",
      item_id: "required|string",
      "size.*.label": "required|string",
      "size.*.quantity": "required|number|min:0",
      totalQuantity: "required|number|min:0",
    });

    if (validation.fails()) {
      throw new ApiError(422, validation.errors.errors);
    }
  } catch (error) {
    throw error;
  }
};
