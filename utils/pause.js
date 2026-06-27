async function pause(rl) {
    await rl.question("\n⏎ Pressione ENTER para continuar...");  /* Cria uma pausa no sistema e executa a função recebida no lugar de "next" após o ENTER. */
}

module.exports = pause;