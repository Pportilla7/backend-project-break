const express= require('express');
const router=express.Router();

const {showProducts, showProductById,createProduct}=require('../controllers/productController.js')

const Producto=require('../models/Product.js');

router.get('/products', (req , res)=>{showProducts(req,res)});

router.get('/products/:id', (req , res)=>{showProductById(req,res)});

router.get('/dashboard', (req , res)=>{showProducts(req,res)});

router.get('/dashboard/new', (req, res)=>{
    res.render('new',{title:'Mi proyecto'});
})

router.get('/dashboard/:id', async(req, res)=>{
    try{
        const html=await showProductById(req.params.id);
        console.log(html);
        res.status(200).send(html)
    }
    catch{
        res.status(500).send('Error interno del servidor al crear el producto.');
    }
})

router.post('/dashboard', async(req, res)=>{
    const producto_obj = req.body;
    try {
        const obj = await createProduct(producto_obj);
        console.log(obj);
        res.redirect(303, `/dashboard/${obj._id}`);
    } catch (error) {
        res.status(500).send('Error interno del servidor al crear el producto.');
    }
})

module.exports={router};