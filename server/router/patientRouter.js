import express from "express";
import {
  createPatient,
  deletePatient,
  getPatientById,
  getPatients,
  sendEmail,
  updatePatient,
  getPatientCount,
} from "../controller/patientController.js";

const patientRouter = express.Router();

patientRouter.get("/", getPatients);
patientRouter.get("/:id", getPatientById);
patientRouter.post("/", createPatient);
patientRouter.put("/:id", updatePatient);
patientRouter.delete("/:id", deletePatient);
patientRouter.post("/send-email", sendEmail);
patientRouter.get("/totalCount", getPatientCount);

export default patientRouter;
