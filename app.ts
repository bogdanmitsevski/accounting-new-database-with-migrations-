require('dotenv').config();
import express from 'express';
import sequelize from './db';
import root from './routes/index';

const app = express();
app.use(express.json());
app.use('/api', root);
const port = process.env.PORT || 3111;

const  start = async ()=> {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
    app.listen(port, ()=>{
        console.log(`Server is working on port ${port}`);
});
    }
    catch(e) {
        console.log(e);
    }
}

start();