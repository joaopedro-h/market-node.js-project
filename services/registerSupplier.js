const Supplier = require("../models/Supplier");
const validateEmailSupplier = require("../validations/validateEmailSupplier");
const {saveSupplier} = require("./saveSupplier");
const pause = require("../utils/pause");

async function registerSupplier(user,rl,suppliersMenu,internalSystemMenu) {
    
    console.clear();
    console.log("🚚 ============ CADASTRAR FORNECEDOR ============ 🚚\n");

    const supplierName = await rl.question("🪪  - Insira o nome: "); /* "supplierName" recebe o nome informado pelo usuário. */

        if (!supplierName.trim()) { /* Verifica se o campo do nome foi preenchido. */
            console.log("\nCampo inválido! 🚫");
            await pause(rl);
            return registerSupplier(user,rl,suppliersMenu,internalSystemMenu);
        }

    const email = await rl.question ("\n📩 - Insira o email: "); /* "email" recebe o email informado pelo usuário. */

        if (!email.trim()) { /* Verifica se o campo do email foi preenchido. */
            console.log("\nCampo inválido! 🚫");
            await pause(rl);
            return registerSupplier(user,rl,suppliersMenu,internalSystemMenu);
        }

    const emailAlreadyExists = await validateEmailSupplier(email); /* Verifica se o email informado já está cadastrado. */

        if (emailAlreadyExists) {
            console.log("\nEmail já em uso! 🚫");
            await pause(rl);
            return registerSupplier(user,rl,suppliersMenu,internalSystemMenu);
        }

    const phone = await rl.question("\n📞 - Insira o telefone: "); /* "phone" recebe o telefone informado pelo usuário. */

        if (isNaN(phone) || phone <= 0) { /* Verifica se o telefone informado é numérico e maior que zero. */
            console.log("\nTelefone inválido! 🚫"); 
            await pause(rl);
            return registerSupplier(user,rl,suppliersMenu,internalSystemMenu);                              
        }

    const supplier = new Supplier( /* Cria um objeto "Supplier" com os dados informados pelo usuário. */
        supplierName,
        email,
        phone
    );

        await saveSupplier(supplier); /* Salva o fornecedor no banco de dados. */
        await pause(rl);
        return suppliersMenu(user,rl,internalSystemMenu); /* Retorna o usuário para o menu de fornecedores. */
}

module.exports = registerSupplier;