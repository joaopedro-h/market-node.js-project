const Supplier = require("../models/Supplier");
const validateEmailSupplier = require("../validations/validateEmailSupplier");
const {saveSupplier} = require("./saveSupplier");
const pause = require("../utils/pause");

async function registerSupplier(user,rl,suppliersMenu,internalSystemMenu) {
    
    console.clear();
    console.log("🚚 ============ CADASTRAR FORNECEDOR ============ 🚚\n");

    const supplierName = await rl.question("🪪  - Insira o nome: ");

        if (!supplierName.trim()) {
            console.log("\nCampo inválido! 🚫");
            await pause(rl);
            return registerSupplier(user,rl,suppliersMenu,internalSystemMenu);
        }

    const email = await rl.question ("\n📩 - Insira o email: ");

        if (!email.trim()) {
            console.log("\nCampo inválido! 🚫");
            await pause(rl);
            return registerSupplier(user,rl,suppliersMenu,internalSystemMenu);
        }

    const emailAlreadyExists = await validateEmailSupplier(email);

        if (emailAlreadyExists) {
            console.log("\nEmail já em uso! 🚫");
            await pause(rl);
            return registerSupplier(user,rl,suppliersMenu,internalSystemMenu);
        }

    const phone = await rl.question("\n📞 - Insira o telefone: ");

        if (isNaN(phone) || phone <= 0) {
            console.log("\nTelefone inválido! 🚫"); 
            await pause(rl);
            return registerSupplier(user,rl,suppliersMenu,internalSystemMenu);                              
        }

    const supplier = new Supplier(
        supplierName,
        email,
        phone
    );

        await saveSupplier(supplier);
        await pause(rl);
        return suppliersMenu(user,rl,internalSystemMenu);
}

module.exports = registerSupplier;