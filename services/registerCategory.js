const Category = require("../models/Category");
const {saveCategory} = require("./saveCategory");
const pause = require("../utils/pause");

async function registerCategory(user,rl,categoriesMenu,internalSystemMenu) {
    
    console.clear();
    console.log("📦 ============ CADASTRAR CATEGORIA ============ 📦\n");

    const categoryName = await rl.question(`🪪  - Insira o nome da categoria: `);

        if (!categoryName.trim()) {
            console.log("\nCampo inválido! 🚫");
            await pause(rl);
            return categoriesMenu(user,rl,internalSystemMenu);
        }

    const category = new Category(
        categoryName
    );

    await saveCategory(category);
    await pause(rl);
    return categoriesMenu(user,rl,internalSystemMenu);
    
}

module.exports = registerCategory;