const connection = require("../database/connection");
const time = require("../utils/time");

async function saveProduct(product) {
    
    await time(); /* Aguarda alguns segundos antes de continuar a execução. */
    
    const sqlSaveProduct = /* Cria a query para cadastrar um novo produto. */
    `INSERT INTO products (name,price,quantity,category_id,supplier_id)
    VALUES (?,?,?,?,?)`;

    const valuesProduct = [ /* Valores que substituirão os "?" da query, recebendo as informações do objeto "product". */
        product.name,
        product.price,
        product.quantity,
        product.categoryId,
        product.supplierId
    ]

    const [result] = await connection.execute(sqlSaveProduct,valuesProduct); /* Executa e armazena os rows em "result", ignorando os fields retornados pelo MySQL. */

    console.log("Produto cadastrado com sucesso! ✅");
    console.log("🆔: ", result.insertId); /* Exibe o ID gerado automaticamente pelo banco de dados. */
    
}

module.exports = {saveProduct};