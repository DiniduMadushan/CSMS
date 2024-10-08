import express from "express";
import { uploadLabResult } from "../controller/reportsController.js";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url"; // Import to handle __dirname in ES modules

// Get the __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure uploads directory exists (if not already handled in index.js)
const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Set up multer to store files locally in 'uploads' directory
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Save files to the 'uploads' directory
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Rename file to avoid duplicates
  },
});

const upload = multer({ storage });

const reportsRouter = express.Router();

// Route to upload a lab result PDF
reportsRouter.post("/upload", upload.single("file"), uploadLabResult);

export default reportsRouter;
