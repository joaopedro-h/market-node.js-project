const bcrypt = require('bcrypt');

async function encryptPassword(password) {
    
    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(password,saltRounds);

    return hashPassword;

}

module.exports = encryptPassword;