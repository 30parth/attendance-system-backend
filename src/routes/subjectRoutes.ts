import { Router } from "express";
import { Subject } from "../models/Subject";

const subejctRoute = Router();

subejctRoute.get("/subject", async (req, res) => {
  try {
    const allSubejctData = await Subject.find();

    res.status(200).json(allSubejctData);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

subejctRoute.post("/subject/add", async (req, res) => {
  try {
    const { name, code, divition } = req.body;

    if (!name || !code || !divition) {
      return res
        .status(401)
        .json({ message: "Name or Code or Divition is Missing " });
    }

    const newSubject = new Subject({
      name: name,
      code: code,
      divition: divition,
    });

    await newSubject.save();

    res
      .status(200)
      .json({ message: "Subject Created  Successfully", subject: newSubject });
  } catch (error) {
    return res.status(500).json({ message: "Inernal Server Error " });
  }
});

subejctRoute.delete("/subject/delete/:id", async (req, res) => {
  try {
    const subject = await Subject.findByIdAndDelete(req.params.id);

    if (!subject) {
      return res.status(404).json({ message: "Subject Not Found" });
    }

    res.status(200).json({ message: "Subject Deleted Successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

subejctRoute.put("/subject/update/:id", async (req, res) => {
  try {
    const { name, code, divition } = req.body;

    if (!name || !code || !divition) {
      return res
        .status(401)
        .json({ message: "Name or Code or Divition is Missing " });
    }

    const subject = await Subject.findByIdAndUpdate(req.params.id, {
      name: name,
      code: code,
      divition: divition,
    });

    if (!subject) {
      return res.status(404).json({ message: "Subject Not Found" });
    }

    res
      .status(200)
      .json({ message: "Subject Updated Successfully", subject: subject });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

export default subejctRoute;
