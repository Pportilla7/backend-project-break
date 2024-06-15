const express= require('express');
const router=express.Router();

const {showProducts, showProductById,createProduct, showEditProduct, updateProduct, deleteProduct, showNewProduct, showFormulario}=require('../controllers/productController.js');
const {authUsuario, checkAuth, logOut}=require('../controllers/authController.js');

router.get('/products', showProducts);

router.get('/products/:id', showProductById);

router.get('/dashboard', checkAuth, showProducts);

router.get('/dashboard/new', checkAuth, showNewProduct);

router.get('/dashboard/:id', checkAuth, showProductById);

router.post('/dashboard', checkAuth, createProduct);

router.get('/dashboard/:id/edit', checkAuth, showEditProduct);

router.put('/dashboard/:id', checkAuth, updateProduct);

router.delete('/dashboard/:id/delete', checkAuth, deleteProduct);

router.get('/login', showFormulario);

router.post('/login', authUsuario, showProducts);

router.get('/logout', logOut);

module.exports={router};









