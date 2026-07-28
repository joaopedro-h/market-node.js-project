const connection = require("../database/connection");
const pause = require("../utils/pause");

async function editProductSupplier(user,rl,productsMenu,internalSystemMenu,productId) {
    
    console.clear();
    console.log("📦 ============ EDITAR FORNECEDOR ============ 📦\n");

    const sqlSuppliers = /* Cria a query para listar todos os fornecedores ativos. */
    `SELECT 
     id,
     company_name,
     email,
     phone
     FROM suppliers
    WHERE active = 1;`

    const [suppliers] = await connection.execute(sqlSuppliers); /* Executa e armazena os rows em "suppliers", ignorando os fields retornados pelo MySQL. */

    if (suppliers.length === 0) { /* Verifica se existe pelo menos um fornecedor cadastrado. */
        console.log("Nenhum fornecedor cadastrado! 🚫");
        await pause(rl);
        return productsMenu(user,rl,internalSystemMenu);
    }

    for (const supplier of suppliers) { /* Percorre todos os fornecedores para exibi-los ao usuário. */
        console.log(`🆔 : ${supplier.id}\n🪪  - Nome: ${supplier.company_name}\n📩 - Email: ${supplier.email}\n📞 - Telefone: ${supplier.phone}\n`);
    }

    const newSupplier = Number(await rl.question(`📌 - Selecione o ID do novo fornecedor que deseja: `)); /* "newSupplier" recebe o ID do novo fornecedor escolhido. */

    const supplierExists = suppliers.find(supplier => supplier.id === newSupplier); /* Procura o fornecedor selecionado na lista de fornecedores. */

    if (!supplierExists) { /* Verifica se o fornecedor escolhido existe. */
        console.log("\nFornecedor não encontrado! 🚫"); 
        await pause(rl);
        return productsMenu(user,rl,internalSystemMenu); 
    }
    
    const sqlEditSupplier = /* Cria a query para atualizar o fornecedor do produto. */
    `UPDATE products
     SET supplier_id = ?
    WHERE id = ?;`

    const valuesSupplier = [ /* Valores que substituirão os "?" da query. */
        newSupplier,
        productId
    ]

    const [result] = await connection.execute(sqlEditSupplier,valuesSupplier); /* Executa a atualização do fornecedor do produto, ignorando os fields retornados pelo MySQL. */

    console.log("\nFornecedor alterado com sucesso! ✅");

    await pause(rl);
    return productsMenu(user,rl,internalSystemMenu); /* Retorna o usuário para o menu de produtos. */

}

module.exports = editProductSupplier;