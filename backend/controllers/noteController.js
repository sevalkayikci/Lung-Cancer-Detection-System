import Note from '../models/Note.js';

// ad note
export const addNote = async (req, res) => {
  const { patient_id, content } = req.body;
  const user_id = req.user?.id;

  if (!user_id) {
    return res.status(401).json({ message: 'Unauthorized. Missing user ID.' });
  }

  try {
    const newNote = await Note.create({
      user_id,
      patient_id,
      content
    });

    res.status(201).json(newNote);
  } catch (error) {
    res.status(500).json({ message: 'Error creating note', error: error.message });
  }
};

// get all notes by patient ID
export const getNotesByPatient = async (req, res) => {
  const patient_id = req.params.id;

  try {
    const notes = await Note.findAll({
      where: { patient_id },
      order: [['created_at', 'DESC']]
    });

    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching notes', error: error.message });
  }
};

// update note
export const updateNote = async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  try {
    const note = await Note.findByPk(id);
    if (!note) return res.status(404).json({ message: 'Note not found' });

    note.content = content;
    await note.save();

    res.status(200).json({ message: 'Note updated', note });
  } catch (error) {
    res.status(500).json({ message: 'Error updating note', error: error.message });
  }
};

//delete note
export const deleteNote = async (req, res) => {
  const { id } = req.params;

  try {
    const note = await Note.findByPk(id);
    if (!note) return res.status(404).json({ message: 'Note not found' });

    await note.destroy();
    res.status(200).json({ message: 'Note deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting note', error: error.message });
  }
};
