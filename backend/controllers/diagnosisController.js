import axios from 'axios';
import Diagnosis from '../models/Diagnosis.js';
import Patient from '../models/Patient.js';
import { Op } from 'sequelize';
import path from 'path';
import fs from 'fs'; 

export const createDiagnosis = async (req, res) => {
  const { name, surname } = req.body;
  const userId = req.user.id; // user with token
  

  try {
    // check if patient exists
    const patient = await Patient.findOne({
      where: {
        name: { [Op.iLike]: name },
        surname: { [Op.iLike]: surname }
      }
    });
    

    if (!patient) {
      return res.status(404).json({ message: 'No patients found!' });
    }

    const patientId = patient.patient_id;

  
    const originalPath = req.file.path; 
    const ext = path.extname(req.file.originalname); 
    const newFilename = `${patientId}${ext}`; 
    const newPath = path.join('uploads', newFilename);

    fs.renameSync(originalPath, newPath);


    const imagePath = path.resolve(newPath);

    // go to flask api for prediction
    const response = await axios.post('http://localhost:5001/predict', { imagePath });
  

    const { confidence, outputPath } = response.data;

    const newDiagnosis = await Diagnosis.create({
    patient_id: patientId,
    user_id: userId,
    confidence_score: confidence,
    diagnosis_result: "Not classified",
    diagnosis_date: new Date(),
    cancer_type_id: null,
    output_path: outputPath  
  });


    res.status(201).json({
      message: 'Diagnosis saved successfully',
      diagnosis: newDiagnosis
    });

  } catch (error) {
    console.error('Diagnosis error:', error);
    res.status(500).json({ message: 'Diagnosis unsuccessful!', error: error });
  }
};

export const getDiagnosisByPatientId = async (req, res) => {
  const { patientId } = req.params;

  try {
    const results = await Diagnosis.findAll({
      where: { patient_id: patientId },
      attributes: [ 
        'diagnosis_id',
        'confidence_score',
        'diagnosis_date',
        'output_path'
      ],
      order: [["diagnosis_date", "DESC"]],
      raw: true
    });

    //const filtered = results.filter(d => d.output_path !== null);

    const filtered = results.filter(d => d.output_path && fs.existsSync(d.output_path));

    res.status(200).json(filtered);
  } catch (error) {
    console.error("❌ HATA:", error?.message || error);
    res.status(500).json({ message: "Server error while fetching scans." });
  }
};
