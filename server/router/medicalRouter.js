import express from "express";
import {
  addQueue,
  createLabReport,
  createMedical,
  createMedicalXray,
  getLabReport,
  getMedicals,
  getMedicalsByPatientId,
  getMedicalXray,
  getQueue,
  removeQueue,
  updateLabReport,
  updateMedicalXray,
} from "../controller/medicalController.js";


const medicalRouter = express.Router();

medicalRouter.get("/", getMedicals);
medicalRouter.get("/:patientid", getMedicalsByPatientId);
medicalRouter.post("/", createMedical);
medicalRouter.post("/xray", createMedicalXray);
medicalRouter.get("/xray/:patientid", getMedicalXray);
medicalRouter.put("/xray/delivered/:id", updateMedicalXray);
medicalRouter.post("/lab", createLabReport);
medicalRouter.get("/lab/:patientid", getLabReport);
medicalRouter.put("/lab/delivered/:id", updateLabReport);
medicalRouter.put("/queue/:id", addQueue);
medicalRouter.put("/rm/queue/:id", removeQueue);
medicalRouter.get("/queue/get", getQueue);

export default medicalRouter;
