const connection = require("../database/connection");
const time = require("../utils/time");
const pause = require("../utils/pause");

async function deleteSupplier(user,rl,suppliersMenu,internalSystemMenu) {
    
    console.clear();
    console.log("🚚 ============ EXCLUIR FORNECEDOR ============ 🚚\n");

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
        return suppliersMenu(user,rl,internalSystemMenu);
    }

    for (const supplier of suppliers) { /* Percorre todos os fornecedores para exibi-los ao usuário. */
        console.log(`🆔 : ${supplier.id}\n🪪  - Nome: ${supplier.company_name}\n📩 - Email: ${supplier.email}\n📞 - Telefone: ${supplier.phone}\n`);
    }

    const selectSupplier = Number(await rl.question("\n📌 - Selecione o ID do fornecedor que deseja excluir: ")); /* "selectSupplier" recebe o ID do fornecedor escolhido. */

    const supplierExists = suppliers.find(supplier => supplier.id === selectSupplier); /* Procura o fornecedor selecionado na lista de fornecedores. */

    if (!supplierExists) { /* Verifica se o fornecedor escolhido existe. */
        console.log("\nFornecedor não encontrado! 🚫"); 
        await pause(rl);
        return suppliersMenu(user,rl,internalSystemMenu);    
    }

    const sqlDeleteSupplier = /* Cria a query para desativar o fornecedor. */
    `UPDATE suppliers
     SET active = 0
    WHERE id = ?;`

    await connection.execute(sqlDeleteSupplier,[selectSupplier]); /* Executa a desativação do fornecedor no banco de dados. */
    const [updatedSuppliers] = await connection.execute(sqlSuppliers); /* Executa a consulta novamente para listar os fornecedores atualizados. */

    await time(); /* Aguarda alguns segundos antes de exibir o resultado. */
    console.log("Fornecedor excluído com sucesso! ✅\n");

    console.log("🚚 ============ FORNECEDORES ATUALIZADOS ============ 🚚\n");

    for (const supplier of updatedSuppliers) { /* Percorre os fornecedores atualizados para exibi-los ao usuário. */
        console.log(`🆔 : ${supplier.id}\n🪪  - Nome: ${supplier.company_name}\n📩 - Email: ${supplier.email}\n📞 - Telefone: ${supplier.phone}\n`);
    }

    await pause(rl);
    return suppliersMenu(user,rl,internalSystemMenu); /* Retorna o usuário para o menu de fornecedores. */

}

module.exports = deleteSupplier;