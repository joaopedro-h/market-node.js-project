const connection = require("../database/connection");
const decryptPassword = require("../utils/decryptPassword");
const pause = require("../utils/pause");

async function deactivateAccount(user,rl,myAccountMenu,internalSystemMenu) {
    
    console.clear();
    console.log("👤 ============ DESATIVAR CONTA ============ 👤\n");

    const currentPassword = await rl.question(`🔑 - Confirme a senha atual: `); /* "currentPassword" recebe a senha atual informada pelo usuário. */

    const decryptedPassword = await decryptPassword(currentPassword,user); /* Compara a senha digitada com a senha criptografada da conta. */

    if (!decryptedPassword) { /* Verifica se a senha informada está correta. */
        console.log("\nSenha incorreta! 🚫");
        await pause(rl);
        return myAccountMenu(user,rl,internalSystemMenu);
    }

    const sqlDeactivateAccount = /* Cria a query para desativar a conta do usuário. */
    `UPDATE users
     SET active = 0
    WHERE id = ?;`

    await connection.execute(sqlDeactivateAccount,[user.id]); /* Executa a desativação da conta no banco de dados. */

    console.log("\nConta desativada com sucesso! ✅");
    
    await pause(rl);
    return myAccountMenu(user,rl,internalSystemMenu); /* Retorna o usuário para o menu "Minha Conta". */

}

module.exports = deactivateAccount;