const connection = require("../database/connection");
const decryptPassword = require("../utils/decryptPassword");
const encryptPassword = require("../utils/encryptPassword");
const pause = require("../utils/pause");

async function editUserPassword(user,rl,myAccountMenu,internalSystemMenu) {
    
    console.clear();
    console.log("🔑 ============ ALTERAR SENHA ============ 🔑\n");

    const currentPassword = await rl.question(`🔑 - Digite a senha atual: `);

    const decryptedPassword = await decryptPassword(currentPassword,user);

    if (!decryptedPassword) {
        console.log("\nSenha incorreta! 🚫");
        await pause(rl);
        return myAccountMenu(user,rl,internalSystemMenu);

    }

    const newPassword = await rl.question(`\n🔑 - Digite a senha nova: `);

    const passwordConfirmed = await rl.question(`\n🔑 - Confirme a senha nova: `);

    if (newPassword !== passwordConfirmed) {
        console.log("\nAs senhas não coincidem! 🚫");
        await pause(rl);
        return myAccountMenu(user,rl,internalSystemMenu);        
    }

    const samePassword = await decryptPassword(newPassword, user);

    if (samePassword) {
        console.log("\nA nova senha não pode ser igual à senha atual! 🚫");
        await pause(rl);
        return myAccountMenu(user, rl, internalSystemMenu);
    }

    const encryptedPassword = await encryptPassword(newPassword);

    const sqlEditPassword =
    `UPDATE users
     SET password = ?
    WHERE id = ?`

    const valuesPassword = [
        encryptedPassword,
        user.id
    ]

    await connection.execute(sqlEditPassword,valuesPassword);
    user.password = encryptedPassword;

    console.log("\nSenha alterada com sucesso! ✅");

    await pause(rl);
    return myAccountMenu(user,rl,internalSystemMenu);

}

module.exports = editUserPassword;