const connection = require("../database/connection");
const decryptPassword = require("../utils/decryptPassword");
const pause = require("../utils/pause");

async function deactivateAccount(user,rl,myAccountMenu,internalSystemMenu) {
    
    console.clear();
    console.log("👤 ============ DESATIVAR CONTA ============ 👤\n");

    const currentPassword = await rl.question(`🔑 - Confirme a senha atual: `);

    const decryptedPassword = await decryptPassword(currentPassword,user);

    if (!decryptedPassword) {
        console.log("\nSenha incorreta! 🚫");
        await pause(rl);
        return myAccountMenu(user,rl,internalSystemMenu);
    }

    const sqlDeactivateAccount =
    `UPDATE users
     SET active = 0
    WHERE id = ?;`

    await connection.execute(sqlDeactivateAccount,[user.id]);

    console.log("\nConta desativada com sucesso! ✅");
    
    await pause(rl);
    return myAccountMenu(user,rl,internalSystemMenu);

}

module.exports = deactivateAccount;