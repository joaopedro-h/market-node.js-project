const connection = require("../database/connection");
const time = require("../utils/time");
const pause = require("../utils/pause");

async function deleteCategory(rl,categoriesMenu) {
    
    console.clear();
    console.log("📦 ============ EXCLUIR CATEGORIA ============ 📦\n");

    const sqlCategories =
    `SELECT 
     id,
     name
    FROM categories;`

    const [categories] = await connection.execute(sqlCategories);

    for (const category of categories) {
        console.log(`${category.id}. ${category.name}`);
    }

    const selectCategory = await rl.question("\n📌 - Selecione a categoria que deseja excluir: ");

    const sqlDeleteCategory =
    `DELETE FROM categories
    WHERE id = ?;`

    await connection.execute(sqlDeleteCategory,[selectCategory]);
    const [updatedCategories] = await connection.execute(sqlCategories);

    await time();
    console.log("Categoria excluída com sucesso! ✅\n");

    console.log("📦 ============ CATEGORIAS ATUALIZADAS ============ 📦\n");

    for (const category of updatedCategories) {
    console.log(`🆔 : ${category.id}\n🪪  - Nome: ${category.name}`);
    }

    await pause(rl);
    return categoriesMenu(rl);

}

module.exports = deleteCategory;