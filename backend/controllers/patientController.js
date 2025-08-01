import Patient from '../models/Patient.js';
import { Op } from 'sequelize'; //ilike operator for searching
import Status from '../models/Status.js'; 

import PatientMedication from '../models/PatientMedication.js';
import Medication from '../models/Medication.js';
import Treatment from '../models/Treatment.js';
import TreatmentType from '../models/TreatmentType.js';
import SymptomRecord from '../models/SymptomRecord.js';

// CREATE
export const addPatient = async (req, res) => {
  try {
    const newPatient = await Patient.create(req.body);
    res.status(201).json(newPatient);
  } catch (error) {
    res.status(500).json({ message: 'Error adding patient', error: error.message });
  }
};

// READ ALL
export const getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.findAll();
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching patients' });
  }
};

// READ SINGLE
export const getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findByPk(req.params.id);
    if (!patient) return res.status(404).json({ message: 'Patient not found' });
    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching patient' });
  }
};

// UPDATE
export const updatePatient = async (req, res) => {
  try {
    const patient = await Patient.findByPk(req.params.id);
    if (!patient) return res.status(404).json({ message: 'Patient not found' });

    await patient.update(req.body);
    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ message: 'Error updating patient' });
  }
};

// DELETE
export const deletePatient = async (req, res) => {
  try {
    const patient = await Patient.findByPk(req.params.id);
    if (!patient) return res.status(404).json({ message: 'Patient not found' });

    await patient.destroy();
    res.status(200).json({ message: 'Patient deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting patient' });
  }
};

// SEARCH BY NAME
export const searchPatientByName = async (req, res) => {
    const { first_name, last_name } = req.query;
  
    const whereClause = {};
    if (first_name) {
      whereClause.first_name = { [Op.iLike]: `%${first_name}%` }; // case-insensitive 
    }
    if (last_name) {
      whereClause.last_name = { [Op.iLike]: `%${last_name}%` };
    }
  
    try {
      const patients = await Patient.findAll({ where: whereClause });
  
      if (patients.length === 0) {
        return res.status(404).json({ message: 'No patients found' });
      }
  
      res.status(200).json(patients);
    } catch (error) {
      res.status(500).json({ message: 'Error searching for patients', error: error.message });
    }
  };

// SEARCH BY  FULL NAME
export const findPatientByFullName = async (req, res) => {
  const { name, surname } = req.query;

  try {
    const patient = await Patient.findOne({
      where: {
        name: { [Op.iLike]: name },
        surname: { [Op.iLike]: surname }
      }
    });

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.status(200).json({ patientId: patient.patient_id });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//PATIENT INFO

export const getPatientInfo = async (req, res) => {
  const patient_id = parseInt(req.params.id);
  console.log("REQ.USER:", req.user);

  if (!req.user || !req.user.id) {
    return res.status(401).json({ message: "Not authorized" });
  }

  try {
    const patient = await Patient.findByPk(patient_id, {
      include: [{ model: Status }]
    });

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    const medications = await PatientMedication.findAll({
      where: { patient_id },
      include: [Medication]
    });

    const treatments = await Treatment.findAll({
      where: { patient_id },
      include: [TreatmentType]
    });

    const symptomEntries = await SymptomRecord.findAll({
      where: { patient_id },
      order: [['created_at', 'DESC']]
    });

    const allSymptoms = symptomEntries.flatMap(entry => entry.symptoms);

    res.status(200).json({
      name: patient.name,
      surname: patient.surname,
      birthday: patient.birthday,
      gender: patient.gender,
      phone: patient.phone,
      emergency_phone: patient.emergency_phone,
      status: patient?.Status?.status_name || 'Unknown',

      medications: medications.map((m) => ({
        name: m?.Medication?.medication_name || '-',
        dosage: m.dosage,
        frequency: m.frequency
      })),

      treatments: treatments.map((t) => ({
        type: t?.TreatmentType?.treatment_type_name || '-',
        description: t.description || '-'
      })),

      symptoms: allSymptoms  
    });

  } catch (error) {
    console.error("getPatientInfo error:", error.message);
    res.status(500).json({ message: 'Error loading patient info', error: error.message });
  }
};
