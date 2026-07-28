const connection = require("../database/connection");
const pause = require("../utils/pause");

async function editSupplierPhone(user,rl,suppliersMenu,internalSystemMenu,supplierId) {
    
    console.clear();
    console.log("🚚 ============ EDITAR TELEFONE ============ 🚚\n");

    const newPhone = await rl.question(`📞 - Informe o novo telefone do fornecedor: `); /* "newPhone" recebe o novo telefone informado pelo usuário. */

    if (isNaN(newPhone) || newPhone <= 0) { /* Verifica se o telefone informado é numérico e maior que zero. */
        console.log("\nTelefone inválido! 🚫"); 
        await pause(rl);
        return suppliersMenu(user,rl,internalSystemMenu);                             
    }
    
    const sqlEditPhone = /* Cria a query para atualizar o telefone do fornecedor. */
    `UPDATE suppliers
     SET phone = ?
    WHERE id = ?;`

    const valuesPhone = [ /* Valores que substituirão os "?" da query. */
        newPhone,
        supplierId
    ]

    const [result] = await connection.execute(sqlEditPhone,valuesPhone); /* Executa a atualização do telefone do fornecedor, ignorando os fields retornados pelo MySQL. */

    console.log("\nTelefone alterado com sucesso! ✅");

    await pause(rl);
    return suppliersMenu(user,rl,internalSystemMenu); /* Retorna o usuário para o menu de fornecedores. */

}

module.exports = editSupplierPhone;