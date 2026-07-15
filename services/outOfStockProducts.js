const connection = require("../database/connection");
const pause = require("../utils/pause");

async function outOfStockProducts(user,rl,reportsMenu,internalSystemMenu) {
    
    console.clear();
    console.log("❌ ============ PRODUTOS SEM ESTOQUE ============ ❌\n");

    const sqlProducts =
    `SELECT 
     p.id,
     p.name AS product_name,
     p.price,
     p.quantity,
     c.name AS category_name,
     s.company_name

     FROM products p

     JOIN categories c
     ON p.category_id  = c.id

     JOIN suppliers s
     ON p.supplier_id  = s.id
    WHERE quantity = 0;`

    const [products] = await connection.execute(sqlProducts);

    if (products.length === 0) {
        console.log("Nenhum produto sem estoque! 🚫");
        await pause(rl);
        return reportsMenu(user,rl,internalSystemMenu);
    }

    for (const product of products) {
        console.log(`🆔 : ${product.id}\n🪪  - Nome: ${product.product_name}\n💰 - Preço: ${product.price}\n🔢 - Quantidade: ${product.quantity}\n🏷️  - Categoria: ${product.category_name}\n🚚 - Fornecedor: ${product.company_name}\n`);
    }

    await pause(rl);
    return reportsMenu(user,rl,internalSystemMenu);

}

module.exports = outOfStockProducts;