const User = require("../models/User");
const encryptPassword = require("../utils/encryptPassword");
const validateEmailUser = require("../validations/validateEmailUser");
const {saveUser} = require("./saveUser");
const pause = require("../utils/pause");

async function registerUser(rl,mainMenu) {
    
    console.clear();
    console.log("👤 ============ CADASTRAR USUÁRIO ============ 👤\n");

    const userName = await rl.question("🪪  - Insira o seu nome:"); /* "userName" recebe o nome informado pelo usuário. */

        if (!userName.trim()) { /* Verifica se o campo do nome foi preenchido. */
            console.log("\nCampo inválido! 🚫");
            await pause(rl);
            return registerUser(rl);
        }

    const email = await rl.question ("\n📩 - Insira o seu email: "); /* "email" recebe o email informado pelo usuário. */

        if (!email.trim()) { /* Verifica se o campo do email foi preenchido. */
            console.log("\nCampo inválido! 🚫");
            await pause(rl);
            return registerUser(rl);
        }
            
    const emailAlreadyExists = await validateEmailUser(email); /* Verifica se o email informado já está cadastrado. */

        if (emailAlreadyExists) {
            console.log("\nEmail já em uso! 🚫");
            await pause(rl);
            return registerUser(rl);
        }

    const password = await rl.question("\n🔑 - Insira sua senha: "); /* "password" recebe a senha informada pelo usuário. */

        if (!password.trim()) { /* Verifica se o campo da senha foi preenchido. */
            console.log("\nCampo inválido! 🚫");
            await pause(rl);
            return registerUser(rl);
        }

    const passwordConfirmed = await rl.question(`\n🔑 - Confirme sua senha: `) /* "passwordConfirmed" recebe a confirmação da senha. */

        if (password != passwordConfirmed) { /* Verifica se a confirmação é igual à senha informada. */
            console.log("\nSenha incorreta! 🚫");
            await pause(rl);
            return registerUser(rl);                    
        }

    const encryptedPassword = await encryptPassword(password); /* Criptografa a senha antes de salvá-la no banco de dados. */

    const user = new User( /* Cria um objeto "User" com os dados informados pelo usuário. */
        userName,
        email,
        encryptedPassword
    );

        await saveUser(user); /* Salva o usuário no banco de dados. */
        await pause(rl);
        return mainMenu(rl); /* Retorna o usuário para o menu principal. */

}

module.exports = registerUser;