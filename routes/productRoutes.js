const express= require('express');
const router=express.Router();

const {showProducts, showProductById,createProduct, showEditProduct, updateProduct, deleteProduct}=require('../controllers/productController.js');

router.get('/products', (req , res)=>{showProducts(req,res)});

router.get('/products/:id', (req , res)=>{showProductById(req,res)});

router.get('/dashboard', (req , res)=>{showProducts(req,res)});

router.get('/dashboard/new', (req, res)=>{
    res.render('new',{title:'Nuevo producto'});
})

router.get('/dashboard/:id', (req , res)=>{showProductById(req,res)});

router.post('/dashboard', (req , res)=>{createProduct(req,res)});

router.get('/dashboard/:id/edit', (req, res)=>{showEditProduct(req, res)});

router.put('/dashboard/:id', (req , res)=>{updateProduct(req,res)});

router.delete('/dashboard/:id/delete', (req , res)=>{deleteProduct(req,res)});

module.exports={router};