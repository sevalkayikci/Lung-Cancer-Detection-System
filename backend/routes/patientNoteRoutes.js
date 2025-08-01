import express from 'express';
import { addNoteToPatient, getNotesByPatient } from '../controllers/patientNoteController.js';

const router = express.Router();

router.post('/:id/notes', addNoteToPatient);
router.get('/:id/notes', getNotesByPatient);

export default router;
