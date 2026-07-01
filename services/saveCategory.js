const connection = require("../database/connection");
const time = require("../utils/time");

async function saveCategory(category) {
    
    await time();
    
    const sqlSaveCategory =
    `INSERT INTO categories (name)
    VALUES (?)`;

    const valuesCategory = [
        category.name
    ]

    const [result] = await connection.execute(sqlSaveCategory,valuesCategory);

    console.log("Categoria cadastrada com sucesso! ✅");
    console.log("🆔: ", result.insertId);
    
}

module.exports = {saveCategory};