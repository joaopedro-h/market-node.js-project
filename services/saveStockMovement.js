const time = require("../utils/time");

async function saveStockMovement(conn,movement) {
    
    await time(); /* Aguarda alguns segundos antes de continuar a execução. */
    
    const sqlSaveMovement = /* Cria a query para registrar uma movimentação no estoque. */
    `INSERT INTO stock_movements (type,quantity,product_id,user_id)
    VALUES (?,?,?,?)`;

    const valuesMovement = [ /* Valores que substituirão os "?" da query, recebendo as informações do objeto "movement". */
        movement.type,
        movement.quantity,
        movement.productId,
        movement.userId
    ]

    const [result] = await conn.execute(sqlSaveMovement,valuesMovement); /* Executa e armazena os rows em "result", ignorando os fields retornados pelo MySQL. */

    console.log("🆔 da movimentação: ", result.insertId); /* Exibe o ID gerado automaticamente para a movimentação. */

}

module.exports = {saveStockMovement};