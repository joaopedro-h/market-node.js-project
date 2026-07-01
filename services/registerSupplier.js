const Supplier = require("../models/Supplier");
const {saveSupplier} = require("./saveSupplier");
const pause = require("../utils/pause");

async function registerSupplier(rl,suppliersMenu) {
    
    console.clear();
    console.log("🚚 ============ CADASTRAR FORNECEDOR ============ 🚚\n");

    const supplierName = await rl.question("🪪  - Insira o nome: ");

        const email = await rl.question ("\n📩 - Insira o email: ");

            const phone = await rl.question("\n📞 - Insira o telefone: ");

                const supplier = new Supplier(
                    supplierName,
                    email,
                    phone
                );

                await saveSupplier(supplier);
                await pause(rl);
                return suppliersMenu(rl);
}

module.exports = registerSupplier;