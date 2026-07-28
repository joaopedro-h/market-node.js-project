const connection = require("../database/connection");
const pause = require("../utils/pause");

async function editProductName(user,rl,productsMenu,internalSystemMenu,productId) {
    
    console.clear();
    console.log("📦 ============ EDITAR NOME ============ 📦\n");

    const newName = await rl.question(`🪪 - Informe o novo nome do produto: `); /* "newName" recebe o novo nome informado pelo usuário. */

    if (!newName.trim()) { /* Verifica se o campo do nome foi preenchido. */
        console.log("\nCampo inválido! 🚫");
        await pause(rl);
        return productsMenu(user,rl,internalSystemMenu);
    }
    
    const sqlEditName = /* Cria a query para atualizar o nome do produto. */
    `UPDATE products
     SET name = ?
    WHERE id = ?;`

    const valuesName = [ /* Valores que substituirão os "?" da query. */
        newName,
        productId
    ]

    const [result] = await connection.execute(sqlEditName,valuesName); /* Executa a atualização do nome do produto, ignorando os fields retornados pelo MySQL. */

    console.log("\nNome alterado com sucesso! ✅");

    await pause(rl);
    return productsMenu(user,rl,internalSystemMenu); /* Retorna o usuário para o menu de produtos. */

}

module.exports = editProductName;