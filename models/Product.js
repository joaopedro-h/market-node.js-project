class Product {
    constructor(name, price, quantity, categoryId, supplierId) {
        
        this.name = name; /* Armazena o nome do produto. */
        this.price = price; /* Armazena o preço do produto. */
        this.quantity = quantity; /* Armazena a quantidade inicial do produto em estoque. */
        this.categoryId = categoryId; /* Armazena o ID da categoria do produto. */
        this.supplierId = supplierId; /* Armazena o ID do fornecedor do produto. */

    }
}

module.exports = Product;