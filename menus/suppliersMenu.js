const registerSupplier = require("../services/registerSupplier");
const pause = require("../utils/pause");

async function suppliersMenu(rl) {
    
    console.clear();
    console.log("🚚 ============ FORNECEDORES ============ 🚚\n");

    console.log("1. Cadastrar fornecedor ➕");
    console.log("2. Listar fornecedores 📃");
    console.log("3. Editar fornecedor 📝");
    console.log("4. Excluir fornecedor 🗑️");
    console.log("0. Voltar ↩️");
    
    let option = await rl.question("\n📌 - Selecione a opção que deseja: ");

        option = Number(option);

        switch (option) {

            case 1:
                registerSupplier(rl,suppliersMenu);
                break;
            
            case 2:
                
                break;

            case 3:
                
                break;

            case 4:
                
                break;

            case 0:
                console.log("\nVoltando.. ↩️");
                await pause(rl);
                return internalSystemMenu(rl);

            default:
                console.log("\nOpção inválida! 🚫");
                await pause(rl);
                return suppliersMenu(rl);
        }
}

module.exports = suppliersMenu;