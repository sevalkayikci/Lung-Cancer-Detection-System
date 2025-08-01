import express from 'express';
import { addTreatmentToPatient, getTreatmentsByPatient } from '../controllers/treatmentController.js';
import verifyToken from '../middleware/verifyToken.js';
const router = express.Router();

router.post('/:id/treatments', verifyToken, addTreatmentToPatient);
router.get('/:id/treatments', verifyToken, getTreatmentsByPatient);

export default router;
