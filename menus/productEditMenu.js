const connection = require("../database/connection");
const editProductName = require("../services/editProductName");
const editProductPrice = require("../services//editProductPrice");
const editProductCategory = require("../services//editProductCategory");
const editProductSupplier = require("../services//editProductSupplier");
const pause = require("../utils/pause");

async function productEditMenu(user,rl,productsMenu,internalSystemMenu) {
    
    console.clear();
    console.log("📦 ============ EDITAR PRODUTOS ============ 📦\n");

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

    const productId = await rl.question("📌 - Selecione o ID do produto que deseja editar: ");

    console.clear();
    console.log("1. Nome 🪪");
    console.log("2. Preço 💰");
    console.log("3. Categoria 🏷️");
    console.log("4. Fornecedor 🚚");    
    console.log("0. Voltar ↩️");
    
    let option = await rl.question("\n📌 - Selecione a edição que deseja: ");   

        option = Number(option);

        switch (option) {

            case 1:
                editProductName();
                break;
            
            case 2:
                editProductPrice();
                break;

            case 3:
                editProductCategory();
                break;

            case 4:
                editProductSupplier();
                break;

            case 0:
                console.log("\nVoltando.. ↩️");
                await pause(rl);
                return productsMenu(user,rl,internalSystemMenu);

            default:
                console.log("\nOpção inválida! 🚫");
                await pause(rl);
                return productEditMenu(user,rl,productsMenu,internalSystemMenu);
        }        
}

module.exports = productEditMenu;