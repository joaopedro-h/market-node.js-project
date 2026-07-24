class Movement {
    constructor(type, quantity, productId, userId, date) {
        
        this.type = type; /* Armazena o tipo da movimentação (Entrada ou Saída). */
        this.quantity = quantity; /* Armazena a quantidade movimentada. */
        this.productId = productId; /* Armazena o ID do produto relacionado à movimentação. */
        this.userId = userId; /* Armazena o ID do usuário responsável pela movimentação. */
        this.date = date; /* Armazena a data da movimentação. */

    }
}

module.exports = Movement;