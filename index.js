const readline = require("node:readline/promises");

const rl = readline.createInterface({ /* Cria a interface que permite a interação do usuário com o terminal. */
    input: process.stdin,
    output: process.stdout
});

const mainMenu = require("./menus/mainMenu");

mainMenu(rl); /* Inicia a execução do sistema, abrindo o menu principal. */