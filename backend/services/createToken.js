const jwt = require('jsonwebtoken')
require('dotenv').config()

const createTokenForUser = (user) => {
    const payload = {
        id: user.id
    }
    const userToken = jwt.sign(payload, process.env.jwt_secret)
    return userToken
}

const createTokenForAdmin = (admin) => {
    const payload = {
        id: admin.id
    }
    const adminToken = jwt.sign(payload, process.env.jwt_secret)
    return adminToken
}

const validateToken = (token) => {
    const payload = jwt.verify(token, process.env.jwt_secret)
    return payload
}

module.exports = {createTokenForUser, createTokenForAdmin, validateToken}