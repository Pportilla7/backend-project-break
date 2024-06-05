const express= require('express');
const router=express.Router();

const mongoose = require('mongoose');


const Producto=require('../models/Product.js');

router.post('/create', async (req, res)=>{
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

//Utilizaremos el ID que asigna la base de datos como el tipico nº de referencia que tienen los productos
router.get('/read/:id', async(req, res)=>{
    try{
        const {id}=req.params;
        const producto=await Producto.findById(id);
        res.send(producto);
    }
    catch{
        res.status(400).send('Error: No hay prenda con este numero de referencia');
    }
})

router.put('/update/:id', async(req, res)=>{
    try{
        if(Object.keys(req.body).length===0){
            res.status(400).send('Error al actualizar el objeto: Esta vacío');
        }
        const {id}=req.params;
        const producto=await Producto.findByIdAndUpdate(id, req.body);
        res.send(producto);
    }
    catch{
        res.status(400).send('Error: No se ha podido actualizar la prenda');
    }
})

module.exports={router};