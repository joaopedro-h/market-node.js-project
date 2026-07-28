const connection = require("../database/connection");
const time = require("../utils/time");
const pause = require("../utils/pause");

async function deleteProduct(user,rl,productsMenu,internalSystemMenu) {
    
    console.clear();
    console.log("📦 ============ EXCLUIR PRODUTO ============ 📦\n");

    const sqlProducts = /* Cria a query para listar todos os produtos ativos juntamente com sua categoria e fornecedor. */
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
     ON p.supplier_id  = s.id
    WHERE p.active = 1;`

    const [products] = await connection.execute(sqlProducts); /* Executa e armazena os rows em "products", ignorando os fields retornados pelo MySQL. */

    if (products.length === 0) { /* Verifica se existe pelo menos um produto cadastrado. */
        console.log("Nenhum produto cadastrado! 🚫");
        await pause(rl);
        return productsMenu(user,rl,internalSystemMenu);
    }

    for (const product of products) { /* Percorre todos os produtos para exibi-los ao usuário. */
        console.log(`🆔 : ${product.id}\n🪪  - Nome: ${product.product_name}\n💰 - Preço: ${product.price}\n🔢 - Quantidade: ${product.quantity}\n🏷️  - Categoria: ${product.category_name}\n🚚 - Fornecedor: ${product.company_name}\n`);
    }

    const selectProduct = Number(await rl.question("\n📌 - Selecione o ID do produto que deseja excluir: ")); /* "selectProduct" recebe o ID do produto escolhido. */

    const productExists = products.find(product => product.id === selectProduct); /* Procura o produto selecionado na lista de produtos. */

    if (!productExists) { /* Verifica se o produto escolhido existe. */
        console.log("\nProduto não encontrado! 🚫"); 
        await pause(rl);
        return productsMenu(user,rl,internalSystemMenu);  
    }

    const sqlDeleteProduct = /* Cria a query para desativar o produto. */
    `UPDATE products
     SET active = 0
    WHERE id = ?;`

    await connection.execute(sqlDeleteProduct,[selectProduct]); /* Executa a desativação do produto no banco de dados. */
    const [updatedProducts] = await connection.execute(sqlProducts); /* Executa a consulta novamente para listar os produtos atualizados. */

    await time(); /* Aguarda alguns segundos antes de exibir o resultado. */
    console.log("Produto excluído com sucesso! ✅\n");

    console.log("📦 ============ PRODUTOS ATUALIZADOS ============ 📦\n");

    for (const product of updatedProducts) { /* Percorre os produtos atualizados para exibi-los ao usuário. */
        console.log(`🆔 : ${product.id}\n🪪  - Nome: ${product.product_name}\n💰 - Preço: ${product.price}\n🔢 - Quantidade: ${product.quantity}\n🏷️  - Categoria: ${product.category_name}\n🚚 - Fornecedor: ${product.company_name}\n`);
    }

    await pause(rl);
    return productsMenu(user,rl,internalSystemMenu); /* Retorna o usuário para o menu de produtos. */

}

module.exports = deleteProduct;