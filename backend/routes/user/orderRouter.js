const { Router } = require("express");
const orderRouter = Router();
const db = require("../../config/database");
const {Base64} = require('js-base64')

orderRouter.get("/orderedProduct", async (req, res) => {
    const [products] = await db.execute("SELECT *, c.id as checkout_id FROM checkout c JOIN products p ON JSON_CONTAINS(c.allProducts_id, JSON_ARRAY(p.id))");
    const result = products.map(product => ({...product, image: Base64.decode(product.image)}))
    return res.json(result);
});

orderRouter.get("/orders", async(req, res)=>{
    const [orderData] = await db.execute("SELECT checkout_id, order_status, DATE(created_at) as order_date FROM orders")
    return res.json(orderData)
})

orderRouter.get("/orders/:id", async (req, res) => {
    const [[ordersData]] = await db.execute("SELECT * FROM orders join checkout on orders.checkout_id = checkout.id WHERE orders.id=?",[req.params.id]);
    return res.send(ordersData);
});

module.exports = orderRouter;
