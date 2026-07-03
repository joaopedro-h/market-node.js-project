const connection = require("../database/connection");
const pause = require("../utils/pause");

async function editSupplierPhone(user,rl,suppliersMenu,internalSystemMenu,supplierId) {
    
    console.clear();
    console.log("🚚 ============ EDITAR TELEFONE ============ 🚚\n");

    const newPhone = await rl.question(`📞 - Informe o novo telefone do fornecedor: `);
    
    const sqlEditPhone =
    `UPDATE suppliers
     SET phone = ?
    WHERE id = ?;`

    const valuesPhone = [
        newPhone,
        supplierId
    ]

    const [result] = await connection.execute(sqlEditPhone,valuesPhone);

    console.log("\nTelefone alterado com sucesso! ✅");

    await pause(rl);
    return suppliersMenu(user,rl,internalSystemMenu);

}

module.exports = editSupplierPhone;