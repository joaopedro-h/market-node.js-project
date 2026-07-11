const connection = require("../database/connection");
const time = require("../utils/time");
const pause = require("../utils/pause");

async function deleteCategory(user,rl,categoriesMenu,internalSystemMenu) {
    
    console.clear();
    console.log("📦 ============ EXCLUIR CATEGORIA ============ 📦\n");

    const sqlCategories =
    `SELECT 
     id,
     name
    FROM categories;`

    const [categories] = await connection.execute(sqlCategories);

    if (categories.length === 0) {
        console.log("Nenhuma categoria cadastrado! 🚫");
        await pause(rl);
        return categoriesMenu(user,rl,internalSystemMenu); 
    }

    for (const category of categories) {
        console.log(`${category.id}. ${category.name}`);
    }

    const selectCategory = Number(await rl.question("\n📌 - Selecione o ID da categoria que deseja excluir: "));

    const categoryExists = categories.find(category => category.id === selectCategory);

    if (!categoryExists) {
        console.log("\nCategoria não encontrada! 🚫"); 
        await pause(rl);
        return categoriesMenu(user,rl,internalSystemMenu);   
    }

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
    return categoriesMenu(user,rl,internalSystemMenu);

}

module.exports = deleteCategory;