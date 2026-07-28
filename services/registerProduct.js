const Product = require("../models/Product");
const connection = require("../database/connection");
const {saveProduct} = require("./saveProduct");
const time = require("../utils/time");
const pause = require("../utils/pause");

async function registerProduct(user,rl,productsMenu,internalSystemMenu) {
    
    console.clear();
    console.log("📦 ============ CADASTRAR PRODUTO ============ 📦\n");

    const sqlCategories = /* Cria a query para listar todas as categorias ativas. */
    `SELECT 
     id,
     name
     FROM categories
    WHERE active = 1;`

    const sqlSuppliers = /* Cria a query para listar todos os fornecedores ativos. */
    `SELECT 
     id,
     company_name,
     email,
     phone
     FROM suppliers
    WHERE active = 1;`

    const [categories] = await connection.execute(sqlCategories); /* Executa e armazena os rows em "categories", ignorando os fields retornados pelo MySQL. */

    if (categories.length === 0) { /* Verifica se existe pelo menos uma categoria cadastrada. */
        console.log("Nenhuma categoria cadastrada, cadastre uma categoria antes de cadastrar um produto! 🚫");
        await pause(rl);
        return productsMenu(user,rl,internalSystemMenu);
    }

    const [suppliers] = await connection.execute(sqlSuppliers); /* Executa e armazena os rows em "suppliers", ignorando os fields retornados pelo MySQL. */

   if (suppliers.length === 0) { /* Verifica se existe pelo menos um fornecedor cadastrado. */
        console.log("Nenhum fornecedor cadastrado, cadastre um fornecedor antes de cadastrar um produto! 🚫");
        await pause(rl);
        return productsMenu(user,rl,internalSystemMenu);
    }

    const productName = await rl.question(`🪪  - Insira o nome do produto: `); /* "productName" recebe o nome informado pelo usuário. */

        if (!productName.trim()) { /* Verifica se o campo do nome foi preenchido. */
            console.log("\nCampo inválido! 🚫");
            await pause(rl);
            return registerProduct(user,rl,productsMenu,internalSystemMenu); 
        }

    const productPrice = Number(await rl.question(`\n💰 - Insira o preço do produto: `)); /* "productPrice" recebe o preço informado e converte a string em número. */

        if (isNaN(productPrice) || productPrice <= 0) { /* Verifica se o preço informado é numérico e maior que zero. */
            console.log("\nValor inválido! 🚫"); 
            await pause(rl);
            return registerProduct(user,rl,productsMenu,internalSystemMenu);                                       
        }

    const productQuantity = Number(await rl.question(`\n🔢 - Insira a quantidade do produto: `)); /* "productQuantity" recebe a quantidade informada e converte a string em número. */

        if (isNaN(productQuantity) || productQuantity <= 0) { /* Verifica se a quantidade informada é numérica e maior que zero. */
            console.log("\nQuantidade inválida! 🚫"); 
            await pause(rl);
            return registerProduct(user,rl,productsMenu,internalSystemMenu);                               
        }

    await time();

    console.log("📦 ============ CATEGORIAS CADASTRADAS ============ 📦\n");
    for (const category of categories) { /* Percorre todas as categorias cadastradas para exibi-las ao usuário. */
        console.log(`${category.id}. ${category.name}`);
    }

    const productCategoryId = Number(await rl.question(`\n🆔 - Escolha o ID da categoria que deseja: `)); /* "productCategoryId" recebe o ID da categoria escolhida. */
    
    const categoryExists = categories.find(category => category.id === productCategoryId); /* Procura a categoria selecionada na lista de categorias. */

    if (!categoryExists) { /* Verifica se a categoria escolhida existe. */
        console.log("\nCategoria não encontrada! 🚫"); 
        await pause(rl); 
        return registerProduct(user,rl,productsMenu,internalSystemMenu);        
    }

    console.log("\n🚚 ============ FORNECEDORES CADASTRADOS ============ 🚚\n");
    for (const supplier of suppliers) { /* Percorre todos os fornecedores cadastrados para exibi-los ao usuário. */
        console.log(`🆔 : ${supplier.id}\n🪪  - Nome: ${supplier.company_name}\n📩 - Email: ${supplier.email}\n📞 - Telefone: ${supplier.phone}\n`);
    }

    const productSupplierId = Number(await rl.question(`\n🆔 - Escolha o ID do fornecedor que deseja: `)); /* "productSupplierId" recebe o ID do fornecedor escolhido. */

    const supplierExists = suppliers.find(supplier => supplier.id === productSupplierId); /* Procura o fornecedor selecionado na lista de fornecedores. */

    if (!supplierExists) { /* Verifica se o fornecedor escolhido existe. */
        console.log("\nFornecedor não encontrado! 🚫"); 
        await pause(rl); 
        return registerProduct(user,rl,productsMenu,internalSystemMenu);        
    }

    const product = new Product( /* Cria um objeto "Product" com os dados informados pelo usuário. */
        productName,
        Number(productPrice),
        Number(productQuantity),
        productCategoryId,
        productSupplierId
    );

    await saveProduct(product); /* Salva o produto no banco de dados. */
    await pause(rl);
    return productsMenu(user,rl,internalSystemMenu); /* Retorna o usuário para o menu de produtos. */

}

module.exports = registerProduct;