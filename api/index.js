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

const corsOptions = {
  origin: [
    "https://hotel-booking-app-client-lf3vjiqie-sohaib-abdullahs-projects.vercel.app",
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  // preflightContinue: false, // access-control-allow-origin: *
  credentials: true, // access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
// app.use((_req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'Content-Type');
//   res.header('Access-Control-Allow-Headers', 'X-Requested-With');
//   res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
//   next();
// });

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
