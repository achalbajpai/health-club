import { ZodError } from "zod";
import { GeneralError } from "./generalError.js";
import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: GeneralError | ZodError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof GeneralError) {
    res.status(err.status).send({ message: err.message });
  } else if (err instanceof ZodError) {
    res.status(400).send({ message: err.issues });
  } else {
    console.log(err);
    res.status(500).send({ message: "Server Error" });
  }
};
