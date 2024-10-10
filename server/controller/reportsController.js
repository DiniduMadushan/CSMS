import Lab from "../model/laboratary.js";
import mongoose from "mongoose";
import path from "path";

export const uploadLabResult = async (req, res) => {
    console.log("Inside file upload");
    
    const file = req.file;
    const { labId, delivered } = req.body;

    if (!file || !labId) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        
        const existingLab = await Lab.findOne({ _id: new mongoose.Types.ObjectId(labId) });
        console.log(existingLab);

        if (existingLab) {
            existingLab.pdfUrl = path.join("uploads", file.filename); 
            existingLab.delivered = delivered === 'true'; 
            existingLab.date = new Date();

            await existingLab.save();

            res.status(200).json({
                message: "Lab result uploaded successfully",
                existingLab,
            });
        } 
    } catch (error) {
        console.error("Error uploading lab result:", error);
        res.status(500).json({ message: "Error uploading lab result" });
    }
};
