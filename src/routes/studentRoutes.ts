import { Router } from "express";
import { IStudent, Student } from "../models/Student";

const studnetRoute = Router();

studnetRoute.post("/student/add", async (req, res) => {
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

studnetRoute.get("/student", async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json({ student: students });
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

studnetRoute.delete("/student/delete/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

export default studnetRoute;
