import express from "express";
import ProductManager from './ProductManager.js'
const app = express(0);

const manager = new ProductManager()

app.get('/products', async (req, res) => {
    const limit = req.query.limit; // obtener el valor del query parameter limit
    const products = await manager.getProducts();
    if (limit) {
        res.send(products.slice(0, limit)); // devolver solo los primeros "limit" productos
    } else {
        res.send(products); // devolver todos los productos
    }
});

app.get('/products/:pid', async (req, res) => {
    const productId = req.params.pid; // obtener el id del producto solicitado
    const product = await manager.getProductById(productId);
    res.send(product); // devolver el producto solicitado
});

const server = app.listen(8080, () => console.log("Servidor activado."))