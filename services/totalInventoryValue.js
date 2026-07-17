const connection = require("../database/connection");
const pause = require("../utils/pause");

async function totalInventoryValue(user,rl,reportsMenu,internalSystemMenu) {
    
    console.clear();
    console.log("💰 ============ VALOR TOTAL DO ESTOQUE ============ 💰\n");

    const sqlInventoryValue =
    `SELECT SUM(quantity * price) AS totalStock
    FROM products;`

    const [result] = await connection.execute(sqlInventoryValue);

    const total = result[0].totalStock ?? 0;

    console.log(`💰 - Valor total dos produtos do estoque: ${total}`);

    await pause(rl);
    return reportsMenu(user,rl,internalSystemMenu); 

}

module.exports = totalInventoryValue;