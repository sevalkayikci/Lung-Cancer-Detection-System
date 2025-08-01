import express from 'express';
import { getPatientInfo } from '../controllers/patientController.js';
import verifyToken from '../middleware/verifyToken.js';

const router = express.Router();
router.get('/:id/info', verifyToken, getPatientInfo);

export default router;
