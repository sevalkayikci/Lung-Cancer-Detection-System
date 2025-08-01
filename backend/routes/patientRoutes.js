import express from 'express';
import {
  addPatient,
  getAllPatients,
  getPatientById,
  updatePatient,
  deletePatient,
  searchPatientByName,
  findPatientByFullName
} from '../controllers/patientController.js';
import verifyToken from '../middleware/verifyToken.js';

const router = express.Router();

router.post('/', verifyToken, addPatient);
router.get('/', verifyToken, getAllPatients);
router.get('/search', verifyToken, searchPatientByName); 
router.get('/find', verifyToken, findPatientByFullName); 
router.get('/:id', verifyToken, getPatientById);
router.put('/:id', verifyToken, updatePatient);
router.delete('/:id', verifyToken, deletePatient);

export default router;
