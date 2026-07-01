const connection = require("../database/connection");

async function validateEmailUser(email) {
    
    const sqlCheckEmail = 
    `SELECT 
     email
     FROM users
    WHERE email = ?`;

    const [result] = await connection.execute(sqlCheckEmail,[email]);

    return result.length > 0;

}

module.exports = validateEmailUser;