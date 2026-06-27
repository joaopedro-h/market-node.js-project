const connection = require("../database/connection");
const time = require("../utils/time");

async function saveUser(user) {
    
    await time();
    
    const sqlSaveUser =
    `INSERT INTO users (user_name,email,password)
    VALUES (?,?,?)`;

    const valuesUser = [
        user.name,
        user.email,
        user.password
    ]

    const [result] = await connection.execute(sqlSaveUser,valuesUser);

    console.log("Cadastro realizado com sucesso! ✅");
    console.log("🆔: ", result.insertId);
    
}

module.exports = {saveUser};