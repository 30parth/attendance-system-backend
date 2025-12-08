import express from "express";
import { connectDB } from "./db";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import cors from "cors";
import classRoutes from "./routes/classRoutes";
import cookieParser from "cookie-parser";
dotenv.config();

console.log(
  "Environment check - JWT_SECRET is:",
  process.env.JWT_SECRET ? "DEFINED" : "UNDEFINED"
);

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

app.get("/health", (req, res) => res.json({ status: "ok" }));

async function start() {
  await connectDB();
  app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
}

start().catch((err) => {
  console.error("Failed to start server", err);
  process.exit(1);
});
