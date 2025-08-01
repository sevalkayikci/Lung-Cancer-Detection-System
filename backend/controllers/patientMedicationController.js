import PatientMedication from '../models/PatientMedication.js';

// POST: Add medication to patient
export const addMedicationToPatient = async (req, res) => {
  const { medication_id, dosage, frequency } = req.body;
  const patient_id = req.params.id;

  try {
    const newMed = await PatientMedication.create({
      patient_id,
      medication_id,
      dosage,
      frequency
    });
    res.status(201).json(newMed);
  } catch (error) {
    res.status(500).json({ message: 'Error adding medication', error: error.message });
  }
};

// GET: Get patient's medications
export const getMedicationsByPatient = async (req, res) => {
  const patient_id = req.params.id;

  try {
    const meds = await PatientMedication.findAll({
      where: { patient_id }
    });
    res.status(200).json(meds);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching medications', error: error.message });
  }
};
