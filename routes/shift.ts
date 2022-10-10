import express from 'express';
const router = express.Router();
import Shift from '../controllers/shiftController';
import authMiddleware from '../middleware/authMiddleware';

router.post('/startShift', authMiddleware, Shift.startShift);

router.post('/finishShift', authMiddleware, Shift.finishShift);

router.get('/lastShift', authMiddleware, Shift.getLastShift);

module.exports = router;