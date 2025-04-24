const { validateToken } = require("../services/createToken")


const checkAuthCookie = (cookievalue) => {
    return (req, res, next) => {
        const token = req.cookies[cookievalue]

        if(!token) return next()

        try {
            const payload = validateToken(token)
            req.user = payload
        } catch (error) {
            console.log("Error Generated during checkAuthCookie", error);
        }
        return next()
    }
}

const checkAuthAdminCookie = (cookievalue) => {
    return (req, res, next) => {
        const token = req.cookies[cookievalue]

        if(!token) return next()

        try {
            const payload = validateToken(token)
            req.admin = payload
        } catch (error) {
            console.log("Error Generated during checkAuthAdminCookie", error);
        }
        return next()
    }
}


module.exports = {checkAuthCookie, checkAuthAdminCookie}