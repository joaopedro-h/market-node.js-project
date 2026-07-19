const connection = require("../database/connection");
const decryptPassword = require("../utils/decryptPassword");
const internalSystemMenu = require("../menus/internalSystemMenu");
const time = require("../utils/time");
const pause = require("../utils/pause");

async function login(rl,mainMenu) {
    
    console.clear();
    console.log("LOGIN 💾");

    const email= await rl.question(`\n📩 - Insira o seu email: `);

    const sqlLogin =
    `SELECT 
     id,
     user_name,
     email,
     password,
     active
    FROM users
    WHERE email = ?;`

    const [result] = await connection.execute(sqlLogin,[email]);

    if (result.length === 0) {  /* Verifica se existe algum usuário cadastrado com o email informado. */
        console.log("\nUsuário não encontrado! ❌");
        await pause(rl);
        return mainMenu(rl);           
    }

    const user = result[0];

    if (user.active === 0) {
        console.log("\nConta desativada! ❌");
        await pause(rl);
        return mainMenu(rl);   
    }

    const password= await rl.question(`\n🔑 - Insira sua senha: `);

    const decryptedPassword = await decryptPassword(password,user);

    if (decryptedPassword) {

        console.log("Logado com sucesso! ✅");
        console.log("🆔: ", user.id);
        await time();
        internalSystemMenu(user,rl);
        return;
        
    }else {

        console.log("\nSenha incorreta! 🚫");
        
    }

    await pause(rl);
    return mainMenu(rl);

}

module.exports = login;