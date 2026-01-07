import { Router } from "express";
import { Semester } from "../models/Semester";
import { Student } from "../models/Student";

const dropdownRoute = Router();

// Dropdown for Semesters - Returns only _id and name
dropdownRoute.get("/dropdown/semester", async (req, res) => {
  try {
    const semesters = await Semester.find().select("_id name");
    res.status(200).json(semesters);
  } catch (error) {
    console.error("Error fetching semester dropdown data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Dropdown for Students - Returns only _id and combined name
dropdownRoute.get("/dropdown/student", async (req, res) => {
  try {
    const students = await Student.find().select("_id name");
    const formattedStudents = students.map((student) => ({
      _id: student._id,
      name: student.name,
    }));
    res.status(200).json(formattedStudents);
  } catch (error) {
    console.error("Error fetching student dropdown data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default dropdownRoute;
