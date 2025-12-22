import { Router } from "express";
import { IStudent, Student } from "../models/Student";
import { User } from "../models/User";
import bcrypt from "bcrypt";
const studentRoute = Router();
studentRoute;
studentRoute.post("/student/add", async (req, res) => {
  const {
    admissionNo,
    rollNumber,
    divition,
    section,
    firstName,
    lastName,
    gender,
    dob,
    category,
    mobileNumber,
    email,
    admissionDate,
    bloodGroup,
    medicalHistory,
  } = req.body;
  try {
    const user = new User({
      email: email,
      username: rollNumber,
      name: firstName + lastName,
      password: await bcrypt.hash(mobileNumber, 10),
      role: "student",
    });

    await user.save();

    const student = new Student({
      admissionNo,
      rollNumber,
      divition,
      section,
      firstName,
      lastName,
      gender,
      dob,
      category,
      mobileNumber,
      email,
      admissionDate,
      bloodGroup,
      medicalHistory,
    });
    await student.save();
    res.status(200).json({ message: "Student created successfully" });
  } catch (error) {
    console.error("Error creating student:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

studentRoute.get("/student", async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json({ student: students });
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

studentRoute.get("/student/:id", async (req, res) => {
  const studentId = req.params.id;
  try {
    const student = await Student.find({ _id: studentId });

    if (!student) {
      return res.status(404).json({ message: "Student not Found " });
    }
    res.status(200).json({ student: student });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

studentRoute.delete("/student/delete/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);

    const user = await User.findOneAndDelete({ username: student?.rollNumber });
    if (!student || !user) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

studentRoute.put("/student/update/:id", async (req, res) => {
  try {
    const {
      admissionNo,
      rollNumber,
      divition,
      section,
      firstName,
      lastName,
      gender,
      dob,
      category,
      mobileNumber,
      email,
      admissionDate,
      bloodGroup,
      medicalHistory,
    } = req.body;
    const student = await Student.findByIdAndUpdate(req.params.id, {
      admissionNo,
      rollNumber,
      divition,
      section,
      firstName,
      lastName,
      gender,
      dob,
      category,
      mobileNumber,
      email,
      admissionDate,
      bloodGroup,
      medicalHistory,
    });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json({ student });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

export default studentRoute;
