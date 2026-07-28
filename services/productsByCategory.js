const connection = require("../database/connection");
const pause = require("../utils/pause");

async function productsByCategory(user,rl,reportsMenu,internalSystemMenu) {
    
    console.clear();
    console.log("🏷️ ============ PRODUTOS POR CATEGORIA ============ 🏷️\n");

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
        return reportsMenu(user,rl,internalSystemMenu);  
    }

    for (const category of categories) { /* Percorre todas as categorias e exibe seus dados. */
        console.log(`${category.id}. ${category.name}`);
    }

    const idCategory = Number(await rl.question(`\n📌 - Escolha o ID da categoria: `));

    const categoryExists = categories.find(category => category.id === idCategory); /* Verifica se a categoria informada existe. */

    if (!categoryExists) {
        console.log("\nCategoria não encontrada! 🚫"); 
        await pause(rl);
        return reportsMenu(user,rl,internalSystemMenu);      
    }
    
    const sqlProducts = /* Cria a query para listar os produtos da categoria selecionada. */
    `SELECT 
	 p.id AS "ID",
     p.name AS "Nome",
     p.price AS "Preço",
     p.quantity AS "Quantidade",
     c.name AS "Categoria"
    
     FROM products p
 
     JOIN categories c
     ON p.category_id = c.id
 
    WHERE c.id = ? AND p.active = 1;`

    const [result] = await connection.execute(sqlProducts,[idCategory]); /* Executa a consulta utilizando o ID da categoria selecionada. */

    if (result.length === 0) { /* Verifica se existem produtos cadastrados na categoria escolhida. */
        console.log("\nNenhum produto cadastrado nessa categoria! ❌");
        await pause(rl);
        return reportsMenu(user,rl,internalSystemMenu);         
    }

    console.clear();
    console.log(`🏷️  ============ PRODUTOS DA CATEGORIA: ${result[0].Categoria} ============ 🏷️\n`);
    console.table(result); /* Exibe os produtos da categoria em formato de tabela. */

    await pause(rl);
    return reportsMenu(user,rl,internalSystemMenu); /* Retorna o usuário para o menu de relatórios. */

}

module.exports = productsByCategory;