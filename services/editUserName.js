const connection = require("../database/connection");
const pause = require("../utils/pause");

async function editUserName(user,rl,myAccountMenu,internalSystemMenu) {
    
    console.clear();
    console.log("👤 ============ EDITAR NOME ============ 👤\n");

    const newName = await rl.question(`🪪 - Informe o novo nome de usuário: `); /* "newName" recebe o novo nome informado pelo usuário. */

    if (!newName.trim()) { /* Verifica se o campo do nome foi preenchido. */
        console.log("\nCampo inválido! 🚫");
        await pause(rl);
        return myAccountMenu(user,rl,internalSystemMenu);
    }

    if (newName === user.user_name) { /* Verifica se o novo nome é igual ao nome atual da conta. */
        console.log("\nEsse já é o seu nome atual! 🚫");
        await pause(rl);
        return myAccountMenu(user,rl,internalSystemMenu);
    }

    const sqlEditName = /* Cria a query para atualizar o nome do usuário. */
    `UPDATE users
     SET user_name = ?
    WHERE id = ?;`

    const valuesName = [ /* Valores que substituirão os "?" da query. */
        newName,
        user.id
    ]

    await connection.execute(sqlEditName,valuesName); /* Executa a atualização do nome no banco de dados. */
    user.user_name = newName; /* Atualiza o nome do usuário em memória para manter os dados sincronizados. */

    console.log("\nNome alterado com sucesso! ✅");

    await pause(rl);
    return myAccountMenu(user,rl,internalSystemMenu); /* Retorna o usuário para o menu "Minha Conta". */

}

module.exports = editUserName;