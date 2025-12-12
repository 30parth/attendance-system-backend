import { Router } from "express";
import { IClass, Class } from "../models/Class";

const classRoutes = Router();

classRoutes.get("/class", async (req, res) => {
  try {
    const classes = await Class.find();
    res.status(200).json(classes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

classRoutes.post("/class/add", async (req, res) => {
  try {
    const { name } = req.body;
    const newClass = await Class.create({ name });
    res.status(200).json({ classData: newClass });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

classRoutes.delete("/class/delete/:id", async (req, res) => {
  try {
    const classData = await Class.findByIdAndDelete(req.params.id);
    if (!classData) {
      return res.status(404).json({ error: "Class not found" });
    }
    res.status(200).json({ classData });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
export default classRoutes;
