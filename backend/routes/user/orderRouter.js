const { Router } = require("express");
const orderRouter = Router();
const db = require("../../config/database");
const {Base64} = require('js-base64')

orderRouter.get("/orderedProduct", async (req, res) => {
    const [products] = await db.execute("SELECT *, c.id as checkout_id FROM checkout c JOIN products p ON JSON_CONTAINS(c.allProducts_id, JSON_ARRAY(p.id))");
    const result = products.map(product => ({...product, image: Base64.decode(product.image)}))
    return res.json(result);
});

orderRouter.get('/orders', async(req, res)=>{
    const [allOrders] = await db.execute('SELECT *, orders.id as order_id, orders.created_at as order_date from (select distinct id,allProducts_id from checkout group by id) c join products p on JSON_CONTAINS(c.allProducts_id, JSON_ARRAY(p.id)) join orders on c.id = orders.checkout_id')
    const result = await allOrders.map(product => ( {...product, image: Base64.decode(product.image)}) )
    return res.json(result)
})

orderRouter.get("/orders/:id", async (req, res) => {
    const [[ordersData]] = await db.execute("SELECT * FROM orders join checkout on orders.checkout_id = checkout.id WHERE orders.id=?",[req.params.id]);
    return res.send(ordersData);
});

orderRouter.get('/cancellations', async(req, res)=>{
    const [allOrders] = await db.execute('SELECT *, orders.id as order_id, orders.created_at as order_date from (select distinct id,allProducts_id from checkout group by id) c join products p on JSON_CONTAINS(c.allProducts_id, JSON_ARRAY(p.id)) join orders on c.id = orders.checkout_id')
    const result = await allOrders.map(product => ( {...product, image: Base64.decode(product.image)}) )
    const filterCancelItems = await result.filter(item => item.order_status === 'returns')
    return res.json(filterCancelItems)
})

module.exports = orderRouter;
