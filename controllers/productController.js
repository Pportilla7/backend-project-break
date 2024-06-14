const Producto=require('../models/Product.js');
const mongoose = require('mongoose');


async function createProduct(req, res, next){
    try{
        const producto = req.body;
        const producto_mongoose=new Producto(producto);
        await producto_mongoose.save();
        res.redirect(`/dashboard`);
    }
    catch (error) {
        next(error);
    }
}

function showNewProduct(req, res, next){
    res.render('new', {title:'Nuevo producto'});
}

function showFormulario(req, res, next){
    res.render('login');
}

async function showProducts(req, res, next) {
    try {
        console.log('Estoy en showProducts desde ', req.path);

        const categoriaFiltro = req.query.categoria;
        console.log(categoriaFiltro)
        let productos_query;

        if (categoriaFiltro) {
            console.log('dentro del if porque hay categoria')
            productos_query = await Producto.find({ categoria: categoriaFiltro });
            console.log(productos_query);
        } else {
            productos_query = await Producto.find();
        }

        var Enlace = (req.path === '/products');
        var sesionIniciada=(req.path === '/login');

        var cantidadProductos = productos_query.length;
        console.log(cantidadProductos)
        var conjuntoBooleano = (cantidadProductos > 1);

        console.log(conjuntoBooleano);

        res.render('objeto', { productos: productos_query, conEnlace: Enlace, cantidad: cantidadProductos, conjunto: conjuntoBooleano, sesion:sesionIniciada });
    } catch (error) {
        next(error);
    }
}
async function showProductById(req ,res, next){
    try{
        console.log('Entró en showProductById');
        const id=req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send('ID inválido');
        }

        const id_obj=new mongoose.Types.ObjectId(id);
        const producto=await Producto.findById(id_obj);

        const isDashboardRoute = req.originalUrl.includes('/dashboard');

        var sesionIniciada=(req.path === '/login');
        console.log(producto);
        res.render('objeto', { productos: producto, conEnlace: false, cantidad: 1, conjunto: false, sesion:sesionIniciada, isDashboardRoute });
    }catch (error) {
        next(error);
    }
}

async function showEditProduct(req ,res, next){
    try{
        console.log('Entró en showEditProduct');
        const id=req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send('ID inválido');
        }
        const id_obj=new mongoose.Types.ObjectId(id);
        const producto=await Producto.findById(id_obj);
        res.render('new', {producto, title:'Edita objeto'})
    }catch (error) {
        next(error);
    }
}

async function updateProduct(req, res, next) {
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

        res.redirect(303, '/dashboard');
    } catch (error) {
        next(error);
    }
}

async function deleteProduct(req, res, next) {
    try {
        console.log('Entro en deleteProduct');
        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send('ID inválido');
        }

        const id_obj = new mongoose.Types.ObjectId(id);
        await Producto.findByIdAndDelete(id_obj);
        
        res.redirect(303, '/dashboard');
    } catch (error) {
        next(error);
    }
}


module.exports = {showProducts, showProductById, createProduct, showEditProduct, updateProduct, deleteProduct, showNewProduct, showFormulario};