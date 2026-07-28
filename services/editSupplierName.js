const connection = require("../database/connection");
const pause = require("../utils/pause");

async function editSupplierName(user,rl,suppliersMenu,internalSystemMenu,supplierId) {
    
    console.clear();
    console.log("🚚 ============ EDITAR NOME ============ 🚚\n");

    const newName = await rl.question(`🪪 - Informe o novo nome do fornecedor: `); /* "newName" recebe o novo nome informado pelo usuário. */

    if (!newName.trim()) { /* Verifica se o campo do nome foi preenchido. */
        console.log("\nCampo inválido! 🚫");
        await pause(rl);
        return suppliersMenu(user,rl,internalSystemMenu);
    }
    
    const sqlEditName = /* Cria a query para atualizar o nome do fornecedor. */
    `UPDATE suppliers
     SET company_name = ?
    WHERE id = ?;`

    const valuesName = [ /* Valores que substituirão os "?" da query. */
        newName,
        supplierId
    ]

    const [result] = await connection.execute(sqlEditName,valuesName); /* Executa a atualização do nome do fornecedor, ignorando os fields retornados pelo MySQL. */

    console.log("\nNome alterado com sucesso! ✅");

    await pause(rl);
    return suppliersMenu(user,rl,internalSystemMenu); /* Retorna o usuário para o menu de fornecedores. */

}

module.exports = editSupplierName;