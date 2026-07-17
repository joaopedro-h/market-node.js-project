const connection = require("../database/connection");
const pause = require("../utils/pause");

async function inboundMovements(user,rl,reportsMenu,internalSystemMenu) {
    
    console.clear();
    console.log("📈 ============ MOVIMENTAÇÕES DE ENTRADA ============ 📈\n");

    const sqlInboundMovements =
    `SELECT 
	 s.id AS "ID",
     p.name "Nome",
     p.quantity AS "Quantidade",
     user_name "Usuário",
     s.date AS "Data"
    
     FROM stock_movements s

     JOIN products p
     ON s.product_id = p.id

     JOIN users u
     ON s.user_id = u.id

    WHERE type = "ENTRADA";`

    const [result] = await connection.execute(sqlInboundMovements);

    if (result.length === 0) {
        console.log("Nenhuma movimentação de entrada encontrada! 🚫");
        await pause(rl);
        return reportsMenu(user,rl,internalSystemMenu);
    }

    console.table(result);

    await pause(rl);
    return reportsMenu(user,rl,internalSystemMenu);  

}

module.exports = inboundMovements;