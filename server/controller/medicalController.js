import Lab from "../model/laboratary.js";
import Medical from "../model/medical.js";
import Queue from "../model/queue.js";
import Xray from "../model/xray.js";
import { xRayDeliveredSms } from "../utils/SendSMS.js";

export const getMedicals = async (req, res) => {
  try {
    const medicals = await Medical.find();
    res.json(medicals);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createMedical = async (req, res) => {
  const medical = req.body;

  const patientId = req.body.patientId;

  if (!patientId) {
    return res.status(400).json({ message: "Patient ID is required" });
  }

  try {
    const exsitMedical = await Medical.findOne({ patientId });

    if (exsitMedical) {
      medical.medicingDilivery = false;

      const updatedMedical = await Medical.findOneAndUpdate(
        exsitMedical._id,
        medical,
        {
          new: true,
        }
      );

      res.status(200).json({
        data: updatedMedical,
        message: "Medical record updated successfully",
      });
    } else {
      const newMedical = new Medical(medical);
      await newMedical.save();
      res
        .status(200)
        .json({ data: newMedical, message: "Medical record added" });
    }
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getMedicalsByPatientId = async (req, res) => {
  const { patientid } = req.params;
  try {
    const medicals = await Medical.find({ patientId: patientid });

    if (medicals.length === 0) {
      return res.status(404).json({ message: "Medical record not found" });
    }

    res.json(medicals);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createMedicalXray = async (req, res) => {
  const { patientId, xray, xrayIssued, delivered } = req.body;

  if (!patientId) {
    return res.status(400).json({ message: "Patient ID is required" });
  }

  if (!xray) {
    return res.status(400).json({ message: "Xray is required" });
  }

  if (!xrayIssued) {
    return res.status(400).json({ message: "XrayIssued is required" });
  }
  try {
    const existMedical = await Xray.findOne({ patientId });

    const addMedicalRecord = await Xray.create({
      patientId,
      xray,
      xrayIssued,
    });
    res.json(addMedicalRecord);
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
  const { patientId, report, reportIssued, delivered } = req.body;

  if (!patientId) {
    return res.status(400).json({ message: "Patient ID is required" });
  }

  if (!report) {
    return res.status(400).json({ message: "report is required" });
  }

  if (!reportIssued) {
    return res.status(400).json({ message: "reportIssued is required" });
  }
  try {
    const existMedical = await Lab.findOne({ patientId });

    const addMedicalReport = await Lab.create({
      patientId,
      report,
      reportIssued,
    });
    res.json(addMedicalReport);
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

export const getQueue = async (req, res) => {
  try {
    const queue = await Queue.find();
    res.json(queue);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
