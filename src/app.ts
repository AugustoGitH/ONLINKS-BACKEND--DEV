import "./bootstrap";
import "./database";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import upload from "./config/upload";
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

app.get("/", (req, res) => {
  res.json({ welcome: "Back-End Exclusivo da equipe do OnLinks" });
});

export default app;
