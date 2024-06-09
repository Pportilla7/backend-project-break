const mongoose = require('mongoose');


// Definir el esquema del producto
const productSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    imagen: { type: String, required: true },
    categoria: { 
        type: String, 
        enum: ['Camisetas', 'Pantalones', 'Zapatos', 'Accesorios'],
        required: true 
    },
    talla: { 
        type: String, 
        enum: ['XS', 'S', 'M', 'L', 'XL'],
        required: true 
    },
    precio: { type: Number, required: true }
});

const Producto = mongoose.model('Producto', productSchema);

module.exports = Producto;



