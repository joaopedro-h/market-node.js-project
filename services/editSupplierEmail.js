const connection = require("../database/connection");
const pause = require("../utils/pause");

async function editSupplierEmail(rl,suppliersMenu,supplierId) {
    
    console.clear();
    console.log("🚚 ============ EDITAR EMAIL ============ 🚚\n");

    const newEmail = await rl.question(`📩 - Informe o novo email do fornecedor: `);
    
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
    return suppliersMenu(rl);

}

module.exports = editSupplierEmail;