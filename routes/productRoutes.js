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

router.get('/dashboard/:id', (req , res)=>{showProductById(req,res)});

router.post('/dashboard', (req , res)=>{createProduct(req,res)});

module.exports={router};