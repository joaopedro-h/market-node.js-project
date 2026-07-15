const connection = require("../database/connection");
const Movement = require("../models/Movement");
const {saveStockMovement} = require("./saveStockMovement");
const pause = require("../utils/pause");

async function stockEntry(user,rl,inventoryMovementsMenu,internalSystemMenu) {
    
    console.clear();
    console.log("➕ ============ ENTRADA DE PRODUTOS ============ ➕\n");

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
    ON p.supplier_id  = s.id;`

    const [products] = await connection.execute(sqlProducts);

    if (products.length === 0) {
        console.log("Nenhum produto cadastrado! 🚫");
        await pause(rl);
        return inventoryMovementsMenu(user,rl,internalSystemMenu);
    }

    for (const product of products) {
        console.log(`🆔 : ${product.id}\n🪪  - Nome: ${product.product_name}\n💰 - Preço: ${product.price}\n🔢 - Quantidade: ${product.quantity}\n🏷️  - Categoria: ${product.category_name}\n🚚 - Fornecedor: ${product.company_name}\n`);
    }

    const productId = Number(await rl.question("📌 - Selecione o ID do produto que deseja: "));

    const productExists = products.find(product => product.id === productId);

    if (!productExists) {
        console.log("\nProduto não encontrado! 🚫"); 
        await pause(rl);
        return inventoryMovementsMenu(user,rl,internalSystemMenu);      
    }

    const quantityToAdd = await rl.question(`\n🔢 - Informe quantas quantidades entraram: `)

    if (isNaN(quantityToAdd) || quantityToAdd <=0) {
        console.log("Quantidade inválida! 🚫");
        await pause(rl);
        return inventoryMovementsMenu(user,rl,internalSystemMenu);
    }

    const sqlEditQuantity =
    `UPDATE products
     SET quantity = quantity + ?
    WHERE id = ?`

    const valuesQuantity = [
        quantityToAdd,
        productId
    ]

    const movement = new Movement (
        "Entrada",
        quantityToAdd,
        productId,
        user.id
    )
    
    const conn = await connection.getConnection();

    try {
        
        await conn.beginTransaction();

        await conn.execute(sqlEditQuantity,valuesQuantity);

        await saveStockMovement(conn,movement);

        await conn.commit();

    } catch (error) {
        
        console.log("Erro na movimentação de estoque! 🚫");
        await conn.rollback();
        await pause(rl);
        return inventoryMovementsMenu(user,rl,internalSystemMenu);

    } finally {

        conn.release();
    }
    
    console.log("\nUnidades adicionadas com sucesso! ✅");
    await pause(rl);
    return inventoryMovementsMenu(user,rl,internalSystemMenu);
    
}

module.exports = stockEntry;