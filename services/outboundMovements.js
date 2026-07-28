const connection = require("../database/connection");
const pause = require("../utils/pause");

async function outboundMovements(user,rl,reportsMenu,internalSystemMenu) {
    
    console.clear();
    console.log("📉 ============ MOVIMENTAÇÕES DE SAÍDA ============ 📉\n");

    const sqlOutboundMovements = /* Cria a query para listar todas as movimentações de saída do estoque. */
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

    WHERE type = "SAÍDA";`

    const [result] = await connection.execute(sqlOutboundMovements); /* Executa e armazena os rows em "result", ignorando os fields retornados pelo MySQL. */

    if (result.length === 0) { /* Verifica se existe pelo menos uma movimentação de saída cadastrada. */
        console.log("Nenhuma movimentação de entrada encontrada! 🚫");
        await pause(rl);
        return reportsMenu(user,rl,internalSystemMenu);
    }

    console.table(result); /* Exibe as movimentações de saída em formato de tabela. */

    await pause(rl);
    return reportsMenu(user,rl,internalSystemMenu);  /* Retorna o usuário para o menu de relatórios. */

}

module.exports = outboundMovements;