const connection = require("../database/connection");
const time = require("../utils/time");

async function saveProduct(product) {
    
    await time();
    
    const sqlSaveProduct =
    `INSERT INTO products (name,price,quantity,category_id,supplier_id)
    VALUES (?,?,?,?,?)`;

    const valuesProduct = [
        product.name,
        product.price,
        product.quantity,
        product.categoryId,
        product.supplierId
    ]

    const [result] = await connection.execute(sqlSaveProduct,valuesProduct);

    console.log("Produto cadastrado com sucesso! ✅");
    console.log("🆔: ", result.insertId);
    
}

module.exports = {saveProduct};