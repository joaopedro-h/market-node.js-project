const User = require("../models/User");
const encryptPassword = require("../utils/encryptPassword");
const validateEmailUser = require("../validations/validateEmailUser");
const {saveUser} = require("./saveUser");
const pause = require("../utils/pause");

async function registerUser(rl,mainMenu) {
    
    console.clear();
    console.log("👤 ============ CADASTRAR USUÁRIO ============ 👤\n");

    const userName = await rl.question("🪪  - Insira o seu nome:");

        if (!userName.trim()) {
            console.log("\nCampo inválido! 🚫");
            await pause(rl);
            return registerUser(rl);
        }

    const email = await rl.question ("\n📩 - Insira o seu email: ");

        if (!email.trim()) {
            console.log("\nCampo inválido! 🚫");
            await pause(rl);
            return registerUser(rl);
        }
            
    const emailAlreadyExists = await validateEmailUser(email);

        if (emailAlreadyExists) {
            console.log("\nEmail já em uso! 🚫");
            await pause(rl);
            return registerUser(rl);
        }

    const password = await rl.question("\n🔑 - Insira sua senha: ");

        if (!password.trim()) {
            console.log("\nCampo inválido! 🚫");
            await pause(rl);
            return registerUser(rl);
        }

    const passwordConfirmed = await rl.question(`\n🔑 - Confirme sua senha: `)

        if (password != passwordConfirmed) {
            console.log("\nSenha incorreta! 🚫");
            await pause(rl);
            return registerUser(rl);                    
        }

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