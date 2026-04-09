import "dotenv/config";
import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { HTTP_STATUS } from "./config/http.config";
import { env } from "./config/env.config";

const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: [env.FRONTEND_ORIGIN],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

app.get("/health", (req: Request, res: Response) => {
  res.status(HTTP_STATUS.OK).json({
    message: "Server is health",
    status: "Ok",
  });
});

app.get("/", (req: Request, res: Response) => {
  res.status(HTTP_STATUS.OK).json({
    message: "Welcome to Printify API",
    status: "Ok",
  });
});

app.listen(env.PORT, async () => {
  console.log(`Server running on port ${env.PORT} in ${env.NODE_ENV} mode`);
});
