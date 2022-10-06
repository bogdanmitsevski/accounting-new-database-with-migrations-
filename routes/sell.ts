import express from 'express';
const router = express.Router();
const createSell = require('../controllers/sellController')

router.post('/', createSell.newSell);

module.exports = router;