const connection = require("../database/connection");
const pause = require("../utils/pause");

async function listSuppliers(user,rl,suppliersMenu,internalSystemMenu) {
    
    console.clear();
    console.log("🚚 ============ FORNECEDORES CADASTRADOS ============ 🚚\n");

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

    await pause(rl);
    return suppliersMenu(user,rl,internalSystemMenu); /* Retorna o usuário para o menu de fornecedores. */

}

module.exports = listSuppliers;