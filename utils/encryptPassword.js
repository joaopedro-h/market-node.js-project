const bcrypt = require('bcrypt');

async function encryptPassword(password) {
    
    const saltRounds = 10; /* Define a quantidade de processamento utilizada para criptografar a senha. */
    const hashPassword = await bcrypt.hash(password,saltRounds); /* Criptografa a senha utilizando o número de salt rounds informado. */

    return hashPassword; /* Retorna a senha criptografada. */

}

module.exports = encryptPassword;