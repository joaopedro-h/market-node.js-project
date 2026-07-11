const connection = require("../database/connection");
const time = require("../utils/time");
const pause = require("../utils/pause");

async function deleteProduct(user,rl,productsMenu,internalSystemMenu) {
    
    console.clear();
    console.log("📦 ============ EXCLUIR PRODUTO ============ 📦\n");

    const sqlProducts =
    `SELECT 
     p.id,
     p.name AS product_name,
     p.price,
     p.quantity,
     c.name AS category_name,
     s.company_name

     FROM products p

     JOIN categories c
     ON p.category_id  = c.id

     JOIN suppliers s
    ON p.supplier_id  = s.id;`

    const [products] = await connection.execute(sqlProducts);

    if (products.length === 0) {
        console.log("Nenhum produto cadastrado! 🚫");
        await pause(rl);
        return productsMenu(user,rl,internalSystemMenu);
    }

    for (const product of products) {
        console.log(`🆔 : ${product.id}\n🪪  - Nome: ${product.product_name}\n💰 - Preço: ${product.price}\n🔢 - Quantidade: ${product.quantity}\n🏷️  - Categoria: ${product.category_name}\n🚚 - Fornecedor: ${product.company_name}\n`);
    }

    const selectProduct = Number(await rl.question("\n📌 - Selecione o ID do produto que deseja excluir: "));

    const productExists = products.find(product => product.id === selectProduct);

    if (!productExists) {
        console.log("\nProduto não encontrado! 🚫"); 
        await pause(rl);
        return productsMenu(user,rl,internalSystemMenu);  
    }

    const sqlDeleteProduct =
    `DELETE FROM products
    WHERE id = ?;`

    await connection.execute(sqlDeleteProduct,[selectProduct]);
    const [updatedProducts] = await connection.execute(sqlProducts);

    await time();
    console.log("Produto excluído com sucesso! ✅\n");

    console.log("📦 ============ PRODUTOS ATUALIZADOS ============ 📦\n");

    for (const product of updatedProducts) {
        console.log(`🆔 : ${product.id}\n🪪  - Nome: ${product.company_name}\n📩 - Email: ${product.email}\n📞 - Telefone: ${product.phone}\n`);
    }

    await pause(rl);
    return productsMenu(user,rl,internalSystemMenu);

}

module.exports = deleteProduct;