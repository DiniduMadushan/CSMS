import Lab from "../model/laboratary.js";
import mongoose from "mongoose";
import path from "path";

export const uploadLabResult = async (req, res) => {
    console.log("Inside file upload");
    
    const file = req.file;
    const { patientId, report_desc, delivered } = req.body;

    if (!file || !patientId || !report_desc) {
        console.log("Missing data");
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        
        const existingLab = await Lab.findOne({ patientId: new mongoose.Types.ObjectId(patientId) });

        if (existingLab) {
            existingLab.report_desc = report_desc;
            existingLab.pdfUrl = path.join("uploads", file.filename); 
            existingLab.delivered = delivered === 'true'; 
            existingLab.date = new Date();

            await existingLab.save();

            res.status(200).json({
                message: "Lab result updated successfully",
                existingLab,
            });
        } 
    } catch (error) {
        console.error("Error uploading lab result:", error);
        res.status(500).json({ message: "Error uploading lab result" });
    }
};
