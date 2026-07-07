class Product {
    constructor(name,price,quantity,categoryId,supplierId) {
        
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.categoryId = categoryId;
        this.supplierId = supplierId;

    }
}

module.exports = Product;