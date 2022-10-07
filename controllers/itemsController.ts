import express from 'express';
const {Items} = require('../models/models');
const {shifts} = require('../models/models');

class itemsController {
    async getItem (req:express.Request, res:express.Response) {
        try {
            const allItems = await Items.findAll();
            res.json(allItems);
        }
        catch(e){
            console.log(e);
        }
    };

    async createItem (req:express.Request, res:express.Response) {
        try {
            const SellActiveShift = await shifts.findOne ({
                where: {finishedAt: null},
                order: [ [ 'createdAt', 'DESC' ]],
            });
            if(!SellActiveShift) {
                res.status(400).json({message: 'You need to create new Shift at first'});
            }
            else {
                const{name, price} = req.body;
                const Item = await Items.findOne({where:{name}});
                if(Item) {
                    return res.status(400).json({message:"Item was already created"});
                }
                else {
                    const newItem = new Items({name, price});
                    await newItem.save();
                    res.json({message: `${name} was created`});
                }
            }
        }
        catch(e){
            console.log(e);
        }
    }

};

export default new itemsController();