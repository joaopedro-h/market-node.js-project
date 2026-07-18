const connection = require("../database/connection");
const pause = require("../utils/pause");

async function editUserName(user,rl,myAccountMenu,internalSystemMenu) {
    
    console.clear();
    console.log("👤 ============ EDITAR NOME ============ 👤\n");

    const newName = await rl.question(`🪪 - Informe o novo nome de usuário: `);

    const sqlEditName =
    `UPDATE users
     SET user_name = ?
    WHERE id = ?;`

    const valuesName = [
        newName,
        user.id
    ]

    await connection.execute(sqlEditName,valuesName);

    console.log("\nNome alterado com sucesso! ✅");

    await pause(rl);
    return myAccountMenu(user,rl,internalSystemMenu);

}

module.exports = editUserName;