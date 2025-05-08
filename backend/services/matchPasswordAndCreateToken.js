const {createHmac} = require('crypto')
const db = require('../config/database')
const { createTokenForUser, createTokenForAdmin } = require('./createToken')

const matchPasswordAndCreateToken = async (email, password) => {
    const [[user]] = await db.execute('SELECT * FROM users WHERE email=?', [email])

    if(!user) throw new Error('User Not Found!')

    const salt = user.salt
    const hashPassword = user.password
    const userPassword = createHmac("sha256", salt).update(password).digest('hex')

    if(hashPassword !== userPassword ) throw new Error('Incorrect Email or Password')
    const userToken = createTokenForUser(user)
    return userToken
}

const matchPasswordAndCreateTokenForAdmin = async (email, password) => {
    const [[admin]] = await db.execute('SELECT * FROM admin WHERE email=?', [email])
    
    if(!admin) throw new Error('Admin Not Found!')

    const salt = admin.salt
    const hashPassword = admin.password
    const adminPassword = createHmac("sha256", salt).update(password).digest('hex')

    if(hashPassword !== adminPassword ) throw new Error('Incorrect Email or Password')

    const adminToken = createTokenForAdmin(admin)
    return adminToken
}

module.exports = {matchPasswordAndCreateToken, matchPasswordAndCreateTokenForAdmin}