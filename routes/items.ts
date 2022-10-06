import express from 'express';
const router = express.Router();
const itemsController = require('../controllers/itemsController');

router.get('/', itemsController.getItem);

router.post('/', itemsController.createItem);

module.exports = router;