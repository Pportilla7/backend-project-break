const express= require('express');
const router=express.Router();

const {showProducts, showProductById,createProduct}=require('../controllers/productController.js')

const Producto=require('../models/Product.js');

router.get('/products', async(req, res)=>{
    try{
        const html=await showProducts(1);
        console.log(html);
        res.status(200).send(html)
    }
    catch{
        res.status(500).send('Error interno del servidor al crear el producto.');
    }
})

router.get('/products/:id', async(req, res)=>{
    try{
        const html=await showProductById(req.params.id);
        console.log(html);
        res.status(200).send(html)
    }
    catch{
        res.status(500).send('Error interno del servidor al crear el producto.');
    }
})

router.get('/dashboard', async(req, res)=>{
    try{
        const html=await showProduct(2);
        console.log(html);
        res.status(200).send(html)
    }
    catch{
        res.status(500).send('Error interno del servidor al crear el producto.');
    }
})

router.get('/dashboard/new', (req, res)=>{
    res.render('new');
})

router.get('/dashboard/:id', async(req, res)=>{
    try{
        const html=await showProductById(req.params.id);
        console.log(html);
        res.status(200).send(html)
    }
    catch{
        res.status(500).send('Error interno del servidor al crear el producto.');
    }
})

router.post('/dashboard', async(req, res)=>{
    const producto_obj = req.body;
    try {
        const obj = await createProduct(producto_obj);
        console.log(obj);
        res.redirect(303, `/dashboard/${obj._id}`);
    } catch (error) {
        res.status(500).send('Error interno del servidor al crear el producto.');
    }
})





// router.get('/products', async (req, res)=>{
//     try{
//         const productos=await Producto.find();
//         if(productos.length===0){
//             res.status(401).send('No hay productos en Stock');
//         }
//         else{
//             const productos=await Producto.find();
//             const html_arr=[];
//             productos.forEach(producto=>html_arr.push(generarProductoHTML(producto)))
//             const html=html_arr.join('')
//             console.log(html)
//             res.status(200).send(html);
//         }
//     }
//     catch{
//         res.status(401).send('Error al leer la base de datos');
//     }
// })

//Utilizaremos el ID que asigna la base de datos como el tipico nº de referencia que tienen los productos
// router.get('/products/:productId', async(req, res)=>{
//     try{
//         const {productId}=req.params;
//         const producto=await Producto.findById(productId);
//         const html=generarProductoHTML(producto);
//         res.status(200).send(html);
//     }
//     catch{
//         res.status(400).send('Error: No hay prenda con este numero de referencia');
//     }
// })



// router.put('/update/:id', async(req, res)=>{
//     try{
//         if(Object.keys(req.body).length===0){
//             res.status(400).send('Error al actualizar el objeto: Esta vacío');
//         }
//         const {id}=req.params;
//         const producto=await Producto.findByIdAndUpdate(id, req.body);
//         res.send(producto);
//     }
//     catch{
//         res.status(400).send('Error: No se ha podido actualizar la prenda');
//     }
// })

// router.delete('/delete', async(req, res)=>{
//     try{
//         await Producto.deleteMany()
//         res.status(200).send('Todas las prendas se ha borrado.')
//     }
//     catch{
//         res.status(400).send('Error: No se ha podido borra la base de datos');
//     }
// })

module.exports={router};