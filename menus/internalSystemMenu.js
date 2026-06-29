const productsMenu = require("./productsMenu");
const categoriesMenu = require("./categoriesMenu");
const suppliersMenu = require("./suppliersMenu");
const inventoryMovementsMenu = require("./inventoryMovementsMenu");
const relatorysMenu = require("./relatorysMenu");
const myAccountMenu = require("./myAccountMenu");
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
    
    let option = await rl.question("\n📌 - Selecione a opção que deseja: ");
    
        option = Number(option);

        switch (option) {

            case 1:
                productsMenu(rl);
                break;
            
            case 2:
                categoriesMenu(rl,internalSystemMenu);
                break;

            case 3:
                suppliersMenu();
                break;

            case 4:
                inventoryMovementsMenu();
                break;

            case 5:
                relatorysMenu();
                break;

            case 6:
                myAccountMenu();
                break;

            case 0:
                console.log("\nSaindo.. ❌");
                rl.close();
                return;

            default:
                console.log("\nOpção inválida! 🚫");
                await pause(rl);
                return internalSystemMenu(user,rl);
        }
}

module.exports = internalSystemMenu;