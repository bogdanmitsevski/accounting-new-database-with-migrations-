import express from 'express';
const router = express.Router();
import createSell from '../controllers/sellController';

router.post('/', createSell.newSell);

module.exports = router;