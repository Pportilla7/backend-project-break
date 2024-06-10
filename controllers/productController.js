const Producto=require('../models/Product.js');

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
        const id=req.params.id
        const producto=await Producto.findById(id);
        res.render('objeto', {producto, conEnlace:false})
    }catch (error) {
        console.error('Error al mostrar el producto:', error);
        throw new Error('Error al mostrar el producto');
    }
}


module.exports = {showProducts, showProductById, createProduct};