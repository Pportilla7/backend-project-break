const express = require('express');
const app = express();

const {router}=require('./routes/productRoutes.js');

const {dbConnection}=require('./config/db.js')

require('dotenv').config();

app.use(express.json());

dbConnection();

app.use('/', router);

app.listen(process.env.port, ()=>{
    console.log(`Servidor escuchando en el puerto ${process.env.port}`);
    
})