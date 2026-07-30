const connection = require("../database/connection");
const time = require("../utils/time");
const pause = require("../utils/pause");

async function reactivateCategory(user,rl,categoriesMenu,internalSystemMenu) {
    
    console.clear();
    console.log("📦 ============ REATIVAR CATEGORIA ============ 📦\n");

    const sqlCategories = /* Cria a query para listar todas as categorias desativadas. */
    `SELECT 
     id,
     name
     FROM categories
    WHERE active = 0;`

    const [categories] = await connection.execute(sqlCategories); /* Executa e armazena os rows em "categories", ignorando os fields retornados pelo MySQL. */

    if (categories.length === 0) { /* Verifica se existe pelo menos uma categoria cadastrada. */
        console.log("Nenhuma categoria cadastrado! 🚫");
        await pause(rl);
        return categoriesMenu(user,rl,internalSystemMenu); 
    }

    for (const category of categories) { /* Percorre todas as categorias para exibi-las ao usuário. */
        console.log(`${category.id}. ${category.name}`);
    }

    const selectCategory = Number(await rl.question("\n📌 - Selecione o ID da categoria que deseja reativar: ")); /* "selectCategory" recebe o ID da categoria escolhida. */

    const categoryExists = categories.find(category => category.id === selectCategory); /* Procura a categoria selecionada na lista de categorias. */

    if (!categoryExists) { /* Verifica se a categoria escolhida existe. */
        console.log("\nCategoria não encontrada! 🚫"); 
        await pause(rl);
        return categoriesMenu(user,rl,internalSystemMenu);   
    }

    const sqlReactivateCategory = /* Cria a query para reativar a categoria. */
    `UPDATE categories
     SET active = 1
    WHERE id = ?;`

    await connection.execute(sqlReactivateCategory,[selectCategory]); /* Executa a reativação da categoria no banco de dados. */
    const [updatedCategories] = await connection.execute(sqlCategories); /* Executa a consulta novamente para listar as categorias atualizadas. */

    await time(); /* Aguarda alguns segundos antes de exibir o resultado. */
    console.log("Categoria reativada com sucesso! ✅\n");

    console.log("📦 ============ CATEGORIAS ATUALIZADAS ============ 📦\n");

    for (const category of updatedCategories) { /* Percorre as categorias atualizadas para exibi-las ao usuário. */
        console.log(`🆔 : ${category.id}\n🪪  - Nome: ${category.name}\n`);
    }

    await pause(rl);
    return categoriesMenu(user,rl,internalSystemMenu); /* Retorna o usuário para o menu de categorias. */

}

module.exports = reactivateCategory;