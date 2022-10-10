import express from 'express';
const router = express.Router();
import userController from '../controllers/userController';
import {check} from 'express-validator';
router.post('/registration',[
    check ('email', 'User email shoud not be empty').notEmpty(),
    check ('password', 'User password should be with min 4 signs').isLength({min:4})
], userController.registration);
router.post('/login', userController.login);

module.exports = router;