const connection = require("../database/connection");
const pause = require("../utils/pause");

async function listCategories(user,rl,categoriesMenu,internalSystemMenu) {
    
    console.clear();
    console.log("📦 ============ CATEGORIAS CADASTRADAS ============ 📦\n");

    const sqlCategories =
    `SELECT 
     id,
     name
    FROM categories;`

    const [categories] = await connection.execute(sqlCategories);

    if (categories.length === 0) {
        console.log("Nenhuma categoria cadastrada! 🚫");
        await pause(rl);
        return categoriesMenu(user,rl,internalSystemMenu);
    }

    for (const category of categories) {
        console.log(`${category.id}. ${category.name}`);
    }

    await pause(rl);
    return categoriesMenu(user,rl,internalSystemMenu);

}

module.exports = listCategories;