const connection = require("../database/connection");
const editProductName = require("../services/editProductName");
const editProductPrice = require("../services//editProductPrice");
const editProductCategory = require("../services//editProductCategory");
const editProductSupplier = require("../services//editProductSupplier");
const pause = require("../utils/pause");

async function productEditMenu(user,rl,productsMenu,internalSystemMenu) {
    
    console.clear();
    console.log("📦 ============ EDITAR PRODUTOS ============ 📦\n");

    const sqlProducts = /* Cria a query para listar todos os produtos cadastrados juntamente com suas categorias e fornecedores. */
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

    const [products] = await connection.execute(sqlProducts); /* Executa e armazena os rows em "products", ignorando os fields retornados pelo MySQL. */

    if (products.length === 0) { /* Verifica se existe algum produto cadastrado. */
        console.log("Nenhum produto cadastrado! 🚫");
        await pause(rl);
        return productsMenu(user,rl,internalSystemMenu);
    }

    for (const product of products) { /* Percorre e exibe todos os produtos cadastrados. */
        console.log(`🆔 : ${product.id}\n🪪  - Nome: ${product.product_name}\n💰 - Preço: ${product.price}\n🔢 - Quantidade: ${product.quantity}\n🏷️  - Categoria: ${product.category_name}\n🚚 - Fornecedor: ${product.company_name}\n`);
    }

    const productId = Number(await rl.question("📌 - Selecione o ID do produto que deseja editar: ")); /* "productId" recebe o ID do produto escolhido e converte a string em número. */

    const productExists = products.find(product => product.id === productId); /* Procura o produto informado dentro da lista de produtos cadastrados. */

    if (!productExists) { /* Verifica se o produto informado existe. */
        console.log("\nProduto não encontrado! 🚫"); 
        await pause(rl);
        return productsMenu(user,rl,internalSystemMenu);     
    }

    console.clear();
    console.log("1. Nome 🪪");
    console.log("2. Preço 💰");
    console.log("3. Categoria 🏷️");
    console.log("4. Fornecedor 🚚");    
    console.log("0. Voltar ↩️");
    
    let option = Number(await rl.question("\n📌 - Selecione a edição que deseja: ")); /* "option" recebe a opção escolhida pelo usuário e converte a string em número. */

        switch (option) {

            case 1:
                editProductName(user,rl,productsMenu,internalSystemMenu,productId); /* Redireciona o usuário para a função de alteração do nome do produto. */
                break;
            
            case 2:
                editProductPrice(user,rl,productsMenu,internalSystemMenu,productId); /* Redireciona o usuário para a função de alteração do preço do produto. */
                break;

            case 3:
                editProductCategory(user,rl,productsMenu,internalSystemMenu,productId); /* Redireciona o usuário para a função de alteração da categoria do produto. */
                break;

            case 4:
                editProductSupplier(user,rl,productsMenu,internalSystemMenu,productId); /* Redireciona o usuário para a função de alteração do fornecedor do produto. */
                break;

            case 0:
                console.log("\nVoltando.. ↩️");
                await pause(rl);
                return productsMenu(user,rl,internalSystemMenu); /* Retorna o usuário para o menu de produtos. */

            default:
                console.log("\nOpção inválida! 🚫"); /* Verifica se a opção escolhida não existe no menu. */
                await pause(rl);
                return productEditMenu(user,rl,productsMenu,internalSystemMenu);
        }        
}

module.exports = productEditMenu;