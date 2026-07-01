const Category = require("../models/Category");
const {saveCategory} = require("./saveCategory");
const pause = require("../utils/pause");

async function registerCategory(rl,categoriesMenu) {
    
    console.clear();
    console.log("📦 ============ CADASTRAR CATEGORIA ============ 📦\n");

    const categoryName = await rl.question(`🏷️  - Insira o nome da categoria: `);

    const category = new Category(
        categoryName
    );

    await saveCategory(category);
    await pause(rl);
    return categoriesMenu(rl);
    
}

module.exports = registerCategory;