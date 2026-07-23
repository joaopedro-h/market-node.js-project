const connection = require("../database/connection");
const pause = require("../utils/pause");

async function editSupplierName(user,rl,suppliersMenu,internalSystemMenu,supplierId) {
    
    console.clear();
    console.log("🚚 ============ EDITAR NOME ============ 🚚\n");

    const newName = await rl.question(`🪪 - Informe o novo nome do fornecedor: `);

    if (!newName.trim()) {
        console.log("\nCampo inválido! 🚫");
        await pause(rl);
        return suppliersMenu(user,rl,internalSystemMenu);
    }
    
    const sqlEditName =
    `UPDATE suppliers
     SET company_name = ?
    WHERE id = ?;`

    const valuesName = [
        newName,
        supplierId
    ]

    const [result] = await connection.execute(sqlEditName,valuesName);

    console.log("\nNome alterado com sucesso! ✅");

    await pause(rl);
    return suppliersMenu(user,rl,internalSystemMenu);

}

module.exports = editSupplierName;