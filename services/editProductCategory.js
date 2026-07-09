const connection = require("../database/connection");
const pause = require("../utils/pause");

async function editProductCategory(user,rl,productsMenu,internalSystemMenu,productId) {
    
    console.clear();
    console.log("📦 ============ EDITAR CATEGORIA ============ 📦\n");

    const sqlCategories =
    `SELECT 
     id,
     name
    FROM categories;`

    const [categories] = await connection.execute(sqlCategories);

    if (categories.length === 0) {
        console.log("Nenhuma categoria cadastrada! 🚫");
        await pause(rl);
        return productsMenu(user,rl,internalSystemMenu);
        
    }

    for (const category of categories) {
        console.log(`${category.id}. ${category.name}\n`);
    }

    const newCategory = await rl.question(`📌 - Selecione o ID da nova categoria que deseja: `);
    
    const sqlEditCategory =
    `UPDATE products
     SET category_id = ?
    WHERE id = ?;`

    const valuesCategory = [
        newCategory,
        productId
    ]

    const [result] = await connection.execute(sqlEditCategory,valuesCategory);

    console.log("\nCategoria alterada com sucesso! ✅");

    await pause(rl);
    return productsMenu(user,rl,internalSystemMenu);

}

module.exports = editProductCategory;