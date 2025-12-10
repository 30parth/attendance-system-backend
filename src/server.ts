import express from "express";
import { connectDB } from "./db";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import cors from "cors";
import classRoutes from "./routes/classRoutes";
import studentRoutes from "./routes/studentRooutes";
import cookieParser from "cookie-parser";
dotenv.config();

const PORT = process.env.PORT || 5000;
const APP_URL = process.env.URL || "http://localhost:5173";

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: APP_URL,
    credentials: true,
  })
);

app.use("/api", authRoutes);
app.use("/api", classRoutes);
app.use("/api", studentRoutes);

app.get("/health", (req, res) => res.json({ status: "ok" }));

async function start() {
  await connectDB();
  app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
}

start().catch((err) => {
  console.error("Failed to start server", err);
  process.exit(1);
});
