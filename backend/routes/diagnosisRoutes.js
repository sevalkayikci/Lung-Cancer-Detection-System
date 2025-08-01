import express from 'express';
import { createDiagnosis, getDiagnosisByPatientId} from '../controllers/diagnosisController.js';

import verifyToken from '../middleware/verifyToken.js';
import upload from '../middleware/upload.js';
const router = express.Router();

router.post('/upload', verifyToken, upload.single('ctImage'), createDiagnosis);
router.get('/patient/:patientId', verifyToken, getDiagnosisByPatientId);


export default router;