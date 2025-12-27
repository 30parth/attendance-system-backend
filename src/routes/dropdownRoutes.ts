import { Router } from "express";
import { Class } from "../models/Class";
import { Student } from "../models/Student";

const dropdownRoute = Router();

// Dropdown for Classes - Returns only _id and name
dropdownRoute.get("/dropdown/class", async (req, res) => {
  try {
    const classes = await Class.find().select("_id name");
    res.status(200).json(classes);
  } catch (error) {
    console.error("Error fetching class dropdown data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Dropdown for Students - Returns only _id and combined name
dropdownRoute.get("/dropdown/student", async (req, res) => {
  try {
    const students = await Student.find().select("_id firstName lastName");
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
