const connection = require("../database/connection");
const pause = require("../utils/pause");

async function totalInventoryValue(user,rl,reportsMenu,internalSystemMenu) {
    
    console.clear();
    console.log("💰 ============ VALOR TOTAL DO ESTOQUE ============ 💰\n");

    const sqlInventoryValue = /* Cria a query para calcular o valor total do estoque. */
    `SELECT SUM(quantity * price) AS totalStock
    FROM products;`

    const [result] = await connection.execute(sqlInventoryValue); /* Executa e armazena o resultado do cálculo. */

    const total = result[0].totalStock ?? 0; /* Define 0 caso não exista nenhum valor retornado. */

    console.log(`💰 - Valor total dos produtos do estoque: ${total}`);

    await pause(rl);
    return reportsMenu(user,rl,internalSystemMenu); /* Retorna o usuário para o menu de relatórios. */

}

module.exports = totalInventoryValue;