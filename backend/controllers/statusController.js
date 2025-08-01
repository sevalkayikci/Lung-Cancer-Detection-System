import Status from '../models/Status.js';

export const getAllStatuses = async (req, res) => {
  try {
    const statuses = await Status.findAll();
    res.status(200).json(statuses);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching statuses', error: error.message });
  }
};
