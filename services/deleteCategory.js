const connection = require("../database/connection");
const time = require("../utils/time");
const pause = require("../utils/pause");

async function deleteCategory(user,rl,categoriesMenu,internalSystemMenu) {
    
    console.clear();
    console.log("📦 ============ EXCLUIR CATEGORIA ============ 📦\n");

    const sqlCategories = /* Cria a query para listar todas as categorias ativas. */
    `SELECT 
     id,
     name
     FROM categories
    WHERE active = 1;`

    const [categories] = await connection.execute(sqlCategories); /* Executa e armazena os rows em "categories", ignorando os fields retornados pelo MySQL. */

    if (categories.length === 0) { /* Verifica se existe pelo menos uma categoria cadastrada. */
        console.log("Nenhuma categoria cadastrado! 🚫");
        await pause(rl);
        return categoriesMenu(user,rl,internalSystemMenu); 
    }

    for (const category of categories) { /* Percorre todas as categorias para exibi-las ao usuário. */
        console.log(`${category.id}. ${category.name}`);
    }

    const selectCategory = Number(await rl.question("\n📌 - Selecione o ID da categoria que deseja excluir: ")); /* "selectCategory" recebe o ID da categoria escolhida. */

    const categoryExists = categories.find(category => category.id === selectCategory); /* Procura a categoria selecionada na lista de categorias. */

    if (!categoryExists) { /* Verifica se a categoria escolhida existe. */
        console.log("\nCategoria não encontrada! 🚫"); 
        await pause(rl);
        return categoriesMenu(user,rl,internalSystemMenu);   
    }

    const sqlDeleteCategory = /* Cria a query para desativar a categoria. */
    `UPDATE categories
     SET active = 0
    WHERE id = ?;`

    await connection.execute(sqlDeleteCategory,[selectCategory]); /* Executa a desativação da categoria no banco de dados. */
    const [updatedCategories] = await connection.execute(sqlCategories); /* Executa a consulta novamente para listar as categorias atualizadas. */

    await time(); /* Aguarda alguns segundos antes de exibir o resultado. */
    console.log("Categoria excluída com sucesso! ✅\n");

    console.log("📦 ============ CATEGORIAS ATUALIZADAS ============ 📦\n");

    for (const category of updatedCategories) { /* Percorre as categorias atualizadas para exibi-las ao usuário. */
        console.log(`🆔 : ${category.id}\n🪪  - Nome: ${category.name}\n`);
    }

    await pause(rl);
    return categoriesMenu(user,rl,internalSystemMenu); /* Retorna o usuário para o menu de categorias. */

}

module.exports = deleteCategory;