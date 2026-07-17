const connection = require("../database/connection");
const pause = require("../utils/pause");

async function productsByCategory(user,rl,reportsMenu,internalSystemMenu) {
    
    console.clear();
    console.log("🏷️ ============ PRODUTOS POR CATEGORIA ============ 🏷️\n");

    const sqlCategories =
    `SELECT 
     id,
     name
    FROM categories
    ORDER BY id ASC;`

    const [categories] = await connection.execute(sqlCategories);

    if (categories.length === 0) {
        console.log("Nenhuma categoria cadastrada! 🚫");
        await pause(rl);
        return reportsMenu(user,rl,internalSystemMenu);  
    }

    for (const category of categories) {
        console.log(`${category.id}. ${category.name}`);
    }

    const idCategory = Number(await rl.question(`\n📌 - Escolha o ID da categoria: `));

    const categoryExists = categories.find(category => category.id === idCategory);

    if (!categoryExists) {
        console.log("\nCategoria não encontrada! 🚫"); 
        await pause(rl);
        return reportsMenu(user,rl,internalSystemMenu);      
    }
    
    const sqlProducts =
    `SELECT 
	 p.id AS "ID",
     p.name AS "Nome",
     p.price AS "Preço",
     p.quantity AS "Quantidade",
     c.name AS "Categoria"
    
     FROM products p
 
     JOIN categories c
     ON p.category_id = c.id
 
    WHERE c.id = ?`

    const [result] = await connection.execute(sqlProducts,[idCategory]);

    if (result.length === 0) {  
        console.log("\nNenhum produto cadastrado nessa categoria! ❌");
        await pause(rl);
        return reportsMenu(user,rl,internalSystemMenu);         
    }

    console.clear();
    console.log(`🏷️  ============ PRODUTOS DA CATEGORIA: ${result[0].Categoria} ============ 🏷️\n`);
    console.table(result);

    await pause(rl);
    return reportsMenu(user,rl,internalSystemMenu);

}

module.exports = productsByCategory;