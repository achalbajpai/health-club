import express, { Express, Request, Response } from "express";
import { config } from "dotenv";
config();
import cors, { CorsOptions } from "cors";
import { PrismaClient, User } from "@prisma/client";
import { authRouter } from "./routers/authRouters.js";
import { errorHandler } from "./utils/errorHandler.js";
import cookieParser from "cookie-parser";
import { CustomRequest, verifyToken } from "./middlewares/verifyToken.js";
import helmet from "helmet";
import morgan from "morgan";
import { postRouter } from "./routers/postRouters.js";
export const prisma = new PrismaClient();

const PORT = process.env.PORT || 5000;

const app: Express = express();

const whitelist = ["http://localhost:3000", "http://localhost:8000"];
const corsOptions: CorsOptions = {
  credentials: true,
  origin: function (origin, callback) {
    if (!origin) {
      return callback(null, true);
    }
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by cors"));
    }
  },
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(helmet());
app.use(morgan("common"));
app.use(cookieParser());
app.use("/auth", authRouter);
app.use("/post", postRouter);
app.use(errorHandler);

app.get("/", verifyToken, (req: CustomRequest, res: Response) => {
  if (req.user) {
    const { document, password, ...userDetails } = req.user;
    res.status(200).send({ userDetails });
  } else {
    res.send({});
  }
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}🚀`);
});
