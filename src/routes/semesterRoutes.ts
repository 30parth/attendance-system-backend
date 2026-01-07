import { Router } from "express";
import { ISemester, Semester } from "../models/Semester";

const semesterRoutes = Router();

semesterRoutes.get("/semester", async (req, res) => {
  try {
    const semesters = await Semester.find();
    res.status(200).json(semesters);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

semesterRoutes.post("/semester/add", async (req, res) => {
  try {
    const { name } = req.body;
    const newSemester = await Semester.create({ name });
    res.status(200).json({ semesterData: newSemester });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

semesterRoutes.delete("/semester/delete/:id", async (req, res) => {
  try {
    const semesterData = await Semester.findByIdAndDelete(req.params.id);
    if (!semesterData) {
      return res.status(404).json({ error: "Semester not found" });
    }
    res.status(200).json({ semesterData });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

semesterRoutes.put("/semester/update/:id", async (req, res) => {
  try {
    const { name } = req.body;
    const semesterData = await Semester.findByIdAndUpdate(req.params.id, {
      name,
    });
    if (!semesterData) {
      return res.status(404).json({ error: "Semester not found" });
    }
    res.status(200).json({ semesterData });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default semesterRoutes;
