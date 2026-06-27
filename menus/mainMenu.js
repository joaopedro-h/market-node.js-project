const registerUser = require("../services/registerUser");
const login = require("../services/login");

async function mainMenu(rl,pause) {
    
    console.clear();
    console.log("=====================================");
    console.log("🌐 SISTEMA DE CONTROLE DE ESTOQUE 🌐");
    console.log("=====================================\n");

    console.log("1. Criar usuário 👤");
    console.log("2. Fazer login 💾");
    console.log("0. Sair ❌");

    rl.question(`\n📌 - Selecione a opção que deseja: `, (option) => {

        option = Number(option);

        switch (option) {

            case 1:
                registerUser(rl,mainMenu,pause);               
                break;
        
            case 2:
                login();
                break;

            case 0:
                console.log("Saindo.. ❌");
                rl.close();
                break;

            default:
                console.log("Opção inválida! 🚫");
                mainMenu();
                break;
        }

    });
}

module.exports = mainMenu;