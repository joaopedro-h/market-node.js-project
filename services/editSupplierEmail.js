const connection = require("../database/connection");
const validateEmailSupplier = require("../validations/validateEmailSupplier");
const pause = require("../utils/pause");

async function editSupplierEmail(user,rl,suppliersMenu,internalSystemMenu,supplierId) {
    
    console.clear();
    console.log("🚚 ============ EDITAR EMAIL ============ 🚚\n");

    const newEmail = await rl.question(`📩 - Informe o novo email do fornecedor: `);

    const emailAlreadyExists = await validateEmailSupplier(newEmail);

    if (emailAlreadyExists) {
        console.log("\nEmail já em uso! 🚫");
        await pause(rl);
        return suppliersMenu(rl);
    }

    const sqlEditEmail =
    `UPDATE suppliers
     SET email = ?
    WHERE id = ?;`

    const valuesEmail = [
        newEmail,
        supplierId
    ]

    const [result] = await connection.execute(sqlEditEmail,valuesEmail);

    console.log("\nEmail alterado com sucesso! ✅");

    await pause(rl);
    return suppliersMenu(user,rl,internalSystemMenu);;

}

module.exports = editSupplierEmail;