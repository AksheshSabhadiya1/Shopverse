const {Router} = require('express')
const { getWishlist, addToWishlist, removeWishlistById, clearWishlist } = require('../../controllers/user/wishlistController')
const { checkAuthCookie } = require('../../middleware/authToken')
const wishlistRouter = Router()


wishlistRouter.get('/wishlist', checkAuthCookie('userToken'), getWishlist)

wishlistRouter.post('/wishlist/addToWishlist', checkAuthCookie('userToken'), addToWishlist)

wishlistRouter.get('/wishlist/remove/:id', checkAuthCookie('userToken'), removeWishlistById)

wishlistRouter.get('/wishlist/clearWishlist', checkAuthCookie('userToken'), clearWishlist)

module.exports = wishlistRouter