const {Router} = require('express')
const { getProducts, getProductsById, getProductsByCategory } = require('../../controllers/user/productController')
const productRouter = Router()


productRouter.get('/products', getProducts)

productRouter.get('/products/:id', getProductsById)

productRouter.get('/products/category/:props', getProductsByCategory)


module.exports = productRouter