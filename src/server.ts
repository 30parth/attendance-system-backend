import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import { connectDB } from "./db";
import authRoutes from "./routes/authRoutes";
import classRoutes from "./routes/classRoutes";
import studentRoutes from "./routes/studentRoutes";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const APP_URL = process.env.APP_URL || "http://localhost:5173";

// Middleware
app.use(cookieParser());
app.use(express.json());

// CORS Configuration
app.use(
  cors({
    origin: APP_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Accept",
      "X-Requested-With",
    ],
  })
);

// Routes
app.use("/api", authRoutes);
app.use("/api", classRoutes);
app.use("/api", studentRoutes);

// Health Check
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// Database Connection and Server Start
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
