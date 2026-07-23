const registerCategory = require("../services/registerCategory");
const listCategories = require("../services/listCategories");
const editCategory = require("../services/editCategory");
const deleteCategory = require("../services/deleteCategory");
const pause = require("../utils/pause");

async function categoriesMenu(user,rl,internalSystemMenu) {
    
    console.clear();
    console.log("📦 ============ CATEGORIAS ============ 📦\n");

    console.log("1. Cadastrar categoria ➕");
    console.log("2. Listar categorias 📃");
    console.log("3. Editar categoria 📝");
    console.log("4. Excluir categoria 🗑️");
    console.log("0. Voltar ↩️");
    
    let option = Number(await rl.question("\n📌 - Selecione a opção que deseja: ")); /* "option" recebe a opção escolhida pelo usuário e converte a string em número. */

        switch (option) {

            case 1:
                registerCategory(user,rl,categoriesMenu,internalSystemMenu); /* Redireciona o usuário para a função de cadastro de categorias. */
                break;
            
            case 2:
                listCategories(user,rl,categoriesMenu,internalSystemMenu); /* Redireciona o usuário para a função de listagem de categorias. */
                break;

            case 3:
                editCategory(user,rl,categoriesMenu,internalSystemMenu); /* Redireciona o usuário para a função de edição de categorias. */
                break;

            case 4:
                deleteCategory(user,rl,categoriesMenu,internalSystemMenu); /* Redireciona o usuário para a função de exclusão de categorias. */
                break;

            case 0:
                console.log("\nVoltando.. ↩️");
                await pause(rl);
                return internalSystemMenu(user,rl); /* Retorna o usuário para o menu principal do sistema. */

            default:
                console.log("\nOpção inválida! 🚫"); /* Verifica se a opção escolhida não existe no menu. */
                await pause(rl);
                return categoriesMenu(user,rl,internalSystemMenu);
        }
}

module.exports = categoriesMenu;