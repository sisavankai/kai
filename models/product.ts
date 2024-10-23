// defin and interface for products
interface Product {
    name: String
    description: String
    barcode: String
    image: String
    stock: Number
    price: Number
    category_id: Number
    user_id: Number
    status_id: Number
}

class Product {
    name: String    
    description: String 
    barcode: String 
    image: String   
    stock: Number   
    price: Number       
    category_id: Number
    user_id: Number
    status_id: Number
   
    // constructor
    constructor(product: Product) {
        this.name = product.name
        this.description = product.description
        this.barcode = product.barcode
        this.image = product.image
        this.stock = product.stock
        this.price = product.price
        this.category_id = product.category_id
        this.user_id = product.user_id
        this.status_id = product.status_id
    }
}