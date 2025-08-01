import PatientNote from '../models/PatientNote.js';

// POST: Add note
export const addNoteToPatient = async (req, res) => {
  const { doctor_id, note_text } = req.body;
  const patient_id = req.params.id;

  try {
    const newNote = await PatientNote.create({
      patient_id,
      doctor_id,
      note_text
    });
    res.status(201).json(newNote);
  } catch (error) {
    res.status(500).json({ message: 'Error adding note', error: error.message });
  }
};

// GET: Notes for a patient
export const getNotesByPatient = async (req, res) => {
  const patient_id = req.params.id;

  try {
    const notes = await PatientNote.findAll({
      where: { patient_id },
      order: [['created_at', 'DESC']]
    });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching notes', error: error.message });
  }
};
