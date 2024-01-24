import { NextFunction, Request, Response } from "express";
import { CreatePosUseCase } from "../use-case/create.use-case.js";
import { DeletePosUseCase } from "../use-case/delete.use-case.js";
import { db } from "@src/database/database.js";

interface ResponseInterface {
  _id: string;
}

export const deleteController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const session = db.startSession();

    db.startTransaction();

    const deletePosUseCase = new DeletePosUseCase(db);
    await deletePosUseCase.handle(req.params.id, {
      session,
      authorizationHeader: req.headers.authorization ?? "",
    });

    await db.commitTransaction();

    res.status(204).json();
  } catch (error) {
    await db.abortTransaction();
    next(error);
  } finally {
    await db.endSession();
  }
};
