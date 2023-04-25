class ProductManager {
    constructor(products = []) {
        this.products = products;
        this.incrementId = 0;
    }

    addProduct(title, description, price, thumbnail, code, stock) {

        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.log('Todos los campos son obligatorios.');
            return;
        }
        if (this.products.some((p) => p.code === code)) {
            console.log('El código ya está en uso.');
            return;
        }

        const product = {
            id: ++this.incrementId,
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
        };
        this.products.push(product);
        return product;
    }

    getProducts() {
        console.log(this.products);
    }

    getProductById(id) {
        const product = this.products.find((p) => p.id === id);
        if (!product) {
            console.error('Producto no encontrado.');
        } else {
            console.log('Producto encontrado:', product);
        }
    }
}

const productManager = new ProductManager();
//Productos agregados correctamente.
productManager.addProduct('producto 1', 'descripción', 10.40, 'ruta/de/imagen', 'ABC123', 5);
productManager.addProduct('producto 2', 'descripción', 19.50, 'ruta/de/imagen', 'DEF456', 10);

//Ejemplo de code igual.
productManager.addProduct('producto 3', 'descripción', 20.82, 'ruta/de/imagen', 'DEF456', 20);
//Ejemplo de propiedad faltante.
productManager.addProduct('producto 4', 'descripción', 12.79, 'ruta/de/imagen', 'DAF026');

//Lista.
productManager.getProducts()
//Ejemplo de encontrado.
productManager.getProductById(1);
//Ejemplo de no encontrado.
productManager.getProductById(4);

//NOTA: No sabia si había que tener imágenes en el proyecto ya que por lo que entendí por ahora ejecutaríamos el programa por consola.