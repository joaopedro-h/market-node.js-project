const registerSupplier = require("../services/registerSupplier");
const listSuppliers = require("../services/listSuppliers");
const supplierEditMenu = require("./supplierEditMenu")
const deleteSupplier = require("../services/deleteSupplier");
const pause = require("../utils/pause");

async function suppliersMenu(user,rl,internalSystemMenu) {
    
    console.clear();
    console.log("🚚 ============ FORNECEDORES ============ 🚚\n");

    console.log("1. Cadastrar fornecedor ➕");
    console.log("2. Listar fornecedores 📃");
    console.log("3. Editar fornecedor 📝");
    console.log("4. Excluir fornecedor 🗑️");
    console.log("0. Voltar ↩️");
    
    let option = Number(await rl.question("\n📌 - Selecione a opção que deseja: "));

        switch (option) {

            case 1:
                registerSupplier(user,rl,suppliersMenu,internalSystemMenu);
                break;
            
            case 2:
                listSuppliers(user,rl,suppliersMenu,internalSystemMenu);
                break;

            case 3:
                supplierEditMenu(user,rl,suppliersMenu,internalSystemMenu);
                break;

            case 4:
                deleteSupplier(user,rl,suppliersMenu,internalSystemMenu);
                break;

            case 0:
                console.log("\nVoltando.. ↩️");
                await pause(rl);
                return internalSystemMenu(user,rl);

            default:
                console.log("\nOpção inválida! 🚫");
                await pause(rl);
                return suppliersMenu(user,rl,internalSystemMenu);
        }
}

module.exports = suppliersMenu;