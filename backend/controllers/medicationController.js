import Medication from '../models/Medication.js';

export const getAllMedications = async (req, res) => {
  try {
    const medications = await Medication.findAll();
    res.status(200).json(medications);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching medications', error: error.message });
  }
};

