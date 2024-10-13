import express from "express";
import {
  addQueue,
  createLabReport,
  createMedicalRecord,
  createPrescriptionList,
  createMedicalXray,
  getLabReport,
  getMedicalHistory,
  getPatientHistory,
  getPrescriptionByPatientId,
  getMedicalXray,
  nextClinicDate,
  getQueue,
  removeQueue,
  updateLabReport,
  updateMedicalXray,
  getPrescriptionHistoryByPatientId,
  // addXrayQueue,
  // removeXrayQueue,
  // getXrayQueue,
} from "../controller/medicalController.js";


const medicalRouter = express.Router();

medicalRouter.get("/", getMedicalHistory);
medicalRouter.get("/:patientid", getPrescriptionByPatientId);
medicalRouter.get("/prescriptionHistory/:patientid", getPrescriptionHistoryByPatientId);
medicalRouter.get("/medicalhistory/:patientid", getPatientHistory);
medicalRouter.post("/", createMedicalRecord);
medicalRouter.post("/prescriptionList", createPrescriptionList);
medicalRouter.post("/xray", createMedicalXray);
medicalRouter.post("/nextDate", nextClinicDate);
medicalRouter.get("/xray/:patientid", getMedicalXray);
medicalRouter.put("/xray/delivered/:id", updateMedicalXray);
medicalRouter.post("/lab", createLabReport);
medicalRouter.get("/lab/:patientid", getLabReport);
medicalRouter.put("/lab/delivered/:id", updateLabReport);
medicalRouter.put("/queue/:id", addQueue);
medicalRouter.delete("/rm/queue/:id", removeQueue);
medicalRouter.get("/queue/get", getQueue);
// medicalRouter.put("/xrayqueue/:id", addXrayQueue);
// medicalRouter.delete("/rm/xrayqueue/:id", removeXrayQueue);
// medicalRouter.get("/xrayqueue/get", getXrayQueue);


export default medicalRouter;
