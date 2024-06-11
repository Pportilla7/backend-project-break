const express = require('express');
const app = express();

const path = require('path'); 

const {router}=require('./routes/productRoutes.js');

const {dbConnection}=require('./config/db.js')

const {errorHandler}=require('./middleware/errorhandler.js')

require('dotenv').config();

app.use(express.json());

app.use(express.urlencoded({extended:true}));

//app.use(express.static(path.join(__dirname, 'img')));

app.set('view engine', 'pug');

app.set('views', './view');

dbConnection();

app.use('/', router);

app.use(errorHandler);

app.listen(process.env.port, ()=>{
    console.log(`Servidor escuchando en el puerto ${process.env.port}`);
    
})