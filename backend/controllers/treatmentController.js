import Treatment from '../models/Treatment.js';

// new treatment for patient
export const addTreatmentToPatient = async (req, res) => {
  const { treatment_type_id, start_date, end_date } = req.body;
  const patient_id = parseInt(req.params.id);
  const user_id = req.user?.id; // doctor's user ID from the token

  if (!user_id) {
    return res.status(401).json({ message: "Unauthorized. User ID missing from token." });
  }

  console.log("TEDAVİ EKLENİYOR:", {
    user_id,
    patient_id,
    treatment_type_id,
    start_date,
    end_date
  });

  try {
    const newTreatment = await Treatment.create({
      user_id,
      patient_id,
      treatment_type_id,
      start_date: start_date || new Date(),
      end_date: end_date || null
    });

    res.status(201).json(newTreatment);
  } catch (error) {
    console.error("Add treatment error:", error.message);
    res.status(500).json({ message: 'Error adding treatment', error: error.message });
  }
};

// bring all treatments by patient id
export const getTreatmentsByPatient = async (req, res) => {
  const patient_id = parseInt(req.params.id);

  try {
    const treatments = await Treatment.findAll({
      where: { patient_id },
      order: [['start_date', 'DESC']]
    });

    res.status(200).json(treatments);
  } catch (error) {
    console.error("Get treatments error:", error.message);
    res.status(500).json({ message: 'Error fetching treatments', error: error.message });
  }
};

// bring treatment by id
export const getTreatmentById = async (req, res) => {
  const treatment_id = parseInt(req.params.tid);

  try {
    const treatment = await Treatment.findByPk(treatment_id);
    if (!treatment) {
      return res.status(404).json({ message: 'Treatment not found' });
    }

    res.status(200).json(treatment);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching treatment', error: error.message });
  }
};

//maybe delete treatment
export const deleteTreatment = async (req, res) => {
  const treatment_id = parseInt(req.params.tid);

  try {
    const deleted = await Treatment.destroy({ where: { treatment_id } });
    if (deleted) {
      return res.status(200).json({ message: 'Treatment deleted' });
    } else {
      return res.status(404).json({ message: 'Treatment not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting treatment', error: error.message });
  }
};
