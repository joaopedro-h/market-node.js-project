const connection = require("../database/connection");
const time = require("../utils/time");
const pause = require("../utils/pause");

async function deleteSupplier(user,rl,suppliersMenu,internalSystemMenu) {
    
    console.clear();
    console.log("🚚 ============ EXCLUIR FORNECEDOR ============ 🚚\n");

    const sqlSuppliers =
    `SELECT 
     id,
     company_name,
     email,
     phone
    FROM suppliers;`

    const [suppliers] = await connection.execute(sqlSuppliers);

    for (const supplier of suppliers) {
        console.log(`🆔 : ${supplier.id}\n🪪  - Nome: ${supplier.company_name}\n📩 - Email: ${supplier.email}\n📞 - Telefone: ${supplier.phone}\n`);
    }

    const selectSupplier = await rl.question("\n📌 - Selecione o ID do fornecedor que deseja excluir: ");

    const sqlDeleteSupplier =
    `DELETE FROM suppliers
    WHERE id = ?;`

    await connection.execute(sqlDeleteSupplier,[selectSupplier]);
    const [updatedSuppliers] = await connection.execute(sqlSuppliers);

    await time();
    console.log("Fornecedor excluído com sucesso! ✅\n");

    console.log("🚚 ============ FORNECEDORES ATUALIZADOS ============ 🚚\n");

    for (const supplier of updatedSuppliers) {
        console.log(`🆔 : ${supplier.id}\n🪪  - Nome: ${supplier.company_name}\n📩 - Email: ${supplier.email}\n📞 - Telefone: ${supplier.phone}\n`);
    }

    await pause(rl);
    return suppliersMenu(user,rl,internalSystemMenu);

}

module.exports = deleteSupplier;