const fs = require('fs');
const express = require('express');
const app = express();
const Contenedor = require('./claseContenedor.js');

const contenedor = new Contenedor('./productos.txt');
let products = [];

const PORT = process.env.port || app.listen(8080, async () => {
    console.log(`Server on`);

    try {
        let data = await contenedor.getAll();
        products = data; 
    } catch (error) {
        console.log('Error al leer los productos!', error);
    }

});

app.get('/productos', (req, res) => {
    if (products && products.length > 0) {
        res.json({
            products: products
        }) 
    } else {
        res.send('No existen productos')
    }
})

app.get('/productoRandom', (req, res) => {

    // CONSULTA: Es mejor resolver esta ruta con un if como hice o usar un try/catch?

    if (products && products.length > 0) {    
        let randomProduct = products[Math.floor(Math.random()*products.length)];
        res.json({
            product: randomProduct
        })
    } else {
        console.log('No existen productos!');
        res.send('No existen productos')
    }  
})