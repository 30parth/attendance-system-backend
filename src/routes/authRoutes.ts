import { Router } from "express";
import { IUser, User } from "../models/User";
import jwt from "jsonwebtoken";
import { verifyToken } from "../middleware/authMiddleware";
import bcrypt from "bcrypt";
const authRoutes = Router();

authRoutes.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

    const user: IUser | null = await User.findOne({ username: username });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.error("JWT_SECRET is not defined in environment variables");
      return res
        .status(500)
        .json({ message: "Internal server configuration error" });
    }

    const token = jwt.sign(
      { id: user._id, name: user.name, role: user.role },
      secret,
      {
        expiresIn: "1h",
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600000, // 1 hour
    });

    return res
      .status(200)
      .json({ user: { name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

authRoutes.get("/check", verifyToken, async (req: any, res: any) => {
  try {
    const user = await User.findOne({ name: req.username });
    if (!user) {
      return res
        .status(401)
        .json({ authenticated: false, message: "Unauthorized user" });
    }
    return res.status(200).json({ authenticated: true, user: user });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

authRoutes.post("/logout", (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 0,
  });
  return res.status(200).json({ message: "Logout successful" });
});

export default authRoutes;
