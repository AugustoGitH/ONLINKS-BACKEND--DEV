import mongoose from "mongoose";

const MONGO_URL =
  process.env.NODE_ENV === "development"
    ? process.env.MONGO_URL_DEV
    : process.env.MONGO_URL_PROD;
console.log(MONGO_URL);
mongoose
  .connect(MONGO_URL as string)
  .then(() => {
    console.log(`Database connected and ready for ${process.env.NODE_ENV}.`);
  })
  .catch((error) => console.log(error));
