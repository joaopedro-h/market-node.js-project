const connection = require("../database/connection");
const pause = require("../utils/pause");

async function editProductSupplier(user,rl,productsMenu,internalSystemMenu,productId) {
    
    console.clear();
    console.log("📦 ============ EDITAR FORNECEDOR ============ 📦\n");

    const sqlSuppliers =
    `SELECT 
     id,
     company_name,
     email,
     phone
    FROM suppliers;`

    const [suppliers] = await connection.execute(sqlSuppliers);

    if (suppliers.length === 0) {
        console.log("Nenhum fornecedor cadastrado! 🚫");
        await pause(rl);
        return productsMenu(user,rl,internalSystemMenu);
    }

    for (const supplier of suppliers) {
        console.log(`🆔 : ${supplier.id}\n🪪  - Nome: ${supplier.company_name}\n📩 - Email: ${supplier.email}\n📞 - Telefone: ${supplier.phone}\n`);
    }

    const newSupplier = await rl.question(`📌 - Selecione o ID do novo fornecedor que deseja: `);
    
    const sqlEditSupplier =
    `UPDATE products
     SET supplier_id = ?
    WHERE id = ?;`

    const valuesSupplier = [
        newSupplier,
        productId
    ]

    const [result] = await connection.execute(sqlEditSupplier,valuesSupplier);

    console.log("\nFornecedor alterado com sucesso! ✅");

    await pause(rl);
    return productsMenu(user,rl,internalSystemMenu);

}

module.exports = editProductSupplier;