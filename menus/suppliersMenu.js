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
    
    let option = Number(await rl.question("\n📌 - Selecione a opção que deseja: ")); /* "option" recebe a opção escolhida pelo usuário e converte a string em número. */

        switch (option) {

            case 1:
                registerSupplier(user,rl,suppliersMenu,internalSystemMenu); /* Redireciona o usuário para a função de cadastro de fornecedores. */
                break;
            
            case 2:
                listSuppliers(user,rl,suppliersMenu,internalSystemMenu); /* Redireciona o usuário para a função de listagem de fornecedores. */
                break;

            case 3:
                supplierEditMenu(user,rl,suppliersMenu,internalSystemMenu); /* Redireciona o usuário para o menu de edição de fornecedores. */
                break;

            case 4:
                deleteSupplier(user,rl,suppliersMenu,internalSystemMenu); /* Redireciona o usuário para a função de exclusão de fornecedores. */
                break;

            case 0:
                console.log("\nVoltando.. ↩️");
                await pause(rl);
                return internalSystemMenu(user,rl); /* Retorna o usuário para o menu principal do sistema. */

            default:
                console.log("\nOpção inválida! 🚫"); /* Verifica se a opção escolhida não existe no menu. */
                await pause(rl);
                return suppliersMenu(user,rl,internalSystemMenu);
        }
}

module.exports = suppliersMenu;