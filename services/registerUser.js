const User = require("../models/User");
const {saveUser} = require("./saveUser");

async function registerUser(rl,mainMenu,pause) {
    
    console.clear();
    console.log("REGISTRO DE USÚARIO 👤\n");

    rl.question(`🪪  - Insira o seu nome:`, async (userName) => {

        rl.question(`\n📩 - Insira o seu email: `, async (email) => {

            rl.question(`\n🔑 - Insira sua senha: `, async (password) => {

                const user = new User(
                    userName,
                    email,
                    password
                );

                await saveUser(user,rl,mainMenu,pause);

            });
        });
    });
}

module.exports = registerUser;