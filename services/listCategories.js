const connection = require("../database/connection");
const pause = require("../utils/pause");

async function listCategories(user,rl,categoriesMenu,internalSystemMenu) {
    
    console.clear();
    console.log("📦 ============ CATEGORIAS CADASTRADAS ============ 📦\n");

    const sqlCategories = /* Cria a query para listar todas as categorias ativas. */
    `SELECT 
     id,
     name
     FROM categories
     WHERE active = 1
    ORDER BY id ASC;`

    const [categories] = await connection.execute(sqlCategories); /* Executa e armazena os rows em "categories", ignorando os fields retornados pelo MySQL. */

    if (categories.length === 0) { /* Verifica se existe pelo menos uma categoria cadastrada. */
        console.log("Nenhuma categoria cadastrada! 🚫");
        await pause(rl);
        return categoriesMenu(user,rl,internalSystemMenu);
    }

    for (const category of categories) { /* Percorre todas as categorias para exibi-las ao usuário. */
        console.log(`${category.id}. ${category.name}`);
    }

    await pause(rl);
    return categoriesMenu(user,rl,internalSystemMenu); /* Retorna o usuário para o menu de categorias. */

}

module.exports = listCategories;