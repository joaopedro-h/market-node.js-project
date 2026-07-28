const connection = require("../database/connection");
const pause = require("../utils/pause");

async function editProductCategory(user,rl,productsMenu,internalSystemMenu,productId) {
    
    console.clear();
    console.log("📦 ============ EDITAR CATEGORIA ============ 📦\n");

    const sqlCategories = /* Cria a query para listar todas as categorias ativas. */
    `SELECT 
     id,
     name
     FROM categories
    WHERE active = 1;`

    const [categories] = await connection.execute(sqlCategories); /* Executa e armazena os rows em "categories", ignorando os fields retornados pelo MySQL. */

    if (categories.length === 0) { /* Verifica se existe pelo menos uma categoria cadastrada. */
        console.log("Nenhuma categoria cadastrada! 🚫");
        await pause(rl);
        return productsMenu(user,rl,internalSystemMenu);
        
    }

    for (const category of categories) { /* Percorre todas as categorias para exibi-las ao usuário. */
        console.log(`${category.id}. ${category.name}\n`);
    }

    const newCategory = Number(await rl.question(`📌 - Selecione o ID da nova categoria que deseja: `)); /* "newCategory" recebe o ID da nova categoria escolhida. */

    const categoryExists = categories.find(category => category.id === newCategory); /* Procura a categoria selecionada na lista de categorias. */

    if (!categoryExists) { /* Verifica se a categoria escolhida existe. */
        console.log("\nCategoria não encontrada! 🚫"); 
        await pause(rl);
        return productsMenu(user,rl,internalSystemMenu);  
    }
    
    const sqlEditCategory = /* Cria a query para atualizar a categoria do produto. */
    `UPDATE products
     SET category_id = ?
    WHERE id = ?;`

    const valuesCategory = [ /* Valores que substituirão os "?" da query. */
        newCategory,
        productId
    ]

    const [result] = await connection.execute(sqlEditCategory,valuesCategory); /* Executa a atualização da categoria do produto, ignorando os fields retornados pelo MySQL. */

    console.log("\nCategoria alterada com sucesso! ✅");

    await pause(rl);
    return productsMenu(user,rl,internalSystemMenu); /* Retorna o usuário para o menu de produtos. */

}

module.exports = editProductCategory;