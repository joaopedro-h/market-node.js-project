const productsMenu = require("./productsMenu");
const categoriesMenu = require("./categoriesMenu");
const suppliersMenu = require("./suppliersMenu");
const inventoryMovementsMenu = require("./inventoryMovementsMenu");
const myAccountMenu = require("./myAccountMenu");
const reportsMenu = require("./reportsMenu");
const pause = require("../utils/pause");

async function internalSystemMenu(user,rl) {
    
    console.clear();
    console.log("=====================================");
    console.log("📦 SISTEMA DE CONTROLE DE ESTOQUE 📦");
    console.log("=====================================\n");

    console.log("1. Produtos 📦");
    console.log("2. Categorias 🏷️");
    console.log("3. Fornecedores 🚚");
    console.log("4. Movimentações do estoque 📋");
    console.log("5. Relatórios 📊");
    console.log("6. Minha conta 👤");
    console.log("0. Sair ❌");
    
    let option = Number(await rl.question("\n📌 - Selecione a opção que deseja: ")); /* "option" recebe a opção escolhida pelo usuário e converte a string em número. */
    
        switch (option) {

            case 1:
                productsMenu(user,rl,internalSystemMenu); /* Redireciona o usuário para o menu de produtos. */
                break;
            
            case 2:
                categoriesMenu(user,rl,internalSystemMenu); /* Redireciona o usuário para o menu de categorias. */
                break;

            case 3:
                suppliersMenu(user,rl,internalSystemMenu); /* Redireciona o usuário para o menu de fornecedores. */
                break;

            case 4:
                inventoryMovementsMenu(user,rl,internalSystemMenu); /* Redireciona o usuário para o menu de movimentações do estoque. */
                break;

            case 5:
                reportsMenu(user,rl,internalSystemMenu); /* Redireciona o usuário para o menu de relatórios. */
                break;

            case 6:
                myAccountMenu(user,rl,internalSystemMenu); /* Redireciona o usuário para o menu da conta. */
                break;

            case 0:
                console.log("\nSaindo.. ❌");
                rl.close(); /* Encerra a interface do readline e finaliza o sistema. */
                return;

            default:
                console.log("\nOpção inválida! 🚫"); /* Verifica se a opção escolhida não existe no menu. */
                await pause(rl);
                return internalSystemMenu(user,rl);
        }
}

module.exports = internalSystemMenu;