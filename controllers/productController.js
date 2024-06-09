const Producto=require('../models/Product.js');

async function createProduct(producto){
    try{
        const producto_mongoose=new Producto(producto);
        await producto_mongoose.save();
        return producto_mongoose;
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

// function generarProductoHTML(producto) {
    
//     return `
//         <html>
//         <body>
//             <p><strong>Referencia:</strong> ${producto._id}</p>
//             <p><strong>Descripción:</strong> ${producto.descripcion}</p>
//             <p><strong>Categoría:</strong> ${producto.categoria}</p>
//             <p><strong>Precio:</strong> ${producto.precio}</p>
//             <p><strong>Tamaño:</strong> ${producto.talla}</p>
//             <img src="${producto.imagen}" alt="${producto.nombre}">

//         </body>
//         </html>
//     `;
// }


// function generarProductoHTMLConEnlace(producto) {
//     return `
//         <html>
//         <body>
//             <p><strong>Referencia:</strong> ${producto._id}</p>
//             <p><strong>Descripción:</strong> ${producto.descripcion}</p>
//             <p><strong>Categoría:</strong> ${producto.categoria}</p>
//             <p><strong>Precio:</strong> ${producto.precio}</p>
//             <p><strong>Tamaño:</strong> ${producto.talla}</p>
//             <a href="/products/${producto._id}">
//                 <img src="${producto.imagen}" alt="${producto.nombre}">
//             </a>
//         </body>
//         </html>
//     `;
// }


module.exports = {showProducts, showProductById, createProduct};