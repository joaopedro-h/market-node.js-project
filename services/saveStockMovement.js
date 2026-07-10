const connection = require("../database/connection");
const time = require("../utils/time");

async function saveStockMovement(movement) {
    
    await time();
    
    const sqlSaveMovement =
    `INSERT INTO stock_movements (type,quantity,product_id,user_id)
    VALUES (?,?,?,?)`;

    const valuesMovement = [
        movement.type,
        movement.quantity,
        movement.productId,
        movement.userId
    ]

    const [result] = await connection.execute(sqlSaveMovement,valuesMovement);

    console.log("🆔 da movimentação: ", result.insertId);

}

module.exports = {saveStockMovement};