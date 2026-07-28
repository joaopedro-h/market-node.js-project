const connection = require("../database/connection");
const decryptPassword = require("../utils/decryptPassword");
const internalSystemMenu = require("../menus/internalSystemMenu");
const time = require("../utils/time");
const pause = require("../utils/pause");

async function login(rl,mainMenu) {
    
    console.clear();
    console.log("LOGIN 💾");

    const email= await rl.question(`\n📩 - Insira o seu email: `);

    const sqlLogin = /* Cria a query para buscar o usuário pelo email informado. */
    `SELECT 
     id,
     user_name,
     email,
     password,
     active
    FROM users
    WHERE email = ?;`

    const [result] = await connection.execute(sqlLogin,[email]); /* Executa a consulta e armazena os dados do usuário encontrado. */

    if (result.length === 0) { /* Verifica se o usuário existe. */
        console.log("\nUsuário não encontrado! ❌");
        await pause(rl);
        return mainMenu(rl);           
    }

    const user = result[0]; /* Obtém os dados do usuário encontrado. */

    if (user.active === 0) { /* Verifica se a conta está ativa. */
        console.log("\nConta desativada! ❌");
        await pause(rl);
        return mainMenu(rl);   
    }

    const password= await rl.question(`\n🔑 - Insira sua senha: `);

    const decryptedPassword = await decryptPassword(password,user); /* Compara a senha informada com a senha criptografada. */

    if (decryptedPassword) {

        console.log("Logado com sucesso! ✅");
        console.log("🆔: ", user.id);
        await time();
        internalSystemMenu(user,rl); /* Direciona o usuário para o sistema interno após o login. */
        return;
        
    }else {

        console.log("\nSenha incorreta! 🚫");
        
    }

    await pause(rl);
    return mainMenu(rl); /* Retorna o usuário para o menu principal. */

}

module.exports = login;