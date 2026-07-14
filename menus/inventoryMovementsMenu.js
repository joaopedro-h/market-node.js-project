const stockEntry = require("../services/stockEntry");
const stockExit = require("../services/stockExit");
const pause = require("../utils/pause");

async function inventoryMovementsMenu(user,rl,internalSystemMenu) {
    
    console.clear();
    console.log("📋 ============ MOVIMENTAÇÕES DE ESTOQUE ============ 📋\n");

    console.log("1. Entrada de produtos ➕");
    console.log("2. Saídas de produtos ➖");
    console.log("3. Histórico de movimentações 📜");
    console.log("0. Voltar ↩️");
    
    let option = await rl.question("\n📌 - Selecione a opção que deseja: ");
    
        option = Number(option);

        switch (option) {

            case 1:
                stockEntry(user,rl,inventoryMovementsMenu,internalSystemMenu);
                break;
        
            case 2:
                stockExit(user,rl,inventoryMovementsMenu,internalSystemMenu);
                break;

            case 3:
                transactionHistory(user,rl,inventoryMovementsMenu,internalSystemMenu);
                break;

            case 0:
                console.log("\nVoltando.. ↩️");
                await pause(rl);
                return internalSystemMenu(user,rl);

            default:
                console.log("\nOpção inválida! 🚫");
                await pause(rl);
                return inventoryMovementsMenu(user,rl,internalSystemMenu);
        }
}

module.exports = inventoryMovementsMenu;