import express from 'express';
import { addUser, getAllDoctors, deleteDoctor, updateDoctor } from '../controllers/userController.js';
import verifyToken from '../middleware/verifyToken.js';
import checkRole from '../middleware/checkRole.js';

const router = express.Router();



router.post('/users', verifyToken, checkRole(['admin']), addUser);
router.get('/users', verifyToken, checkRole(['admin']), getAllDoctors);
router.delete('/users/:id', verifyToken, checkRole(['admin']), deleteDoctor);
router.put('/users/:id', verifyToken, checkRole(['admin']), updateDoctor);

export default router;