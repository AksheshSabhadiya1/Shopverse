
const {Router} = require('express')
const orderRouter = Router()
const {getOrders, getOrderById, updateOrderStatus} = require('../../controllers/admin/orderController')


orderRouter.get('/', getOrders)

orderRouter.get('/:orderid', getOrderById)

orderRouter.post('/updateOrderStatus', updateOrderStatus)

module.exports = orderRouter