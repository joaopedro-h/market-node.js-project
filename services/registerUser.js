const User = require("../models/User");
const encryptPassword = require("../utils/encryptPassword");
const {saveUser} = require("./saveUser");
const pause = require("../utils/pause");

async function registerUser(rl,mainMenu) {
    
    console.clear();
    console.log("REGISTRO DE USÚARIO 👤\n");

    const userName = await rl.question("🪪  - Insira o seu nome: ");

        const email = await rl.question ("\n📩 - Insira o seu email: ");

            const password = await rl.question("\n🔑 - Insira sua senha: ");

                const encryptedPassword = await encryptPassword(password);

                const user = new User(
                    userName,
                    email,
                    encryptedPassword
                );

                await saveUser(user);
                await pause(rl);
                return mainMenu(rl);

}

module.exports = registerUser;