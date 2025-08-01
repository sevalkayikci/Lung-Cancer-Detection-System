import express from 'express';
import { getAllStatuses } from '../controllers/statusController.js';
import verifyToken from '../middleware/verifyToken.js';

const router = express.Router();

router.get('/', verifyToken, getAllStatuses);

export default router;
