const connection = require("../database/connection");
const validateEmailSupplier = require("../validations/validateEmailSupplier");
const pause = require("../utils/pause");

async function editSupplierEmail(user,rl,suppliersMenu,internalSystemMenu,supplierId) {
    
    console.clear();
    console.log("🚚 ============ EDITAR EMAIL ============ 🚚\n");

    const newEmail = await rl.question(`📩 - Informe o novo email do fornecedor: `); /* "newEmail" recebe o novo email informado pelo usuário. */

    if (!newEmail.trim()) { /* Verifica se o campo do email foi preenchido. */
        console.log("\nCampo inválido! 🚫");
        await pause(rl);
        return suppliersMenu(user,rl,internalSystemMenu);
    }

    const emailAlreadyExists = await validateEmailSupplier(newEmail); /* Verifica se o email informado já está cadastrado. */

    if (emailAlreadyExists) {
        console.log("\nEmail já em uso! 🚫");
        await pause(rl);
        return suppliersMenu(user,rl,internalSystemMenu);
    }

    const sqlEditEmail = /* Cria a query para atualizar o email do fornecedor. */
    `UPDATE suppliers
     SET email = ?
    WHERE id = ?;`

    const valuesEmail = [ /* Valores que substituirão os "?" da query. */
        newEmail,
        supplierId
    ]

    const [result] = await connection.execute(sqlEditEmail,valuesEmail); /* Executa a atualização do email do fornecedor, ignorando os fields retornados pelo MySQL. */

    console.log("\nEmail alterado com sucesso! ✅");

    await pause(rl);
    return suppliersMenu(user,rl,internalSystemMenu); /* Retorna o usuário para o menu de fornecedores. */

}

module.exports = editSupplierEmail;