import express from 'express';
const router = express.Router();
import itemsController from '../controllers/itemsController';

router.get('/', itemsController.getItem);

router.post('/', itemsController.createItem);

module.exports = router;