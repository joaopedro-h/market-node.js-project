const connection = require("../database/connection");
const validateEmailUser = require("../validations/validateEmailUser");
const pause = require("../utils/pause");

async function editUserName(user,rl,myAccountMenu,internalSystemMenu) {
    
    console.clear();
    console.log("👤 ============ EDITAR EMAIL ============ 👤\n");

    const newEmail = await rl.question(`📩 - Informe o novo email de usuário: `); /* "newEmail" recebe o novo email informado pelo usuário. */

    if (!newEmail.trim()) { /* Verifica se o campo do email foi preenchido. */
        console.log("\nCampo inválido! 🚫");
        await pause(rl);
        return myAccountMenu(user,rl,internalSystemMenu);
    }

    if (newEmail === user.email) { /* Verifica se o novo email é igual ao email atual da conta. */
        console.log("\nEsse já é o seu email atual! 🚫");
        await pause(rl);
        return myAccountMenu(user, rl, internalSystemMenu);
    }

    const emailAlreadyExists = await validateEmailUser(newEmail); /* Verifica se o email informado já está sendo utilizado por outro usuário. */

    if (emailAlreadyExists) {
        console.log("\nEmail já em uso por outro usuário! 🚫");
        await pause(rl);
        return myAccountMenu(user,rl,internalSystemMenu);
    }

    const sqlEditEmail = /* Cria a query para atualizar o email do usuário. */
    `UPDATE users
     SET email = ?
    WHERE id = ?;`

    const valuesEmail = [ /* Valores que substituirão os "?" da query. */
        newEmail,
        user.id
    ]

    await connection.execute(sqlEditEmail,valuesEmail); /* Executa a atualização do email no banco de dados. */
    user.email = newEmail; /* Atualiza o email do usuário em memória para manter os dados sincronizados. */

    console.log("\nEmail alterado com sucesso! ✅");

    await pause(rl);
    return myAccountMenu(user,rl,internalSystemMenu); /* Retorna o usuário para o menu "Minha Conta". */

}

module.exports = editUserName;