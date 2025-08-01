import TreatmentType from '../models/treatmentType.js';

export const getAllTreatmentTypes = async (req, res) => {
  try {
    const types = await TreatmentType.findAll();
    res.status(200).json(types);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching treatment types', error: error.message });
  }
};
