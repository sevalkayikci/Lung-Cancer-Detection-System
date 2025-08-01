import express from 'express';
import { getAllTreatmentTypes } from '../controllers/treatmentTypeController.js';

const router = express.Router();

router.get('/', getAllTreatmentTypes);

export default router;
