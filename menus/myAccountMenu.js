const editUserName = require("../services/editUserName");
const editUserEmail = require("../services/editUserEmail");
const editUserPassword = require("../services/editUserPassword");
const deactivateAccount = require("../services/deactivateAccount");
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
    console.log("4. Desativar conta 🗑️");
    console.log("5. Voltar ↩️");

    let option = Number(await rl.question("\n📌 - Selecione a opção que deseja: ")); /* "option" recebe a opção escolhida pelo usuário e converte a string em número. */

        switch (option) {

            case 1:
                editUserName(user,rl,myAccountMenu,internalSystemMenu); /* Redireciona o usuário para a função de alteração de nome. */
                break;

            case 2:
                editUserEmail(user,rl,myAccountMenu,internalSystemMenu); /* Redireciona o usuário para a função de alteração de email. */
                break;
            
            case 3:
                editUserPassword(user,rl,myAccountMenu,internalSystemMenu); /* Redireciona o usuário para a função de alteração de senha. */
                break;

            case 4:
                deactivateAccount(user,rl,myAccountMenu,internalSystemMenu); /* Redireciona o usuário para a função de desativação da conta. */
                break;

            case 0:
                console.log("\nVoltando.. ↩️");
                await pause(rl);
                return internalSystemMenu(user,rl); /* Retorna o usuário para o menu principal do sistema. */

            default:
                console.log("\nOpção inválida! 🚫"); /* Verifica se a opção escolhida não existe no menu. */
                await pause(rl);
                return myAccountMenu(user,rl,internalSystemMenu);
        }

}

module.exports = myAccountMenu;