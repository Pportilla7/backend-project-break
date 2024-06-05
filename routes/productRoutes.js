const express= require('express');
const router=express.Router();

const Producto=require('../models/Product.js');

router.post('/create', async (req, res)=>{
    console.log(Object.keys(req.body));
    try{
        if(Object.keys(req.body).length===0){
            res.status(400).send('Error al introducir el objeto: Esta vacío');
        }
        const producto=new Producto(req.body);
        await producto.save();
        res.status(200).json(producto);
    }
    catch{
        res.status(400).send('Error al introducir el objeto: Faltan campos');
    }
})

router.get('/read', async (req, res)=>{
    try{
        const productos=await Producto.find();
        if(productos.length===0){
            res.status(401).send('No hay productos en Stock');
        }
        else{
            res.status(200).json(productos);
        }
    }
    catch{
        res.status(401).send('Error al leer la base de datos');
    }
})

module.exports={router};