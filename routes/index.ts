import express from 'express';
const router = express.Router();

//items
router.use('/items', require('./items'));
router.use('/createItem', require('./items'));

//sell
router.use('/createSell',require('./sell'));

//shifts
router.use('/', require('./shift'));
router.use('/', require('./shift'));
router.use('/', require('./shift'));

//registration,login
router.use('/', require('./users'));
router.use('/', require('./users'));

export default router;
