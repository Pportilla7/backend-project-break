const Producto=require('../models/Product.js');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

async function createProduct(req, res){
    try{
        const producto = req.body;
        const producto_mongoose=new Producto(producto);
        await producto_mongoose.save();
        res.redirect(`/dashboard/${producto_mongoose._id}`);
    }
    catch (error) {
        console.error('Error al guardar el producto:', error);
        throw new Error('Error al guardar el producto');
    }
}

async function showProducts(req, res){
    try{
        var Enlace=false;
        if(req.path==='/products'){
            Enlace=true;
        }
        const productos=await Producto.find();
        res.render('objeto', {productos, conEnlace:Enlace})
    }catch (error) {
        console.error('Error al mostrar el producto:', error);
        throw new Error('Error al mostrar el producto');
    }
}

async function showProductById(req ,res){
    try{
        const id=req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send('ID inválido');
        }
        const id_obj=new ObjectId(id);
        const producto=await Producto.findById(id_obj);
        res.render('objeto', {producto, conEnlace:false})
    }catch (error) {
        console.error('Error al mostrar el producto:', error);
        throw new Error('Error al mostrar el producto');
    }
}

async function showEditProduct(req ,res){
    try{
        const id=req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send('ID inválido');
        }
        const producto=await Producto.findById(id);
        console.log(producto)
        res.render('new', {producto, title:'Edita objeto'})
    }catch (error) {
        console.error('Error al mostrar el producto:', error);
        throw new Error('Error al mostrar el producto');
    }
}

async function updateProduct(req, res){
    try{
        console.log('Entro en updateProduct');
        const id=req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send('ID inválido');
        }
        const id_obj=new ObjectId(id);
        const producto = req.body;
        console.log(producto);
        const productoUpdated=await Producto.findByIdAndUpdate(id_obj, producto);
        console.log(productoUpdated);
        res.render('objeto', {productoUpdated, conEnlace:false});
    }catch(error){
        console.error('Error al mostrar el producto:', error);
        throw new Error('Error al mostrar el producto');
    }
}


module.exports = {showProducts, showProductById, createProduct, showEditProduct, updateProduct};