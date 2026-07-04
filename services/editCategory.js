const connection = require("../database/connection");
const pause = require("../utils/pause");

async function editCategory(user,rl,categoriesMenu,internalSystemMenu) {
    
    console.clear();
    console.log("📦 ============ EDITAR CATEGORIA ============ 📦\n");

    const sqlCategories =
    `SELECT 
     id,
     name
    FROM categories;`

    const [categories] = await connection.execute(sqlCategories);

    for (const category of categories) {
        console.log(`${category.id}. ${category.name}`);
    }

    if (categories.length === 0) {
        console.log("Nenhuma categoria cadastrada! 🚫");
        await pause(rl);
        return categoriesMenu(user,rl,internalSystemMenu);
    }

    const selectCategory = await rl.question("\n📌 - Selecione a categoria que deseja editar: ");
    const categoryUpdated = await rl.question("\n🏷️  - Informe o novo nome da categoria: ")

    const sqlEditCategory =
    `UPDATE categories
     SET name = ?
    WHERE id = ?;`

    const editionValues = [
        categoryUpdated,
        selectCategory
    ]

    await connection.execute(sqlEditCategory,editionValues);
    const [updatedCategories] = await connection.execute(sqlCategories);

    console.clear();
    console.log("Categoria editada com sucesso! ✅\n");

    console.log("📦 ============ CATEGORIAS ATUALIZADAS ============ 📦\n");

    for (const category of updatedCategories) {
    console.log(`${category.id}. ${category.name}`);
    }

    await pause(rl);
    return categoriesMenu(user,rl,internalSystemMenu);

}

module.exports = editCategory;