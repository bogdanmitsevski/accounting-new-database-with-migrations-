import express from 'express';

const {Sells} = require('../models/models');
const {shifts} = require('../models/models');
const {Items} = require('../models/models');


class createSell {
    async newSell (req:express.Request, res:express.Response) {
        try{
                const SellActiveShift = await shifts.findOne({
                    where: {finishedAt: null},
                    order: [ [ 'createdAt', 'DESC' ]],
                });

                const ItemActiveSell = await Items.findOne({
                    order: [ [ 'createdAt', 'DESC' ]],
                });
                
        if(!SellActiveShift){
            res.status(400).json({message: 'You need to create new Shift at first'});
        }
        else if(!ItemActiveSell){
            res.status(400).json({message: 'You need to create new Item at first'});
        }
                const shiftId = SellActiveShift.id;
                const itemId = ItemActiveSell.id
                const price = ItemActiveSell.price;
                req.body = {itemId, price};
                
                const newSell = new Sells({shiftId, itemId, price});
                await newSell.save();
                res.json({message:'newSell was created'});

            }
        catch(e){
            console.log(e);
        }

    };
};

module.exports = new createSell();