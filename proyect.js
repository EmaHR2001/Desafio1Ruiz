import fs from 'fs';

class ProductManager {
    constructor() {
        this.path = 'productos.json';
        this.currentId = 1;

        this.getProducts().then((productos) => {
            if (productos.length > 0) {
                this.currentId = productos[productos.length - 1].id + 1;
            }
        });
    }

    async addProduct(product) {
        let productos = await this.getProducts()
        const requiredFields = ['title', 'description', 'price', 'thumbnail', 'code', 'stock'];

        // Validar que todos los campos requeridos estén presentes
        for (const field of requiredFields) {
            if (!product[field]) {
                console.error(`El campo ${field} es obligatorio`);
                return;
            }
        }

        // Validar que no se repita el código del producto
        const existingProduct = productos.find((p) => p.code === product.code);
        if (existingProduct) {
            console.error(`El producto con el código ${product.code} ya existe`);
            return;
        }

        // Agregar el producto al arreglo y asignarle un id autoincrementable
        const newProduct = { ...product, id: this.currentId };
        productos.push(newProduct);
        this.currentId++;
        await fs.promises.writeFile(this.path, JSON.stringify(productos))

        console.log('Producto agregado:', newProduct);
    }

    async getProducts() {
        let archivo = await fs.promises.readFile(this.path)
        let productos = JSON.parse(archivo)
        return productos
    }

    async getProductById(id) {
        let productos = await this.getProducts()
        let productoEncontrado = productos.find(producto => producto.id == id)
        return productoEncontrado ? productoEncontrado : "No encontrado";
    }

    async updateProduct(id, updatedProduct) {
        let productos = await this.getProducts()
        let index = productos.findIndex(producto => producto.id == id)
        if (index == -1) {
            console.error(`El producto con el id ${id} no existe`)
            return
        }
        productos[index] = { ...productos[index], ...updatedProduct }
        await fs.promises.writeFile(this.path, JSON.stringify(productos))
        console.log(`Producto con el id ${id} actualizado`)
    }

    async deleteProduct(id) {
        let productos = await this.getProducts()
        let index = productos.findIndex(producto => producto.id == id)
        if (index == -1) {
            console.error(`El producto con el id ${id} no existe`)
            return
        }
        productos.splice(index, 1)
        await fs.promises.writeFile(this.path, JSON.stringify(productos))
        console.log(`Producto con el id ${id} eliminado`)
    }
}

const productManager = new ProductManager();
await productManager.updateProduct(2, { price: 30 });

// Productos agregados correctamente.
await productManager.addProduct({
    title: 'Producto 1',
    description: 'Descripción del producto 1',
    price: 10.99,
    thumbnail: 'ruta/de/imagen',
    code: 'ABC123',
    stock: 5,
});
await productManager.addProduct({
    title: 'Producto 2',
    description: 'Descripción del producto 2',
    price: 19.99,
    thumbnail: 'ruta/de/imagen',
    code: 'DEF456',
    stock: 10,
});
await productManager.addProduct({
    title: 'Producto 3',
    description: 'Descripción del producto 3',
    price: 32.99,
    thumbnail: 'ruta/de/imagen',
    code: 'DED496',
    stock: 90,
});

// Ejemplo de code igual.
await productManager.addProduct({
    title: 'Producto 4',
    description: 'Descripción del producto 4',
    price: 15.99,
    thumbnail: 'ruta/de/imagen',
    code: 'ABC123',
    stock: 12,
});

// Ejemplo de propiedad faltante.
await productManager.addProduct({
    title: 'Producto 5',
    description: 'Descripción del producto 5',
    price: 600,
    code: 'OUD132',
    stock: 22,
});

// Lista
console.log(await productManager.getProducts());

// Ejemplo de encontrado.
await productManager.getProductById(1);

//Ejemplo de no encontrado.
await productManager.getProductById(4);

//Modifica un producto.
await productManager.updateProduct(2, { price: 30 });

//Elimina un producto.
await productManager.deleteProduct(3); // elimina el producto con id = 3

// Nueva lista.
console.log(await productManager.getProducts());