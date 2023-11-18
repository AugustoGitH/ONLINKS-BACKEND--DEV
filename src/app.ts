import "./bootstrap";
import "./database";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import upload from "./config/upload";
import routes from "./routes";
import * as Sentry from "@sentry/node";
import { AppError } from "./helpers/errors/AppError";
const app = express();

// app.use(
//   cors({
//     credentials: true,
//     origin: process.env.FRONT_END_URL,
//   })
// );

app.use(cookieParser());
app.use(express.json());
app.use("/public", express.static(upload.directory));

app.use("/api", routes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  console.error(err);

  return res.status(500).json({ message: "Internal server error" });
});

export default app;
