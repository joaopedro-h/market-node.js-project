const connection = require("../database/connection");
const pause = require("../utils/pause");

async function editCategory(user,rl,categoriesMenu,internalSystemMenu) {
    
    console.clear();
    console.log("📦 ============ EDITAR CATEGORIA ============ 📦\n");

    const sqlCategories = /* Cria a query para listar todas as categorias ativas. */
    `SELECT 
     id,
     name
     FROM categories
    WHERE active = 1;`

    const [categories] = await connection.execute(sqlCategories); /* Executa e armazena os rows em "categories", ignorando os fields retornados pelo MySQL. */

    for (const category of categories) { /* Percorre todas as categorias para exibi-las ao usuário. */
        console.log(`${category.id}. ${category.name}`);
    }

    if (categories.length === 0) { /* Verifica se existe pelo menos uma categoria cadastrada. */
        console.log("Nenhuma categoria cadastrada! 🚫");
        await pause(rl);
        return categoriesMenu(user,rl,internalSystemMenu);
    }

    const selectCategory = Number(await rl.question("\n📌 - Selecione a categoria que deseja editar: ")); /* "selectCategory" recebe o ID da categoria escolhida. */

    const categoryExists = categories.find(category => category.id === selectCategory); /* Procura a categoria selecionada na lista de categorias. */

    if (!categoryExists) { /* Verifica se a categoria escolhida existe. */
        console.log("\nCategoria não encontrada! 🚫"); 
        await pause(rl);
        return categoriesMenu(user,rl,internalSystemMenu);   
    }

    const categoryUpdated = await rl.question("\n🏷️  - Informe o novo nome da categoria: "); /* "categoryUpdated" recebe o novo nome da categoria. */

    if (!categoryUpdated.trim()) { /* Verifica se o campo do nome foi preenchido. */
        console.log("\nCampo inválido! 🚫");
        await pause(rl);
        return categoriesMenu(user,rl,internalSystemMenu); 
    }

    const sqlEditCategory = /* Cria a query para atualizar o nome da categoria. */
    `UPDATE categories
     SET name = ?
    WHERE id = ?;`

    const editionValues = [ /* Valores que substituirão os "?" da query. */
        categoryUpdated,
        selectCategory
    ]

    await connection.execute(sqlEditCategory,editionValues); /* Executa a atualização da categoria no banco de dados. */
    const [updatedCategories] = await connection.execute(sqlCategories); /* Executa a consulta novamente para listar as categorias atualizadas. */

    console.clear();
    console.log("Categoria editada com sucesso! ✅\n");

    console.log("📦 ============ CATEGORIAS ATUALIZADAS ============ 📦\n");

    for (const category of updatedCategories) { /* Percorre as categorias atualizadas para exibi-las ao usuário. */
        console.log(`${category.id}. ${category.name}`);
    }

    await pause(rl);
    return categoriesMenu(user,rl,internalSystemMenu); /* Retorna o usuário para o menu de categorias. */

}

module.exports = editCategory;