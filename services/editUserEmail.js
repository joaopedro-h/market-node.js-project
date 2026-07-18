const connection = require("../database/connection");
const validateEmailUser = require("../validations/validateEmailUser");
const pause = require("../utils/pause");

async function editUserName(user,rl,myAccountMenu,internalSystemMenu) {
    
    console.clear();
    console.log("👤 ============ EDITAR EMAIL ============ 👤\n");

    const newEmail = await rl.question(`📩 - Informe o novo email de usuário: `);

    const emailAlreadyExists = await validateEmailUser(newEmail);

    if (emailAlreadyExists) {
        console.log("\nEmail já em uso! 🚫");
        await pause(rl);
        return myAccountMenu(user,rl,internalSystemMenu);
    }

    const sqlEditEmail =
    `UPDATE users
     SET email = ?
    WHERE id = ?;`

    const valuesEmail = [
        newEmail,
        user.id
    ]

    await connection.execute(sqlEditEmail,valuesEmail);

    console.log("\nEmail alterado com sucesso! ✅");

    await pause(rl);
    return myAccountMenu(user,rl,internalSystemMenu);

}

module.exports = editUserName;