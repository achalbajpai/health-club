import { NextFunction, Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";
import { prisma } from "../index.js";
import { GeneralError } from "../utils/generalError.js";
import { User } from "@prisma/client";
interface JwtPayLoad {
  username: string;
}
export interface CustomRequest extends Request {
  user?: User;
}
export const verifyToken = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.token;
    const decoded = jwt.verify(
      token,
      process.env.PRIVATE_KEY as Secret
    ) as JwtPayLoad;
    const user = await prisma.user.findUnique({
      where: {
        username: decoded.username,
      },
    });
    if (!user) {
      throw new GeneralError(401, "Not Authorized");
    }
    req.user = user;
    next();
  } catch (error) {
    if (error instanceof GeneralError) {
      res.status(error.status).send({ message: error.message });
    } else {
      res.status(500).send({ message: "Token expired" });
    }
  }
};
