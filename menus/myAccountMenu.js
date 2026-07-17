const editUserName = require("../services/editUserName");
const pause = require("../utils/pause");

async function myAccountMenu(user,rl,internalSystemMenu) {
    
    console.clear();
    console.log("👤 ============ MINHA CONTA ============ 👤\n");
    console.log(`🆔 - ID: ${user.email}`);
    console.log(`🪪  - Nome: ${user.user_name}`);
    console.log(`📩 - Email: ${user.email}\n`);
    console.log("========================================\n");
    
    console.log("1. Alterar nome 🪪");
    console.log("2. Alterar email 📩");
    console.log("3. Alterar senha 🔑");
    console.log("4. Excluir conta 🗑️");
    console.log("5. Voltar ↩️");

    let option = Number(await rl.question("\n📌 - Selecione a opção que deseja: "));

        switch (option) {

            case 1:
                editUserName(user,rl,myAccountMenu,internalSystemMenu);
                break;
            
            case 0:
                console.log("\nVoltando.. ↩️");
                await pause(rl);
                return internalSystemMenu(user,rl);

            default:
                console.log("\nOpção inválida! 🚫");
                await pause(rl);
                return myAccountMenu(user,rl,internalSystemMenu);
        }

}

module.exports = myAccountMenu;