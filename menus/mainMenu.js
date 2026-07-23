const registerUser = require("../services/registerUser");
const login = require("../services/login");
const pause = require("../utils/pause");

async function mainMenu(rl) {
    
    console.clear();
    console.log("=====================================");
    console.log("🌐 SISTEMA DE CONTROLE DE ESTOQUE 🌐");
    console.log("=====================================\n");

    console.log("1. Cadastrar usuário 👤");
    console.log("2. Fazer login 💾");
    console.log("0. Sair ❌");

    let option = Number(await rl.question("\n📌 - Selecione a opção que deseja: ")); /* "option" recebe a opção escolhida pelo usuário e converte a string em número. */

        switch (option) {

            case 1:
                await registerUser(rl,mainMenu); /* Redireciona o usuário para a função de cadastro de usuários. */               
                break;
        
            case 2:
                await login(rl,mainMenu); /* Redireciona o usuário para a função de login. */
                break;

            case 0:
                console.log("Saindo.. ❌");
                rl.close(); /* Encerra a interface do readline e finaliza o sistema. */
                return;

            default:
                console.log("Opção inválida! 🚫"); /* Verifica se a opção escolhida não existe no menu. */
                await pause(rl);
                return mainMenu(rl);
        }
}

module.exports = mainMenu;