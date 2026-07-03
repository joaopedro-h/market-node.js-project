const connection = require("../database/connection");
const pause = require("../utils/pause");

async function listSuppliers(user,rl,suppliersMenu,internalSystemMenu) {
    
    console.clear();
    console.log("🚚 ============ FORNECEDORES CADASTRADOS ============ 🚚\n");

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

    await pause(rl);
    return suppliersMenu(user,rl,internalSystemMenu);

}

module.exports = listSuppliers;