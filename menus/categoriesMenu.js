const registerCategorie = require("../services/registerCategorie");
const listCategories = require("../services/listCategories");
const editCategory = require("../services/editCategory");
const deleteCategory = require("../services/deleteCategory");
const pause = require("../utils/pause");

async function categoriesMenu(rl,internalSystemMenu) {
    
    console.clear();
    console.log("📦 ============ CATEGORIAS ============ 📦\n");

    console.log("1. Cadastrar categoria ➕");
    console.log("2. Listar categorias 📃");
    console.log("3. Editar categoria 📝");
    console.log("4. Excluir categoria 🗑️");
    console.log("0. Voltar ↩️");
    
    let option = await rl.question("\n📌 - Selecione a opção que deseja: ");

        option = Number(option);

        switch (option) {

            case 1:
                registerCategorie(rl,categoriesMenu);
                break;
            
            case 2:
                listCategories(rl,categoriesMenu);
                break;

            case 3:
                editCategory(rl,categoriesMenu);
                break;

            case 4:
                deleteCategory(rl,categoriesMenu);
                break;

            case 0:
                console.log("\nVoltando.. ↩️");
                await pause(rl);
                return internalSystemMenu(rl);

            default:
                console.log("\nOpção inválida! 🚫");
                await pause(rl);
                return categoriesMenu(rl);
        }
}

module.exports = categoriesMenu;