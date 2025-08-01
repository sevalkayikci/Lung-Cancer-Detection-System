import express from 'express';
import {
  addNote,
  getNotesByPatient,
  updateNote,
  deleteNote
} from '../controllers/noteController.js';
import verifyToken from '../middleware/verifyToken.js';

const router = express.Router();

router.get('/:id', verifyToken, getNotesByPatient);
router.post('/', verifyToken, addNote);
router.put('/:id', verifyToken, updateNote);
router.delete('/:id', verifyToken, deleteNote); 

export default router;
