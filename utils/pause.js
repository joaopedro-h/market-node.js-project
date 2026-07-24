async function pause(rl) {
    await rl.question("\n⏎ Pressione ENTER para continuar...");  /* Aguarda o usuário pressionar ENTER antes de continuar a execução do sistema. */
}

module.exports = pause;