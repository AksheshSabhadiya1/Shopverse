
const {Router} = require('express')
const orderRouter = Router()
const db = require('../../config/database')
const {Base64} = require('js-base64')


orderRouter.get('/', async(req, res)=>{
    const [orderData] = await db.execute('SELECT * FROM orders')
    return res.json(orderData)
})

orderRouter.get('/all', async(req, res)=>{
    const [allOrders] = await db.execute('SELECT *, orders.id as order_id from (select distinct id,allProducts_id from checkout group by id) c join products p on JSON_CONTAINS(c.allProducts_id, JSON_ARRAY(p.id)) join orders on c.id = orders.checkout_id')
    const result = await allOrders.map(product => ( {...product, image: Base64.decode(product.image)}) )
    return res.json(result)
})

orderRouter.get('/:orderid', async(req, res)=>{
    const [allOrders] = await db.execute('SELECT *, p.id as product_id ,orders.id as order_id from (select distinct id,allProducts_id from checkout group by id) c join products p on JSON_CONTAINS(c.allProducts_id, JSON_ARRAY(p.id)) join orders on c.id = orders.checkout_id')
    const result = await allOrders.map(product => ( {...product, image: Base64.decode(product.image)}) )
    const filterData = await result.filter(product => product.order_id === parseInt(req.params.orderid))
    return res.json(filterData)
})

orderRouter.post('/updateOrderStatus', async(req, res)=>{
    console.log(req.body);
    const {orderStatusList, orderid} = req.body
    await db.execute('UPDATE orders SET order_status=? WHERE id=?',[orderStatusList, orderid])
    return res.end()
})

module.exports = orderRouter