const connection = require("../database/connection");
const pause = require("../utils/pause");

async function editUserName(user,rl,myAccountMenu,internalSystemMenu) {
    
    console.clear();
    console.log("👤 ============ EDITAR NOME ============ 👤\n");

    const newName = await rl.question(`🪪 - Informe o novo nome de usuário: `);

    if (!newName.trim()) {
        console.log("\nCampo inválido! 🚫");
        await pause(rl);
        return myAccountMenu(user,rl,internalSystemMenu);
    }

    if (newName === user.user_name) {
        console.log("\nEsse já é o seu nome atual! 🚫");
        await pause(rl);
        return myAccountMenu(user,rl,internalSystemMenu);
    }

    const sqlEditName =
    `UPDATE users
     SET user_name = ?
    WHERE id = ?;`

    const valuesName = [
        newName,
        user.id
    ]

    await connection.execute(sqlEditName,valuesName);
    user.user_name = newName;

    console.log("\nNome alterado com sucesso! ✅");

    await pause(rl);
    return myAccountMenu(user,rl,internalSystemMenu);

}

module.exports = editUserName;