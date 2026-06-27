async function time() {
    
    console.clear();
    console.log("Processando...⏳");
    await new Promise(resolve => setTimeout(resolve, 2000));  /* Aguarda 2 segundos antes de continuar a execução do código, utilizando Promise e setTimeout. */
    console.clear()

}

module.exports = time;