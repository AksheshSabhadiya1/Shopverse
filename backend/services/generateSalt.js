
const { createHmac, randomBytes} = require('crypto')

const generateSalt = async(password) => {

    const salt = randomBytes(16).toString()
    const hashPassword = createHmac("sha256",salt).update(password).digest('hex')

    console.log("salt created");
    return {salt, hashPassword}
}

module.exports = {generateSalt}