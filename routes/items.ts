import express from 'express';
const router = express.Router();
import itemsController from '../controllers/itemsController';
import authMiddleware from '../middleware/authMiddleware';

router.get('/', authMiddleware, itemsController.getItem);

router.post('/', authMiddleware, itemsController.createItem);

module.exports = router;