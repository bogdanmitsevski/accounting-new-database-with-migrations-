import express from 'express';
const router = express.Router();
import Shift from '../controllers/shiftController';

router.post('/startShift', Shift.startShift);

router.post('/finishShift', Shift.finishShift);

router.get('/lastShift', Shift.getLastShift);

module.exports = router;