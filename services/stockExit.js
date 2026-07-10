const connection = require("../database/connection");
const Movement = require("../models/Movement");
const {saveStockMovement} = require("./saveStockMovement");
const pause = require("../utils/pause");

async function stockEntry(user,rl,inventoryMovementsMenu,internalSystemMenu) {
    
    console.clear();
    console.log("➖ ============ SAÍDA DE PRODUTOS ============ ➖\n");

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

    const productId = await rl.question("📌 - Selecione o ID do produto que deseja: ");

    const quantityToRemove  = await rl.question(`\n🔢 - Informe quantas quantidades saíram: `)

    const sqlEditQuantity =
    `UPDATE products
     SET quantity = quantity - ?
    WHERE id = ?`

    const valuesQuantity = [
        quantityToRemove ,
        productId
    ]

    await connection.execute(sqlEditQuantity,valuesQuantity);

    const movement = new Movement (
        "Saída",
        quantityToRemove ,
        productId,
        user.id
    )

    await saveStockMovement(movement);
    console.log("Unidades removidas com sucesso! ✅");
    await pause(rl);
    return inventoryMovementsMenu(user,rl,internalSystemMenu);

}

module.exports = stockEntry;