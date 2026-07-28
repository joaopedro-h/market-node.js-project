const Category = require("../models/Category");
const {saveCategory} = require("./saveCategory");
const pause = require("../utils/pause");

async function registerCategory(user,rl,categoriesMenu,internalSystemMenu) {
    
    console.clear();
    console.log("📦 ============ CADASTRAR CATEGORIA ============ 📦\n");

    const categoryName = await rl.question(`🪪  - Insira o nome da categoria: `); /* "categoryName" recebe o nome informado pelo usuário. */

        if (!categoryName.trim()) { /* Verifica se o campo do nome foi preenchido. */
            console.log("\nCampo inválido! 🚫");
            await pause(rl);
            return categoriesMenu(user,rl,internalSystemMenu);
        }

    const category = new Category( /* Cria um objeto "Category" com o nome informado pelo usuário. */
        categoryName
    );

    await saveCategory(category); /* Salva a categoria no banco de dados. */
    await pause(rl);
    return categoriesMenu(user,rl,internalSystemMenu); /* Retorna o usuário para o menu de categorias. */
    
}

module.exports = registerCategory;