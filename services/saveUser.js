const connection = require("../database/connection");
const time = require("../utils/time");

async function saveUser(user) {
    
    await time(); /* Aguarda alguns segundos antes de continuar a execução. */
    
    const sqlSaveUser = /* Cria a query para cadastrar um novo usuário. */
    `INSERT INTO users (user_name,email,password)
    VALUES (?,?,?)`;

    const valuesUser = [ /* Valores que substituirão os "?" da query, recebendo as informações do objeto "user". */
        user.name,
        user.email,
        user.password
    ]

    const [result] = await connection.execute(sqlSaveUser,valuesUser); /* Executa e armazena os rows em "result", ignorando os fields retornados pelo MySQL. */

    console.log("Cadastro realizado com sucesso! ✅");
    console.log("🆔: ", result.insertId); /* Exibe o ID gerado automaticamente pelo banco de dados. */
    
}

module.exports = {saveUser};