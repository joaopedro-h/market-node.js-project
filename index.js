const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const mainMenu = require("./menus/mainMenu");
const pause = require("./utils/pause");

mainMenu(rl,pause); 