const connection = require("../database/connection");
const time = require("../utils/time");

async function saveUser(user,rl,mainMenu,pause) {
    
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
    
    pause(rl, () => mainMenu(rl,pause));
}

module.exports = {saveUser};