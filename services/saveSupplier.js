const connection = require("../database/connection");
const time = require("../utils/time");

async function saveSupplier(supplier) {
    
    await time();
    
    const sqlSaveSupplier =
    `INSERT INTO suppliers (company_name,email,phone)
    VALUES (?,?,?)`;

    const valuesSupplier = [
        supplier.name,
        supplier.email,
        supplier.phone
    ]

    const [result] = await connection.execute(sqlSaveSupplier,valuesSupplier);

    console.log("Fornecedor cadastrado com sucesso! ✅");
    console.log("🆔: ", result.insertId);
    
}

module.exports = {saveSupplier};