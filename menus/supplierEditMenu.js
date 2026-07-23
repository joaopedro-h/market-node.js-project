const connection = require("../database/connection");
const editSupplierName = require("../services/editSupplierName");
const editSupplierEmail = require("../services/editSupplierEmail");
const editSupplierPhone = require("../services/editSupplierPhone");
const pause = require("../utils/pause");

async function supplierEditMenu(user,rl,suppliersMenu,internalSystemMenu) {
    
    console.clear();
    console.log("🚚 ============ EDITAR FORNECEDORES ============ 🚚\n");

    const sqlSuppliers = /* Cria a query para listar todos os fornecedores cadastrados. */
    `SELECT 
     id,
     company_name,
     email,
     phone
    FROM suppliers;`

    const [suppliers] = await connection.execute(sqlSuppliers); /* Executa e armazena os rows em "suppliers", ignorando os fields retornados pelo MySQL. */

    if (suppliers.length === 0) { /* Verifica se existe algum fornecedor cadastrado. */
        console.log("Nenhum fornecedor cadastrado! 🚫");
        await pause(rl);
        return suppliersMenu(user,rl,internalSystemMenu);
    }

    for (const supplier of suppliers) { /* Percorre e exibe todos os fornecedores cadastrados. */
        console.log(`🆔 : ${supplier.id}\n🪪  - Nome: ${supplier.company_name}\n📩 - Email: ${supplier.email}\n📞 - Telefone: ${supplier.phone}\n`);
    }

    const supplierId = Number(await rl.question("📌 - Selecione o ID do fornecedor que deseja editar: ")); /* "supplierId" recebe o ID do fornecedor escolhido e converte a string em número. */

    const supplierExists = suppliers.find(supplier => supplier.id === supplierId); /* Procura o fornecedor informado dentro da lista de fornecedores cadastrados. */

    if (!supplierExists) { /* Verifica se o fornecedor informado existe. */
        console.log("\nFornecedor não encontrado! 🚫"); 
        await pause(rl);
        return suppliersMenu(user,rl,internalSystemMenu);    
    }

    console.clear();
    console.log("1. Nome 🪪");
    console.log("2. Email 📩");
    console.log("3. Telefone 📞");
    console.log("0. Voltar ↩️");
    
    let option = Number(await rl.question("\n📌 - Selecione a edição que deseja: ")); /* "option" recebe a opção escolhida pelo usuário e converte a string em número. */

        switch (option) {

            case 1:
                editSupplierName(user,rl,suppliersMenu,internalSystemMenu,supplierId); /* Redireciona o usuário para a função de alteração do nome do fornecedor. */
                break;
            
            case 2:
                editSupplierEmail(user,rl,suppliersMenu,internalSystemMenu,supplierId); /* Redireciona o usuário para a função de alteração do email do fornecedor. */
                break;

            case 3:
                editSupplierPhone(user,rl,suppliersMenu,internalSystemMenu,supplierId); /* Redireciona o usuário para a função de alteração do telefone do fornecedor. */
                break;

            case 0:
                console.log("\nVoltando.. ↩️");
                await pause(rl);
                return suppliersMenu(user,rl,internalSystemMenu); /* Retorna o usuário para o menu de fornecedores. */

            default:
                console.log("\nOpção inválida! 🚫"); /* Verifica se a opção escolhida não existe no menu. */
                await pause(rl);
                return supplierEditMenu(user,rl,suppliersMenu,internalSystemMenu);
        }
}

module.exports = supplierEditMenu;