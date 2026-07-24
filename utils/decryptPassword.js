const bcrypt = require('bcrypt');

async function decryptPassword(password,user) {
    
    const hashPassword = await bcrypt.compare(password,user.password) /* Compara a senha digitada com a senha criptografada armazenada no banco de dados. */

    return hashPassword; /* Retorna "true" caso as senhas sejam iguais, ou "false" caso sejam diferentes. */

}

module.exports = decryptPassword;