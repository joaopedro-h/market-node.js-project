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

    let option = await rl.question("\n📌 - Selecione a opção que deseja: ");

        option = Number(option);

        switch (option) {

            case 1:
                await registerUser(rl,mainMenu);               
                break;
        
            case 2:
                await login(rl,mainMenu);
                break;

            case 0:
                console.log("Saindo.. ❌");
                rl.close();
                return;

            default:
                console.log("Opção inválida! 🚫");
                await pause(rl);
                return mainMenu(rl);
        }
}

module.exports = mainMenu;