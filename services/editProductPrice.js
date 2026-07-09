const connection = require("../database/connection");
const pause = require("../utils/pause");

async function editProductPrice(user,rl,productsMenu,internalSystemMenu,productId) {
    
    console.clear();
    console.log("📦 ============ EDITAR PREÇO ============ 📦\n");

    const newPrice = await rl.question(`💰 - Informe o novo preço do produto: `);

    if (isNaN(newPrice) || newPrice <= 0) {
        console.log("\nValor inválido! 🚫"); 
        await pause(rl);
        return productsMenu(user,rl,internalSystemMenu);                              
    }   
    
    const sqlEditPrice =
    `UPDATE products
     SET price = ?
    WHERE id = ?;`

    const valuesPrice = [
        newPrice,
        productId
    ]

    const [result] = await connection.execute(sqlEditPrice,valuesPrice);

    console.log("\nPreço alterado com sucesso! ✅");

    await pause(rl);
    return productsMenu(user,rl,internalSystemMenu);

}

module.exports = editProductPrice;