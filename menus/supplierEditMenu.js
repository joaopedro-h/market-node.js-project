const connection = require("../database/connection");
const editSupplierName = require("../services/editSupplierName");
const editSupplierEmail = require("../services/editSupplierEmail");
const editSupplierPhone = require("../services/editSupplierPhone");
const pause = require("../utils/pause");

async function supplierEditMenu(user,rl,suppliersMenu,internalSystemMenu) {
    
    console.clear();
    console.log("🚚 ============ EDITAR FORNECEDORES ============ 🚚\n");

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
        return suppliersMenu(user,rl,internalSystemMenu);
    }

    for (const supplier of suppliers) {
        console.log(`🆔 : ${supplier.id}\n🪪  - Nome: ${supplier.company_name}\n📩 - Email: ${supplier.email}\n📞 - Telefone: ${supplier.phone}\n`);
    }

    const supplierId = await rl.question("📌 - Selecione o ID do fornecedor que deseja editar: ");

    console.clear();
    console.log("1. Nome 🪪");
    console.log("2. Email 📩");
    console.log("3. Telefone 📞");
    console.log("0. Voltar ↩️");
    
    let option = await rl.question("\n📌 - Selecione a edição que deseja: ");
    
        option = Number(option);

        switch (option) {

            case 1:
                editSupplierName(user,rl,suppliersMenu,internalSystemMenu,supplierId);
                break;
            
            case 2:
                editSupplierEmail(user,rl,suppliersMenu,internalSystemMenu,supplierId);
                break;

            case 3:
                editSupplierPhone(user,rl,suppliersMenu,internalSystemMenu,supplierId);
                break;

            case 0:
                console.log("\nVoltando.. ↩️");
                await pause(rl);
                return suppliersMenu(user,rl,internalSystemMenu);

            default:
                console.log("\nOpção inválida! 🚫");
                await pause(rl);
                return supplierEditMenu(user,rl,suppliersMenu,internalSystemMenu);
        }
}

module.exports = supplierEditMenu;