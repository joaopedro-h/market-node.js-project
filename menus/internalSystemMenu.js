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
    
    let option = await rl.question("\n📌 - Selecione a opção que deseja: ");
    
        option = Number(option);

        switch (option) {

            case 1:
                productsMenu(user,rl,internalSystemMenu);
                break;
            
            case 2:
                categoriesMenu(user,rl,internalSystemMenu);
                break;

            case 3:
                suppliersMenu(user,rl,internalSystemMenu);
                break;

            case 4:
                inventoryMovementsMenu(user,rl,internalSystemMenu);
                break;

            case 5:
                reportsMenu(user,rl,internalSystemMenu);
                break;

            case 6:
                myAccountMenu(user,rl,internalSystemMenu);
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