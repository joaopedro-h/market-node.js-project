const connection = require("../database/connection");
const time = require("../utils/time");

async function saveSupplier(supplier) {
    
    await time(); /* Aguarda alguns segundos antes de continuar a execução. */
    
    const sqlSaveSupplier = /* Cria a query para cadastrar um novo fornecedor. */
    `INSERT INTO suppliers (company_name,email,phone)
    VALUES (?,?,?)`;

    const valuesSupplier = [ /* Valores que substituirão os "?" da query, recebendo as informações do objeto "supplier". */
        supplier.name,
        supplier.email,
        supplier.phone
    ]

    const [result] = await connection.execute(sqlSaveSupplier,valuesSupplier); /* Executa e armazena os rows em "result", ignorando os fields retornados pelo MySQL. */

    console.log("Fornecedor cadastrado com sucesso! ✅");
    console.log("🆔: ", result.insertId); /* Exibe o ID gerado automaticamente pelo banco de dados. */
    
}

module.exports = {saveSupplier};