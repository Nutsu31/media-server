const express = require("express");
const router = express.Router();
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./src/files/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

const readCSVFile = require("../services/csv-service");
const readXLSXFile = require("../services/xlsx-service");
const readDOCXFile = require("../services/docx-service");
const RandomPeople = require("../schemas/Test");

router.post("/", upload.single("file"), async (req, res) => {
  const file = req.file;
  const findDb = await RandomPeople.find();
  try {
    const endpoint = file.originalname.split(".")[1].toLowerCase();

    if (endpoint.includes("xls" || "xlsx")) {
      const result = readXLSXFile(file);
      return res
        .status(200)
        .json({
          status: "ok",
          message: "Your XLSX file uploaded successful",
          result,
        });
    } else if (endpoint.includes("csv")) {
      // csv files here
      const result = await readCSVFile(file);
      console.log(result);
      return res.status(200).json({
        status: "ok",
        message: "Your CSV file uploaded successful",
        result,
      });
    } else {
      return res.status(400).json({
        status: "bad",
        message: "please provide correct document type (csv, xls or xlsx)",
      });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ status: "bad", message: "error comes from server" });
  }
});

module.exports = router;
