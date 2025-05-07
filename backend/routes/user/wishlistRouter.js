const {Router} = require('express')
const { getWishlist, addToWishlist, removeWishlistById, clearWishlist } = require('../../controllers/user/wishlistController')
const wishlistRouter = Router()


wishlistRouter.get('/wishlist', getWishlist)

wishlistRouter.post('/wishlist/addToWishlist', addToWishlist)

wishlistRouter.get('/wishlist/remove/:id', removeWishlistById)

wishlistRouter.get('/wishlist/clearWishlist', clearWishlist)

module.exports = wishlistRouter