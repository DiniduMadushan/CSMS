import Lab from "../model/laboratary.js";
import Appointment from "../model/appointment.js";
import Medical from "../model/medical.js";
import MedicalRecord from "../model/medicalRecord.js";
import Queue from "../model/queue.js";
import Patient from "../model/Patients.js"
import Xray from "../model/xray.js";
import PrescriptionList from "../model/prescriptionList.js";
import { xRayDeliveredSms } from "../utils/SendSMS.js";

export const getMedicalHistory = async (req, res) => {
  try {
    const medicalRecords = await MedicalRecord.find();
    res.status(200).json(medicalRecords);
    
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


// Get medical records for a specific patient by patientId
export const getPatientHistory = async (req, res) => {
  const { patientid } = req.params; 

  try {
    const medicalRecords = await MedicalRecord.find({ patientId: patientid });

    if (medicalRecords.length === 0) {
      return res.status(404).json({ message: "No medical records found for this patient" });
    }

    res.status(200).json(medicalRecords);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export const createMedicalRecord = async (req, res) => {
  const { patientId, docName, description } = req.body;

  // Check for missing required fields
  if (!patientId) {
    
    return res.status(400).json({ message: "Please Scan patient's QR" });
    
  }

  if (!docName) {
    
    return res.status(400).json({ message: "Doctor name is required" });
  }

  if (!description) {
    return res.status(400).json({ message: "Description is required" });
  }

  try {
    // Create a new medical record
    const newMedicalRecord = new MedicalRecord({
      patientId,
      docName,
      description,
      date: Date.now(),  // Set date to the current timestamp
    });

    await newMedicalRecord.save();

    return res.status(201).json({
      data: newMedicalRecord,
      message: "Medical record added successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//create a prescriptionList
export const createPrescriptionList = async (req, res) => {
  const { patientId, docName, prescription_list } = req.body;

  
  if (!patientId) {
    return res.status(400).json({ message: "Please Scan patient's QR" });
  }

  if (!docName) {
    return res.status(400).json({ message: "Doctor ID is required" });
  }

  if (!prescription_list) {
    console.log("err3");
    return res.status(400).json({ message: "Prescription list cannot be empty"});
  }

  try {
    
    const newPrescriptionRecord = new PrescriptionList({
      patientId: patientId,
      docName: docName,
      prescription:prescription_list, 
      date: Date.now(), 
    });

    // Save the new medical record
    await newPrescriptionRecord.save();
    return res.status(201).json({
      data: newPrescriptionRecord,
      message: "Prescription list added successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


export const getPrescriptionByPatientId = async (req, res) => {
  const { patientid } = req.params;

  try {
    const prescription = await PrescriptionList.findOne({ patientId: patientid })
      .sort({ date: -1 })  
      .select('docName date prescription'); 

   
    if (!prescription) {
      return res.status(404).json({ message: "Prescription list not found" });
    }

    
    res.json({
      docName: prescription.docName,
      date: prescription.date,
      prescription: prescription.prescription,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const createMedicalXray = async (req, res) => {
  const { patientId, xray, xrayIssued, delivered } = req.body;

  if (!patientId) {
    return res.status(400).json({ message: "Please Scan patient's QR" });
  }

  if (!xray) {
    return res.status(400).json({ message: "X-ray details are required" });
  }

  if (!xrayIssued) {
    return res.status(400).json({ message: "Xray Issued by unknown!" });
  }
  try {
    const existMedical = await Xray.findOne({ patientId });

    const addXray = await Xray.create({
      patientId,
      xray,
      xrayIssued,
    });
    res.json(addXray);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getMedicalXray = async (req, res) => {
  const { patientid } = req.params;
  console.log(patientid);
  try {
    const xrayData = await Xray.find({ patientId: patientid });

    if (!xrayData) {
      return res.status(404).json({ message: "Xray not found" });
    }

    res.json(xrayData);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateMedicalXray = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, phoneNumber } = req.body;
  console.log(id, firstName, lastName, phoneNumber);
  try {
    const xrayData = await Xray.findOne({ _id: id });

    if (!xrayData) {
      return res.status(404).json({ message: "Xray not found" });
    }

    const updatedXray = await Xray.findOneAndUpdate(
      xrayData._id,
      { delivered: true },
      {
        new: true,
      }
    );
    xRayDeliveredSms(firstName, lastName, phoneNumber);
    res.json(updatedXray);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createLabReport = async (req, res) => {
  const { patientId, report_desc, reportRequested, delivered } = req.body;

  if (!patientId) {
    return res.status(400).json({ message: "Patient ID is required" });
  }

  if (!report_desc) {
    return res.status(400).json({ message: "report description is required" });
  }

  if (!reportRequested) {
    return res.status(400).json({ message: "request Issued by unknown !" });
  }
  try {
    const existMedical = await Lab.findOne({ patientId });

    const addBloodReport = await Lab.create({
      patientId,
      report_desc,
      reportRequested,
    });
    res.json(addBloodReport);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getLabReport = async (req, res) => {
  const { patientid } = req.params;
  console.log(patientid);
  try {
    const labData = await Lab.find({ patientId: patientid });

    if (!labData) {
      return res.status(404).json({ message: "Lab report not found" });
    }

    res.json(labData);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateLabReport = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, phoneNumber, pdfUrl } = req.body;
  console.log(id, firstName, lastName, phoneNumber, pdfUrl);
  try {
    const labData = await Lab.findOne({ _id: id });

    if (!labData) {
      return res.status(404).json({ message: "Lab report not found" });
    }

    const updatedLab = await Lab.findOneAndUpdate(
      labData._id,
      { delivered: true, pdfUrl },

      {
        new: true,
      }
    );
    res.json(updatedLab);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//set next clinic date

export const nextClinicDate = async (req, res) => {
  const { patientId, dateIssuedBy, date } = req.body;

  
  if (!patientId) {
    return res.status(400).json({ message: "Patient ID is required" });
  }

  if (!dateIssuedBy) {
    return res.status(400).json({ message: "Date issued by (Doctor's ID) is required" });
  }

  if (!date) {
    return res.status(400).json({ message: "Next clinic date is required" });
  }

  try {

    const clinicDate = new Date(date);
    const today = new Date();

    if (clinicDate < today) {
      return res.status(400).json({ message: "invalid date" });
    }

   
    const newAppointment = new Appointment({
      patientId,
      dateIssuedBy,
      date: new Date(date),
    });

    
    await newAppointment.save();

    
    return res.status(201).json({
      message: "Next clinic date set successfully",
      appointment: newAppointment,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

//add to the queue

export const addQueue = async (req, res) => {
  const { id } = req.params;

  try {
    let queue = await Queue.findOne();

    if (queue) {
      if (queue.queue.includes(id)) {
        // queue.queue.pull(id);
        // await queue.save();
        res.json({
          message: "Patient all ready in queue",
          queue,
        });
      } else {
        queue.queue.push(id);
        await queue.save();
        res.json({
          message: "Patient added to queue",
          queue,
        });
      }
    } else {
      queue = new Queue({ queue: [id] });
      await queue.save();
      res.json(queue);
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//remove from the queue
export const removeQueue = async (req, res) => {
  const { id } = req.params;

  try {
    let queue = await Queue.findOne();

    if (queue) {
      if (queue.queue.includes(id)) {
        queue.queue.pull(id);
        await queue.save();
        res.json({
          message: "Patient removed from queue",
          queue,
        });
      } else {
        // queue.queue.push(id);
        // await queue.save();
        res.json({
          message: "Patient removed from queue",
          queue,
        });
      }
    } else {
      queue = new Queue({ queue: [id] });
      await queue.save();
      res.json(queue);
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//get details from the queue
export const getQueue = async (req, res) => {
  try {
    const queue = await Queue.find();
    res.json(queue);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//get prescription history of a patient

export const getPrescriptionHistoryByPatientId = async (req, res) => {
  const { patientid } = req.params; 
  try {
    const prescriptions = await PrescriptionList.find({ patientId:patientid});
    
    res.json(prescriptions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching prescriptions" });
  }
};

export const getXrayHistoryByPatientId = async (req, res) => {
  const { patientId } = req.params;
  const { date } = req.query;
  console.log("xray called");

  try {
    const xray = await Xray.findOne({ patientId, date });
    res.status(200).json(xray);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getLabHistoryByPatientId= async (req, res) => {
  const { patientId } = req.params;
  const { date } = req.query;
  console.log("lab called");
  try {
    const lab = await Lab.findOne({ patientId, date });
    res.status(200).json(lab);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


