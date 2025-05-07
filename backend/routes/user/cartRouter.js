
const {Router} = require('express')
const { getCart, addToCart, updateCartQtyById, removeFromCart, clearCart } = require('../../controllers/user/cartController')
const cartRouter = Router()


cartRouter.get('/cart', getCart)

cartRouter.post('/cart/addToCart', addToCart)

cartRouter.post('/cart/updateCart/:id', updateCartQtyById)

cartRouter.get('/cart/remove/:id', removeFromCart)

cartRouter.get('/cart/clearCart', clearCart)


module.exports = cartRouter