const connection = require("../database/connection");

async function validateEmailSupplier(email) {
    
    const sqlCheckEmail = /* Cria a query para verificar se já existe algum fornecedor cadastrado com o email informado. */
    `SELECT 
     email
     FROM suppliers
    WHERE email = ?`;

    const [result] = await connection.execute(sqlCheckEmail,[email]); /* Executa e armazena os rows em "result", ignorando os fields retornados pelo MySQL. */

    return result.length > 0; /* Retorna "true" caso o email já esteja cadastrado, ou "false" caso contrário. */

}

module.exports = validateEmailSupplier;