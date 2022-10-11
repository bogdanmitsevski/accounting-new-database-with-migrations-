import express from 'express';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {users} = require ('../models/models');
import { validationResult } from 'express-validator';
const generateJwt = (id: any, email: any) => {
    return jwt.sign(
      {id, email}, 
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
        );
}

class userController {
    async registration(req: express.Request, res: express.Response) {
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            res.status(400).json({message:'Registration Error',errors});
        }
        else {
            const {email, password} = req.body;
            const isUserRegistered = await users.findOne({where:{email}});
        if(isUserRegistered) {
            res.status(400).json({message:`User with ${email} was already registered`})
        }
        else {
            console.log(isUserRegistered, email, password);
            const hashPasword = await bcrypt.hash(password, 8);
            const newUser = await users.create({email, password:hashPasword});
            const token = generateJwt(newUser.id, newUser.email);
            await newUser.save();
            res.json({message:`New User was succesfully created with token ${token}`});
        }
        }
    
    }
    catch(e) {
        console.log(e);
    }
    }

    async login(req:express.Request, res: express.Response) {
        
    try {
    const {email, password} = req.body;
        const User = await users.findOne({where:{email}});
        if(!User) {
            res.status(400).json({message:`User with this email ${email} does not exist`});
        }
        else {
            let comparePassword = bcrypt.compareSync(password, User.password);
            if(!comparePassword) {
                res.status(400).json({message: 'Invalid Password'});
            }
            const token = generateJwt(User.id, User.email);
            return res.json({message:`User was succesfully logined with token ${token}`});
        }
    }   
    
    catch(e) {
    console.log(e)
    }
    }
   
}

export default new userController;
