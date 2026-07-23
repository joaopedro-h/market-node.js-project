const registerProduct = require("../services/registerProduct");
const listProducts = require("../services/listProducts");
const searchProduct = require("../services//searchProduct");
const productEditMenu = require("./productEditMenu");
const deleteProduct = require("../services/deleteProduct");
const pause = require("../utils/pause");

async function productsMenu(user,rl,internalSystemMenu) {
    
    console.clear();
    console.log("📦 ============ PRODUTOS ============ 📦\n");

    console.log("1. Cadastrar produto 📦");
    console.log("2. Listar produtos 📃");
    console.log("3. Buscar produto 🔎");
    console.log("4. Editar produto 📝");
    console.log("5. Excluir produto 🗑️");
    console.log("0. Voltar ↩️");
    
    let option = Number(await rl.question("\n📌 - Selecione a opção que deseja: ")); /* "option" recebe a opção escolhida pelo usuário e converte a string em número. */

        switch (option) {

            case 1:
                registerProduct(user,rl,productsMenu,internalSystemMenu); /* Redireciona o usuário para a função de cadastro de produtos. */
                break;
            
            case 2:
                listProducts(user,rl,productsMenu,internalSystemMenu); /* Redireciona o usuário para a função de listagem de produtos. */
                break;

            case 3:
                searchProduct(user,rl,productsMenu,internalSystemMenu); /* Redireciona o usuário para a função de busca de produtos. */
                break;

            case 4:
                productEditMenu(user,rl,productsMenu,internalSystemMenu); /* Redireciona o usuário para o menu de edição de produtos. */
                break;

            case 5:
                deleteProduct(user,rl,productsMenu,internalSystemMenu); /* Redireciona o usuário para a função de exclusão de produtos. */
                break;

            case 0:
                console.log("\nVoltando.. ↩️");
                await pause(rl);
                return internalSystemMenu(user,rl); /* Retorna o usuário para o menu principal do sistema. */

            default:
                console.log("\nOpção inválida! 🚫"); /* Verifica se a opção escolhida não existe no menu. */
                await pause(rl);
                return productsMenu(user,rl,internalSystemMenu);
        }
}

module.exports = productsMenu;