const connection = require("../database/connection");

async function validateEmailSupplier(email) {
    
    const sqlCheckEmail = 
    `SELECT 
     email
     FROM suppliers
    WHERE email = ?`;

    const [result] = await connection.execute(sqlCheckEmail,[email]);

    return result.length > 0;

}

module.exports = validateEmailSupplier;