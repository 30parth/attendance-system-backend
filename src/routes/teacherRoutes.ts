import { Router } from "express";
import { Teacher } from "../models/Teacher";
import { User } from "../models/User";
import bcrypt from "bcrypt";

const teacherRoute = Router();

teacherRoute.get("/teacher", async (req, res) => {
  try {
    const allTeachers = await Teacher.find();

    res.status(200).json({ teachers: allTeachers });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

teacherRoute.post("/teacher/add", async (req, res) => {
  try {
    const {
      staffId,
      role,
      name,
      fatherName,
      email,
      gender,
      dateOfBirth,
      dateOfJoining,
      phone,
      address,
      qualification,
      workExperience,
      note,
      panNumber,
    } = req.body;

    const userRole = role === "teacher" ? "teacher" : "admin";

    const newUser = new User({
      name: name,
      email: email,
      username: email,
      password: await bcrypt.hash(phone, 10),
      role: userRole,
    });

    await newUser.save();

    const newTeacher = new Teacher({
      staffId,
      role,
      name,
      fatherName,
      email,
      gender,
      dateOfBirth,
      dateOfJoining,
      phone,
      address,
      qualification,
      workExperience,
      note,
      panNumber,
    });
    await newTeacher.save();
    res.status(200).json({ teacher: newTeacher });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

teacherRoute.put("/teacher/update/:id", async (req, res) => {
  try {
    const {
      staffId,
      role,
      name,
      fatherName,
      email,
      gender,
      dateOfBirth,
      dateOfJoining,
      phone,
      address,
      qualification,
      workExperience,
      note,
      panNumber,
    } = req.body;
    const teacher = await Teacher.findByIdAndUpdate(req.params.id, {
      staffId,
      role,
      name,
      fatherName,
      email,
      gender,
      dateOfBirth,
      dateOfJoining,
      phone,
      address,
      qualification,
      workExperience,
      note,
      panNumber,
    });
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    res.status(200).json({ teacher });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

teacherRoute.delete("/teacher/delete/:id", async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndDelete(req.params.id);
    const user = await User.findOneAndDelete({ username: teacher?.email });
    if (!teacher || !user) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    res.status(200).json({ message: "Teacher deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

export default teacherRoute;
