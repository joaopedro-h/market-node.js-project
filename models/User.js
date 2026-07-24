class User {
    constructor(name, email, password) {
        
        this.name = name; /* Armazena o nome do usuário. */
        this.email = email; /* Armazena o email do usuário. */
        this.password = password; /* Armazena a senha criptografada do usuário. */

    }
}

module.exports = User;