const Product = require("../models/Product");
const connection = require("../database/connection");
const {saveProduct} = require("./saveProduct");
const time = require("../utils/time");
const pause = require("../utils/pause");

async function registerProduct(user,rl,productsMenu,internalSystemMenu) {
    
    console.clear();
    console.log("📦 ============ CADASTRAR PRODUTO ============ 📦\n");

    const sqlCategories =
    `SELECT 
     id,
     name
    FROM categories;`

    const sqlSuppliers =
    `SELECT 
     id,
     company_name,
     email,
     phone
    FROM suppliers;`

    const [categories] = await connection.execute(sqlCategories);

    if (categories.length === 0) {
        console.log("Nenhuma categoria cadastrada, cadastre uma categoria antes de cadastrar um produto! 🚫");
        await pause(rl);
        return productsMenu(user,rl,internalSystemMenu);
    }

    const [suppliers] = await connection.execute(sqlSuppliers);

   if (suppliers.length === 0) {
        console.log("Nenhum fornecedor cadastrado, cadastre um fornecedor antes de cadastrar um produto! 🚫");
        await pause(rl);
        return productsMenu(user,rl,internalSystemMenu);
    }

    const productName = await rl.question(`🪪  - Insira o nome do produto: `);

        const productPrice = await rl.question(`\n💰 - Insira o preço do produto: `);

        if (isNaN(productPrice) || productPrice <= 0) {
            console.log("Valor inválido! 🚫"); 
            await pause(rl);
            return registerProduct(user,rl,productsMenu,internalSystemMenu);                               
        }

            const productQuantity = await rl.question(`\n🔢 - Insira a quantidade do produto: `);

            if (isNaN(productQuantity) || productQuantity <= 0) {
                console.log("Quantidade inválida! 🚫"); 
                await pause(rl);
                return registerProduct(user,rl,productsMenu,internalSystemMenu);                               
            }

    await time();

    console.log("📦 ============ CATEGORIAS CADASTRADAS ============ 📦\n");
    for (const category of categories) {
        console.log(`${category.id}. ${category.name}`);
    }

    const categoryId = await rl.question(`\n🆔 - Escolha o ID da categoria que deseja: `);

    console.log("\n🚚 ============ FORNECEDORES CADASTRADOS ============ 🚚\n");
    for (const supplier of suppliers) {
        console.log(`🆔 : ${supplier.id}\n🪪  - Nome: ${supplier.company_name}\n📩 - Email: ${supplier.email}\n📞 - Telefone: ${supplier.phone}\n`);
    }

    const supplierId = await rl.question(`\n🆔 - Escolha o ID do fornecedor que deseja: `);

    const product = new Product(
        productName,
        Number(productPrice),
        Number(productQuantity),
        categoryId,
        supplierId
    );

    await saveProduct(product);
    await pause(rl);
    return productsMenu(user,rl,internalSystemMenu);

}

module.exports = registerProduct;