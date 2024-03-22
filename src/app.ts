import "./bootstrap";
import "./database";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import upload from "./config/upload";
import routes from "./routes";
import * as Sentry from "@sentry/node";
import { AppError } from "./helpers/errors/AppError";
import bodyParser from "body-parser";
import fs from "fs";
import path from "path";
import axios from "axios";
import { api } from "./config/api/axios";
import createShortenerLinkService from "./services/shortenerLinkServices/createShortenerLinkService";
import getAllShortenerLinksByUserId from "./services/shortenerLinkServices/getAllShortenerLinksByUserId";
import deleteShortenerLinkService from "./services/shortenerLinkServices/deleteShortenerLinkService";
const app = express();

app.use(
  cors({
    credentials: true,
    origin: process.env.FRONT_END_URL,
    // allowedHeaders: ["content-type"],
    // methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD", "OPTIONS"],
  })
);

app.use(cookieParser());
app.use(bodyParser.json({ limit: "100000mb" }));
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
