import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
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
    console.log("Connected to MongoDB");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

mongoose.connection.on("connected", () => {
  console.log("MongoDB connected");
});

// Correct CORS configuration
const corsOptions = {
  origin: "https://hotel-booking-app-client.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  credentials: true,
  optionsSuccessStatus: 200, // For legacy browser support
};

// Apply the CORS middleware globally
app.use(cors(corsOptions));

// Manually set CORS headers (this is optional as cors middleware already handles this)
// app.use((req, res, next) => {
//   res.header(
//     "Access-Control-Allow-Origin",
//     "https://hotel-booking-app-client.vercel.app"
//   );
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Content-Type, Authorization, X-Requested-With"
//   );
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//   res.header("Access-Control-Allow-Credentials", "true");
//   next();
// });

app.use(cookieParser());
app.use(express.json());

// Routes
app.use("/api", wellComeRoute);
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

// Error handling middleware
app.use(errorHandler);

// Start the server
app.listen(process.env.PORT || 8800, () => {
  connect();
  console.log("Connected to backend.");
});
