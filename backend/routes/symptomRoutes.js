
import express from 'express';
import { addSymptom, getSymptomsByPatient } from '../controllers/symptomController.js';
import verifyToken from '../middleware/verifyToken.js';

const router = express.Router();

router.post('/', verifyToken, addSymptom);
router.get('/:id', verifyToken, getSymptomsByPatient);

export default router;
