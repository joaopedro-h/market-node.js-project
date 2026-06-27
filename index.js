const readline = require("node:readline/promises");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const mainMenu = require("./menus/mainMenu");

mainMenu(rl); 