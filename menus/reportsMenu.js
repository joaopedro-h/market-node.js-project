const listAllProduts = require("../services/listAllProducts");
const lowStockProducts = require("../services/lowStockProducts");
const movementHistory = require("../services/movementHistory");
const outOfStockProducts = require("../services/outOfStockProducts");
const productsByCategory = require("../services/productsByCategory");
const inboundMovements = require("../services/inboundMovements");
const outboundMovements = require("../services/outboundMovements");
const totalInventoryValue = require("../services/totalInventoryValue");
const pause = require("../utils/pause");

async function reportsMenu(user,rl,internalSystemMenu) {
    
    console.clear();
    console.log("📊 ============ RELATÓRIOS ============ 📊\n");

    console.log("1. Listar todos os produtos 📦");
    console.log("2. Produtos com estoque baixo ⚠️");
    console.log("3. Produtos sem estoque ❌");
    console.log("4. Histórico de movimentações 📋");
    console.log("5. Produtos por categoria 🏷️");
    console.log("6. Movimentações de entrada 📈");
    console.log("7. Movimentações de saída 📉");
    console.log("8. Valor total do estoque 💰");
    console.log("0. Voltar ↩️");
    
    let option = Number(await rl.question("\n📌 - Selecione a opção que deseja: "));

        switch (option) {

            case 1:
                listAllProduts(user,rl,reportsMenu,internalSystemMenu);
                break;

            case 2:
                lowStockProducts(user,rl,reportsMenu,internalSystemMenu);
                break;

            case 3:
                outOfStockProducts(user,rl,reportsMenu,internalSystemMenu);
                break;

            case 4:
                movementHistory(user,rl,reportsMenu,internalSystemMenu);
                break;

            case 5:
                productsByCategory(user,rl,reportsMenu,internalSystemMenu);
                break;             

            case 6:
                inboundMovements(user,rl,reportsMenu,internalSystemMenu);
                break;

            case 7:
                outboundMovements(user,rl,reportsMenu,internalSystemMenu);
                break;

            case 8:
                totalInventoryValue(user,rl,reportsMenu,internalSystemMenu);
                break;

            case 0:
                console.log("\nVoltando.. ↩️");
                await pause(rl);
                return internalSystemMenu(user,rl);

            default:
                console.log("\nOpção inválida! 🚫");
                await pause(rl);
                return reportsMenu(user,rl,internalSystemMenu);
        }
}

module.exports = reportsMenu;