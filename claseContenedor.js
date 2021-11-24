const fs = require('fs');

class Contenedor {

    constructor(fileName) {
        this.fileName = fileName
    }

    async read() {
        try {
            const products = await fs.promises.readFile(this.fileName, 'utf-8')  
            return JSON.parse(products)
        } catch (error) {
            console.log('Error al leer los productos!', error);
            return null
        }
    }

    async getAll() {
        try {
            const products = await this.read()
            console.log('Lista de productos: ', products);  
            return products
        } catch (error) {
            console.log('Error al traer los productos!', error);
            return null
        }
    }

    async getById(id) {
        try {
            const products = await this.read()
            const product = products.find(product => product.id === id)
            if (product) {
                console.log('El producto elegido es: ', product)
                return product
            } else {
                console.log('El producto no existe')
                return null
            }
        } catch (error) {
            console.log('Error al leer la lista de productos', error);
        }
    }

    async save(product) {

        try {
            let products = await this.read()    
            if (products.length > 0) {
                product.id = products[products.length -1].id + 1;
                products.push(product)
                products = JSON.stringify(products, null, 2)
                await fs.promises.writeFile(this.fileName, products)
                console.log('Producto agregado a la lista de productos'); 
                return product.id            
            } else {
                let products = []
                products.push({title:product.title, price:product.price, thumbnail:product.thumbnail, id:1})
                products = JSON.stringify(products, null, 2)
                await fs.promises.writeFile(this.fileName, products)
                console.log('Primer producto creado exitosamente');
            }
        } catch (error) {
            console.log('Error al traer el array de productos', error)
        }

    }  

    async deleteById(id) {
        try {
            let products = await this.read() 
            let productToDelete = products.filter(product => product.id == id)          
            if (productToDelete.length > 0) {
                products = products.filter(product => product.id !== id)
                products = JSON.stringify(products, null, 2)
                await fs.promises.writeFile(this.fileName, products)
                console.log('Producto borrado exitosamente')     
            } else {
                console.log('No existe el producto');
            }
                       
        } catch (error) {
            console.log('Error al borrar el producto', error);
        }
    }
    
    async deleteAll() {

        let emptyArray = []
        emptyArray = JSON.stringify(emptyArray)

        try {
            await fs.promises.writeFile(this.fileName, emptyArray)
            console.log('Lista de productos borrada exitosamente')
        } catch (error) {
            console.log('Error al borrar todos los productos', error);
        }
    }

}
 
module.exports = Contenedor