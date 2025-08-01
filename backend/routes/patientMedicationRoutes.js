import express from 'express';
import { addMedicationToPatient, getMedicationsByPatient } from '../controllers/patientMedicationController.js';

const router = express.Router();

router.post('/:id/medications', addMedicationToPatient);
router.get('/:id/medications', getMedicationsByPatient);

export default router;
