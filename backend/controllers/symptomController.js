import SymptomRecord from '../models/SymptomRecord.js';

export const addSymptom = async (req, res) => {
  const { patient_id, symptoms } = req.body;

  try {
    const record = await SymptomRecord.create({
      patient_id,
      symptoms
    });
    res.status(201).json(record);
  } catch (err) {
    res.status(500).json({ message: "Failed to save symptoms", error: err.message });
  }
};

export const getSymptomsByPatient = async (req, res) => {
  const { id } = req.params;

  try {
    const records = await SymptomRecord.findAll({
      where: { patient_id: id },
      order: [['created_at', 'DESC']]
    });
    res.status(200).json(records);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch symptoms", error: err.message });
  }
};
