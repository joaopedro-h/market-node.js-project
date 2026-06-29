const connection = require("../database/connection");
const pause = require("../utils/pause");

async function listCategories(rl,categoriesMenu) {
    
    console.clear();
    console.log("📦 ============ CATEGORIAS CADASTRADAS ============ 📦\n");

    const sqlCategories =
    `SELECT 
     id,
     name
    FROM categories;`

    const [categories] = await connection.execute(sqlCategories);

    for (const category of categories) {
        console.log(`${category.id}. ${category.name}`);
    }

    await pause(rl);
    return categoriesMenu(rl);

}

module.exports = listCategories;