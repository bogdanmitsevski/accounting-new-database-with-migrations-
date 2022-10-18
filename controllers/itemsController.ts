import express from 'express';
import db from '../models';

class itemsController {
    async getItem (req:express.Request, res:express.Response) {
        try {
            const allItems = await db.Items.findAll();
            res.json(allItems);
        }
        catch(e){
            console.log(e);
        }
    };

    async createItem (req:express.Request, res:express.Response) {
        try {
            const{name, price} = req.body;
            const Item = await db.Items.findOne({where:{name}});
            if(Item) {
                return res.status(400).json({message:"Item was already created"});
            }
            else {
                const newItem = new db.Items({name, price});
                await newItem.save();
                res.json({message: `${name} was created`});
                }
            }
        catch(e) {
            console.log(e);
        }
    }

};

export default new itemsController();