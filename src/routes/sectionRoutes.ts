import { Router } from "express";
import { Semester } from "../models/Semester";

const sectionRoute = Router();

sectionRoute.get("/section/:name", async (req, res) => {
  try {
    if (!req.params.name) {
      return res.status(400).json({ error: "Semester name is required" });
    }

    const allSectionData = await Semester.findOne({ name: req.params.name });

    if (!allSectionData) {
      return res.status(404).json({ error: "Semester not found" });
    }

    allSectionData.section.map((section) => console.log(section.name));

    return res.status(200).json(allSectionData.section);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

export default sectionRoute;
