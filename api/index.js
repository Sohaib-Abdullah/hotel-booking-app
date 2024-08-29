import express from "express";
import dotenv from "dotenv";
import mongoose, { mongo } from "mongoose";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import wellComeRoute from "./routes/welcome.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import errorHandler from "./middlewares/error-handler.js";
import { WellComeUser } from "./controller/wellcome.js";

const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected mongoDB");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected");
});

mongoose.connection.on("connected", () => {
  console.log("mongoDB connected");
});

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/api", wellComeRoute);
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

app.use(errorHandler);

app.listen(process.env.PORT || 8800, () => {
  connect();
  console.log("connected to backend.");
});
