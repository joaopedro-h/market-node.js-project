const connection = require("../database/connection");
const pause = require("../utils/pause");

async function outOfStockProducts(user,rl,reportsMenu,internalSystemMenu) {
    
    console.clear();
    console.log("❌ ============ PRODUTOS SEM ESTOQUE ============ ❌\n");

    const sqlProducts = /* Cria a query para listar todos os produtos sem estoque. */
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
    WHERE quantity = 0 AND p.active = 1;`

    const [products] = await connection.execute(sqlProducts); /* Executa e armazena os rows em "products", ignorando os fields retornados pelo MySQL. */

    if (products.length === 0) { /* Verifica se existe pelo menos um produto sem estoque. */
        console.log("Nenhum produto sem estoque! 🚫");
        await pause(rl);
        return reportsMenu(user,rl,internalSystemMenu);
    }

    for (const product of products) { /* Percorre todos os produtos encontrados e exibe suas informações. */
        console.log(`🆔 : ${product.id}\n🪪  - Nome: ${product.product_name}\n💰 - Preço: ${product.price}\n🔢 - Quantidade: ${product.quantity}\n🏷️  - Categoria: ${product.category_name}\n🚚 - Fornecedor: ${product.company_name}\n`);
    }

    await pause(rl);
    return reportsMenu(user,rl,internalSystemMenu); /* Retorna o usuário para o menu de relatórios. */

}

module.exports = outOfStockProducts;