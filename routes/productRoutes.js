const express= require('express');
const router=express.Router();

const {showProducts, showProductById,createProduct, showEditProduct, updateProduct, deleteProduct, showNewProduct, showFormulario}=require('../controllers/productController.js');
const {authUsuario}=require('../controllers/authController.js');

router.get('/products', (req , res)=>{showProducts(req,res)});

router.get('/products/:id', (req , res)=>{showProductById(req,res)});

router.get('/dashboard', (req , res)=>{showProducts(req,res)});

router.get('/dashboard/new', (req, res)=>{showNewProduct(req, res)})

router.get('/dashboard/:id', (req , res)=>{showProductById(req,res)});

router.post('/dashboard', (req , res)=>{createProduct(req,res)});

router.get('/dashboard/:id/edit', (req, res)=>{showEditProduct(req, res)});

router.put('/dashboard/:id', (req , res)=>{updateProduct(req,res)});

router.delete('/dashboard/:id/delete', (req , res)=>{deleteProduct(req,res)});

router.get('/login', (req , res)=>{showFormulario(req,res)});

router.post('/login', (req , res)=>{authUsuario(req,res)});

module.exports={router};