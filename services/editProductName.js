const connection = require("../database/connection");
const pause = require("../utils/pause");

async function editProductName(user,rl,productsMenu,internalSystemMenu,productId) {
    
    console.clear();
    console.log("📦 ============ EDITAR NOME ============ 📦\n");

    const newName = await rl.question(`🪪 - Informe o novo nome do produto: `);
    
    const sqlEditName =
    `UPDATE products
     SET name = ?
    WHERE id = ?;`

    const valuesName = [
        newName,
        productId
    ]

    const [result] = await connection.execute(sqlEditName,valuesName);

    console.log("\nNome alterado com sucesso! ✅");

    await pause(rl);
    return productsMenu(user,rl,internalSystemMenu);

}

module.exports = editProductName;