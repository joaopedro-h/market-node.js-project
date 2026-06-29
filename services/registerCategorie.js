const connection = require("../database/connection");
const pause = require("../utils/pause");

async function registerCategorie(rl,categoriesMenu) {
    
    console.clear();
    console.log("📦 ============ CADASTRAR CATEGORIA ============ 📦\n");

    const categoryName = await rl.question(`🏷️  - Insira o nome da categoria: `);

    const sqlSaveCategory =
    `INSERT INTO categories(name)
    VALUES (?)`;

    const [result] = await connection.execute(sqlSaveCategory,[categoryName]);

    console.log("\nCategoria cadastrada com sucesso! ✅");
    console.log("🆔: ", result.insertId);

    await pause(rl);
    return categoriesMenu(rl);
    
}

module.exports = registerCategorie;