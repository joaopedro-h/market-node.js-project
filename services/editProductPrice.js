const connection = require("../database/connection");
const pause = require("../utils/pause");

async function editProductPrice(user,rl,productsMenu,internalSystemMenu,productId) {
    
    console.clear();
    console.log("📦 ============ EDITAR PREÇO ============ 📦\n");

    const newPrice = await rl.question(`💰 - Informe o novo preço do produto: `); /* "newPrice" recebe o novo preço informado pelo usuário. */

    if (isNaN(newPrice) || newPrice <= 0) { /* Verifica se o preço informado é numérico e maior que zero. */
        console.log("\nValor inválido! 🚫"); 
        await pause(rl);
        return productsMenu(user,rl,internalSystemMenu);                              
    }   
    
    const sqlEditPrice = /* Cria a query para atualizar o preço do produto. */
    `UPDATE products
     SET price = ?
    WHERE id = ?;`

    const valuesPrice = [ /* Valores que substituirão os "?" da query. */
        newPrice,
        productId
    ]

    const [result] = await connection.execute(sqlEditPrice,valuesPrice); /* Executa a atualização do preço do produto, ignorando os fields retornados pelo MySQL. */

    console.log("\nPreço alterado com sucesso! ✅");

    await pause(rl);
    return productsMenu(user,rl,internalSystemMenu); /* Retorna o usuário para o menu de produtos. */

}

module.exports = editProductPrice;