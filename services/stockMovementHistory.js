const connection = require("../database/connection");
const pause = require("../utils/pause");

async function stockMovementHistory(user,rl,inventoryMovementsMenu,internalSystemMenu) {
    
    console.clear();
    console.log("📋 ============ MOVIMENTAÇÕES DO ESTOQUE ============ 📋\n");

    const sqlHistory = /* Cria a query para listar todas as movimentações do estoque. */
    `SELECT 
	 s.id AS "ID",
     s.type AS "Tipo",
     s.quantity AS "Quantidade",
     p.name AS "Produto",
     u.user_name AS "Usuário",
     s.date AS "Data"

     FROM stock_movements s
    
     JOIN products p
     ON s.product_id = p.id
    
     JOIN users u
     ON s.user_id = u.id
    ORDER BY s.id ASC;`

    const [result] = await connection.execute(sqlHistory); /* Executa e armazena os rows em "result", ignorando os fields retornados pelo MySQL. */

    if (result.length === 0) { /* Verifica se existe alguma movimentação registrada. */
        console.log("Nenhuma movimentação encontrada! 🚫");
        await pause(rl);
        return suppliersMenu(user,rl,internalSystemMenu);
    }

    console.table(result); /* Exibe todas as movimentações em formato de tabela. */

    await pause(rl);
    return inventoryMovementsMenu(user,rl,internalSystemMenu); /* Retorna o usuário para o menu de movimentações. */

}

module.exports = stockMovementHistory;