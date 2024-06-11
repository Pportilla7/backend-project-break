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
        next(error);
    }
}

function showNewProduct(req, res){
    res.render('new',{title:'Nuevo producto'});
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
        next(error);
    }
}

async function showProductById(req ,res){
    try{
        console.log('Entró en showProductById');
        const id=req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send('ID inválido');
        }
        const id_obj=new ObjectId(id);
        const producto=await Producto.findById(id_obj);
        res.render('objeto', {producto, conEnlace:false})
    }catch (error) {
        next(error);
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
        next(error);
    }
}

async function updateProduct(req, res) {
    try {
        console.log('Entró en updateProduct');
        const id = req.params.id;

        const producto = req.body;
        console.log(producto);

        const productoUpdated = await Producto.findByIdAndUpdate(id, producto, { new: true });
        
        if (!productoUpdated) {
            return res.status(404).send('Producto no encontrado');
        }

        console.log(productoUpdated);

        res.render('objeto', {productoUpdated, conEnlace: false });
    } catch (error) {
        next(error);
    }
}

async function deleteProduct(req, res) {
    try {
        console.log('Entro en deleteProduct');
        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send('ID inválido');
        }

        const id_obj = new mongoose.Types.ObjectId(id);
        await Producto.findByIdAndDelete(id_obj);
        
        res.redirect('/dashboard');
    } catch (error) {
        next(error);
    }
}


module.exports = {showProducts, showProductById, createProduct, showEditProduct, updateProduct, deleteProduct, showNewProduct};