import express from "express";
import multer, { diskStorage } from "multer";
import { spawn } from "child_process";
import cors from "cors";
import { join } from "path";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();
const PORT = 5000;
app.use(cors());
app.use(express.static("public"));


// Setup multer for file uploads
const storage = diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

// Endpoint to handle file upload and extraction
app.post("/extract", upload.single("pdfFile"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded." });
  }

  const pdfPath = path.join(__dirname, "uploads", req.file.filename);
  const outputExcel = path.join(__dirname, "public", "output.xlsx");

  console.log("Processing PDF:", pdfPath);
  console.log("Expected output:", outputExcel);

  const pythonProcess = spawn("python", ["extract.py", pdfPath, outputExcel]);

  pythonProcess.stdout.on("data", (data) => {
    console.log(`Python Output: ${data}`);
  });

  pythonProcess.stderr.on("data", (data) => {
    console.error(`Python Error: ${data}`);
  });

  pythonProcess.on("close", (code) => {
    if (code === 0) {
      console.log("File should be available at: http://localhost:5000/output.xlsx");
      res.json({ downloadLink: "/output.xlsx" });
    } else {
      console.error("Python script failed.");
      res.status(500).json({ error: "Python script execution failed. Check logs." });
    }
  });
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
