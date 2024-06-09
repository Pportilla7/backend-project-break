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

async function showProducts(opt){
    try{
        const productos=await Producto.find();
        const html_arr=[];
        if(opt===1){
            productos.forEach(producto=>html_arr.push(generarProductoHTMLConEnlace(producto)))
        }
        else{
            productos.forEach(producto=>html_arr.push(generarProductoHTML(producto)))
        }
        const html=html_arr.join('')
        console.log(html)
        return html;
    }catch (error) {
        console.error('Error al mostrar el producto:', error);
        throw new Error('Error al mostrar el producto');
    }
}

async function showProductById(id){
    try{
        const producto=await Producto.findById(id);
        console.log(producto);
        const html=generarProductoHTML(producto);
        console.log(html);
        return html;
    }catch (error) {
        console.error('Error al mostrar el producto:', error);
        throw new Error('Error al mostrar el producto');
    }
}

function generarProductoHTML(producto) {
    
    return `
        <html>
        <body>
            <p><strong>Referencia:</strong> ${producto._id}</p>
            <p><strong>Descripción:</strong> ${producto.descripcion}</p>
            <p><strong>Categoría:</strong> ${producto.categoria}</p>
            <p><strong>Precio:</strong> ${producto.precio}</p>
            <p><strong>Tamaño:</strong> ${producto.talla}</p>
            <img src="${producto.imagen}" alt="${producto.nombre}">

        </body>
        </html>
    `;
}


function generarProductoHTMLConEnlace(producto) {
    return `
        <html>
        <body>
            <p><strong>Referencia:</strong> ${producto._id}</p>
            <p><strong>Descripción:</strong> ${producto.descripcion}</p>
            <p><strong>Categoría:</strong> ${producto.categoria}</p>
            <p><strong>Precio:</strong> ${producto.precio}</p>
            <p><strong>Tamaño:</strong> ${producto.talla}</p>
            <a href="/products/${producto._id}">
                <img src="${producto.imagen}" alt="${producto.nombre}">
            </a>
        </body>
        </html>
    `;
}


module.exports = {showProducts, showProductById, createProduct};