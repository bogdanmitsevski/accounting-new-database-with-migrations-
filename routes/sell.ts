import express from 'express';
const router = express.Router();
import createSell from '../controllers/sellController';
import authMiddleware from '../middleware/authMiddleware';

router.post('/', authMiddleware, createSell.newSell);

module.exports = router;