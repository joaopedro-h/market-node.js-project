const connection = require("../database/connection");
const time = require("../utils/time");

async function saveCategory(category) {
    
    await time(); /* Aguarda alguns segundos antes de continuar a execução. */
    
    const sqlSaveCategory = /* Cria a query para cadastrar uma nova categoria. */
    `INSERT INTO categories (name)
    VALUES (?)`;

    const valuesCategory = [ /* Valor que substituirá o "?" da query, recebendo o nome do objeto "category". */
        category.name
    ]

    const [result] = await connection.execute(sqlSaveCategory,valuesCategory); /* Executa e armazena os rows em "result", ignorando os fields retornados pelo MySQL. */

    console.log("Categoria cadastrada com sucesso! ✅");
    console.log("🆔: ", result.insertId); /* Exibe o ID gerado automaticamente pelo banco de dados. */
    
}

module.exports = {saveCategory};