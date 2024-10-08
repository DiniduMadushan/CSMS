import LabResult from "../model/labResult.js"; 
import mongoose from "mongoose"; 
import path from "path"; 

export const uploadLabResult = async (req, res) => { 
    console.log("Inside file upload"); 
    
    const file = req.file; 
    const { patientId, testDescription, lab_delivered } = req.body; // Destructure lab_delivered from body

    if (!file || !patientId || !testDescription) { 
        console.log("no data"); 
        return res.status(400).json({ message: "Missing required fields" }); 
    } 

    try { 
        // Save metadata in MongoDB 
        const newLabResult = new LabResult({ 
            patientId: new mongoose.Types.ObjectId(patientId), // Use `new` keyword 
            testDescription, 
            fileUrl: path.join("uploads", file.filename), // Path to the locally saved file 
            uploadedAt: new Date(), 
            lab_delivered: lab_delivered === 'true', // Convert to boolean
        }); 
        
        await newLabResult.save(); 
        
        res.status(201).json({ 
            message: "Lab result uploaded successfully", 
            newLabResult, 
        }); 
    } catch (error) { 
        console.error("Error uploading lab result:", error); 
        res.status(500).json({ message: "Error uploading lab result" }); 
    } 
};
