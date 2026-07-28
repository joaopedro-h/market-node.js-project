const connection = require("../database/connection");
const Movement = require("../models/Movement");
const {saveStockMovement} = require("./saveStockMovement");
const pause = require("../utils/pause");

async function stockEntry(user,rl,inventoryMovementsMenu,internalSystemMenu) {
    
    console.clear();
    console.log("➕ ============ ENTRADA DE PRODUTOS ============ ➕\n");

    const sqlProducts = /* Cria a query para listar todos os produtos ativos. */
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

    WHERE p.active = 1;`

    const [products] = await connection.execute(sqlProducts); /* Executa e armazena os rows em "products", ignorando os fields retornados pelo MySQL. */

    if (products.length === 0) { /* Verifica se existe pelo menos um produto cadastrado. */
        console.log("Nenhum produto cadastrado! 🚫");
        await pause(rl);
        return inventoryMovementsMenu(user,rl,internalSystemMenu);
    }

    for (const product of products) { /* Percorre todos os produtos e exibe suas informações. */
        console.log(`🆔 : ${product.id}\n🪪  - Nome: ${product.product_name}\n💰 - Preço: ${product.price}\n🔢 - Quantidade: ${product.quantity}\n🏷️  - Categoria: ${product.category_name}\n🚚 - Fornecedor: ${product.company_name}\n`);
    }

    const productId = Number(await rl.question("📌 - Selecione o ID do produto que deseja: "));

    const productExists = products.find(product => product.id === productId); /* Verifica se o produto informado existe. */

    if (!productExists) {
        console.log("\nProduto não encontrado! 🚫"); 
        await pause(rl);
        return inventoryMovementsMenu(user,rl,internalSystemMenu);      
    }

    const quantityToAdd = await rl.question(`\n🔢 - Informe quantas quantidades entraram: `)

    if (isNaN(quantityToAdd) || quantityToAdd <=0) { /* Valida se a quantidade informada é válida. */
        console.log("\nQuantidade inválida! 🚫");
        await pause(rl);
        return inventoryMovementsMenu(user,rl,internalSystemMenu);
    }

    const sqlEditQuantity = /* Cria a query para adicionar a quantidade ao estoque. */
    `UPDATE products
     SET quantity = quantity + ?
    WHERE id = ?`

    const valuesQuantity = [
        quantityToAdd,
        productId
    ]

    const movement = new Movement ( /* Cria um objeto contendo os dados da movimentação de entrada. */
        "Entrada",
        quantityToAdd,
        productId,
        user.id
    )
    
    const conn = await connection.getConnection(); /* Obtém uma conexão exclusiva para controlar a transação. */

    try {
        
        await conn.beginTransaction(); /* Inicia a transação. */

        await conn.execute(sqlEditQuantity,valuesQuantity); /* Atualiza a quantidade do produto. */

        await saveStockMovement(conn,movement); /* Registra a movimentação no histórico. */

        await conn.commit(); /* Confirma todas as alterações realizadas. */

    } catch (error) {
        
        console.log("\nErro na movimentação de estoque! 🚫");
        await conn.rollback(); /* Desfaz todas as alterações em caso de erro. */
        await pause(rl);
        return inventoryMovementsMenu(user,rl,internalSystemMenu);

    } finally {

        conn.release(); /* Libera a conexão para o pool. */
    }
    
    console.log("\nUnidades adicionadas com sucesso! ✅");
    await pause(rl);
    return inventoryMovementsMenu(user,rl,internalSystemMenu); /* Retorna o usuário para o menu de movimentações. */
    
}

module.exports = stockEntry;