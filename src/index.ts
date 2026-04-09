import "dotenv/config";
import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { HTTP_STATUS } from "./config/http.config";
import { env } from "./config/env.config";
import { errorHandler } from "./middleware/error-handler.middleware";
import { asyncHandler } from "./middleware/async-handler.middleware";
import { connectDB } from "./config/db.config";
import { toNodeHandler } from "better-auth/node";
import { getAuth } from "./lib/auth";

const app = express();

app.use(
  cors({
    origin: [env.FRONTEND_ORIGIN],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

app.all("/api/auth/*splat", (req, res) => {
  const auth = getAuth();
  return toNodeHandler(auth)(req, res);
});

app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.get(
  "/health",
  asyncHandler(async (req: Request, res: Response) => {
    res.status(HTTP_STATUS.OK).json({
      message: "Server is healthy",
      status: "Ok",
    });
  }),
);

app.use(errorHandler);

app.get("/", (req: Request, res: Response) => {
  res.status(HTTP_STATUS.OK).json({
    message: "Welcome to Printify API",
    status: "Ok",
  });
});

app.listen(env.PORT, async () => {
  await connectDB();
  console.log(`Server running on port ${env.PORT} in ${env.NODE_ENV} mode`);
});
