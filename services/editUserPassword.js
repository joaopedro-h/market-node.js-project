const connection = require("../database/connection");
const decryptPassword = require("../utils/decryptPassword");
const encryptPassword = require("../utils/encryptPassword");
const pause = require("../utils/pause");

async function editUserPassword(user,rl,myAccountMenu,internalSystemMenu) {
    
    console.clear();
    console.log("🔑 ============ ALTERAR SENHA ============ 🔑\n");

    const currentPassword = await rl.question(`🔑 - Digite a senha atual: `); /* "currentPassword" recebe a senha atual informada pelo usuário. */

    const decryptedPassword = await decryptPassword(currentPassword,user); /* Compara a senha digitada com a senha criptografada da conta. */

    if (!decryptedPassword) { /* Verifica se a senha atual informada está correta. */
        console.log("\nSenha incorreta! 🚫");
        await pause(rl);
        return myAccountMenu(user,rl,internalSystemMenu);
    }

    const newPassword = await rl.question(`\n🔑 - Digite a senha nova: `); /* "newPassword" recebe a nova senha informada pelo usuário. */

        if (!newPassword.trim()) { /* Verifica se o campo da senha foi preenchido. */
            console.log("\nCampo inválido! 🚫");
            await pause(rl);
            return myAccountMenu(user,rl,internalSystemMenu);
        }

    const passwordConfirmed = await rl.question(`\n🔑 - Confirme a senha nova: `); /* "passwordConfirmed" recebe a confirmação da nova senha. */

    if (newPassword !== passwordConfirmed) { /* Verifica se a confirmação é igual à nova senha. */
        console.log("\nAs senhas não coincidem! 🚫");
        await pause(rl);
        return myAccountMenu(user,rl,internalSystemMenu);        
    }

    const samePassword = await decryptPassword(newPassword, user); /* Verifica se a nova senha é igual à senha atual. */

    if (samePassword) {
        console.log("\nA nova senha não pode ser igual à senha atual! 🚫");
        await pause(rl);
        return myAccountMenu(user, rl, internalSystemMenu);
    }

    const encryptedPassword = await encryptPassword(newPassword); /* Criptografa a nova senha antes de salvá-la no banco de dados. */

    const sqlEditPassword = /* Cria a query para atualizar a senha do usuário. */
    `UPDATE users
     SET password = ?
    WHERE id = ?`

    const valuesPassword = [ /* Valores que substituirão os "?" da query. */
        encryptedPassword,
        user.id
    ]

    await connection.execute(sqlEditPassword,valuesPassword); /* Executa a atualização da senha no banco de dados. */
    user.password = encryptedPassword; /* Atualiza a senha do usuário em memória para manter os dados sincronizados. */

    console.log("\nSenha alterada com sucesso! ✅");

    await pause(rl);
    return myAccountMenu(user,rl,internalSystemMenu); /* Retorna o usuário para o menu "Minha Conta". */

}

module.exports = editUserPassword;