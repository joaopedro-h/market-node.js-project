const connection = require("../database/connection");
const time = require("../utils/time");
const pause = require("../utils/pause");

async function searchProduct(user,rl,productsMenu,internalSystemMenu) {
    
    console.clear();
    console.log("📦 ============ BUSCAR PRODUTO ============ 📦\n");

    const searchedProduct = await rl.question(`🔍 - Digite o nome do produto: `);
    
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

    WHERE p.name LIKE ? AND p.active = 1;`

    const [productResult] = await connection.execute(sqlProducts,[`%${searchedProduct}%`]);

    if (productResult.length === 0) {
        console.log("\nNenhum produto encontrado! 🚫");
        await pause(rl);
        return productsMenu(user,rl,internalSystemMenu);
    }

    await time();
    console.log("Produto(s) encontrado(s)! ✅\n");

    for (const product of productResult) {
        console.log(`🆔 : ${product.id}\n🪪  - Nome: ${product.product_name}\n💰 - Preço: ${product.price}\n🔢 - Quantidade: ${product.quantity}\n🏷️  - Categoria: ${product.category_name}\n🚚 - Fornecedor: ${product.company_name}\n`);
    }
    
    await pause(rl);
    return productsMenu(user,rl,internalSystemMenu);

}

module.exports = searchProduct;