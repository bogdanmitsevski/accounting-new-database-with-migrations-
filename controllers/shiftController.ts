import express from 'express';
const {shifts} = require('../models/models');
const {Sells} = require('../models/models');
import moment from 'moment';


class Shift {
    
    async startShift (req:express.Request, res:express.Response) {
        try{
            const lastData = await shifts.findOne({
                where: {finishedAt : null},
                order: [ [ 'createdAt', 'DESC' ]],
            });
            if(lastData){
                res.status(400).json({message:'Close last shift'});
            }
            else {
            const startedAt = moment();
            const finishedAt = null;
            req.body = {startedAt, finishedAt};
            const newShift = new shifts({startedAt, finishedAt});
            await newShift.save();
            res.json({message:`New Shift with ID: ${newShift.id} was created`});
            }
        }
        catch(e){
            console.log(e);
        }
    };

    async finishShift (req:express.Request, res:express.Response) {
        try{
            const finishedAt = moment();
            const lastData = await shifts.findOne({
                order: [ [ 'createdAt', 'DESC' ]],
            });
            const id = lastData.id;
            req.body = {id};
            lastData.finishedAt = finishedAt;
            await lastData.save({where:{id:lastData.id}});
            res.json({message:`FinishedAt to ID: ${lastData.id} was added`});
        }
        catch(e){
            console.log(e);
        }
    };

    async getLastShift (req:express.Request, res:express.Response) {
        try{

                const lastData = await shifts.findOne({
                    order: [ [ 'createdAt', 'DESC' ]],
                });
             if(!lastData){
                 res.status(400).json({message:'You need to create Shift at first'});
                }
                else {
            const lastShift = await shifts.findOne({
                order: [ [ 'createdAt', 'DESC' ]]
            });
            const lastSell = await Sells.findAll({
                where: {shiftId:lastShift.id},
                order: [ [ 'createdAt', 'DESC' ]]
            });
            res.json(lastSell);
        }
    }
        catch(e){
            console.log(e);
        }
    };

};

export default new Shift();