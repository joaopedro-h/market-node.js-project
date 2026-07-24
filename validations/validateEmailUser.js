const connection = require("../database/connection");

async function validateEmailUser(email) {
    
    const sqlCheckEmail = /* Cria a query para verificar se já existe algum usuário cadastrado com o email informado. */
    `SELECT 
     email
     FROM users
    WHERE email = ?`;

    const [result] = await connection.execute(sqlCheckEmail,[email]); /* Executa e armazena os rows em "result", ignorando os fields retornados pelo MySQL. */

    return result.length > 0; /* Retorna "true" caso o email já esteja cadastrado, ou "false" caso contrário. */

}

module.exports = validateEmailUser;