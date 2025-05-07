
const {Router} = require('express')
const { postCheckout } = require('../../controllers/user/checkoutController')
const checkoutRouter = Router()


checkoutRouter.post('/checkout', postCheckout)

module.exports = checkoutRouter