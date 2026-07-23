const stockEntry = require("../services/stockEntry");
const stockExit = require("../services/stockExit");
const stockMovementHistory = require("../services/stockMovementHistory");
const pause = require("../utils/pause");

async function inventoryMovementsMenu(user,rl,internalSystemMenu) {
    
    console.clear();
    console.log("📋 ============ MOVIMENTAÇÕES DE ESTOQUE ============ 📋\n");

    console.log("1. Entrada de produtos ➕");
    console.log("2. Saídas de produtos ➖");
    console.log("3. Histórico de movimentações 📜");
    console.log("0. Voltar ↩️");
    
    let option = Number(await rl.question("\n📌 - Selecione a opção que deseja: ")); /* "option" recebe a opção escolhida pelo usuário e converte a string em número. */

        switch (option) {

            case 1:
                stockEntry(user,rl,inventoryMovementsMenu,internalSystemMenu); /* Redireciona o usuário para a função de entrada de produtos no estoque. */
                break;
        
            case 2:
                stockExit(user,rl,inventoryMovementsMenu,internalSystemMenu); /* Redireciona o usuário para a função de saída de produtos do estoque. */
                break;

            case 3:
                stockMovementHistory(user,rl,inventoryMovementsMenu,internalSystemMenu); /* Redireciona o usuário para a função de histórico de movimentações. */
                break;

            case 0:
                console.log("\nVoltando.. ↩️");
                await pause(rl);
                return internalSystemMenu(user,rl); /* Retorna o usuário para o menu principal do sistema. */

            default:
                console.log("\nOpção inválida! 🚫"); /* Verifica se a opção escolhida não existe no menu. */
                await pause(rl);
                return inventoryMovementsMenu(user,rl,internalSystemMenu);
        }
}

module.exports = inventoryMovementsMenu;