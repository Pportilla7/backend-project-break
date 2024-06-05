const mongoose = require('mongoose');


// Definir el esquema del producto
const productSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    categoria: { type: String, enum: ['camisetas', 'jerseys', 'zapatillas', 'pantalones'], required: true },
    genero: { type: String, enum: ['mujer', 'hombre', 'niño'], required: true },
    precio: { type: Number, required: true },
    taman: { type: String, enum: ['S', 'M', 'L', 'XL'], required: true },
    cantidad: { type: Number, required: true },
    imageUrl: { type: String }
});

const Producto = mongoose.model('Producto', productSchema);

module.exports = Producto;
