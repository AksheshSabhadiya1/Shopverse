const { Router } = require("express");
const orderRouter = Router();
const db = require("../../config/database");
const { Base64 } = require("js-base64");

orderRouter.get("/orders", async (req, res) => {

    if(!req.user) return res.status(401).end()

    const [ordersDetails] = await db.execute("select * from checkout c join orders o on c.id = o.checkout_id where c.id=?",[3551771300267121])
    const [products] = await db.execute("Select * from products")
    let allProducts = [];

    ordersDetails.forEach(order => {
        try {
            allProducts = typeof order.allProducts_id_qty === 'string'
                ? JSON.parse(order.allProducts_id_qty)
                : order.allProducts_id_qty;
        } catch (err) {
            console.error("Failed to parse allProduct_id for order:", order.id, err);
        }
    });

    const productresult = products.filter(product=> allProducts.find(item => item.product_id === product.id))
    const orderItems = await productresult.map((product) => ({ ...product, image: Base64.decode(product.image)}));
    return res.json({orderItems, ordersDetails})
});

orderRouter.get("/orders/:orderid", async (req, res) => {

    if(!req.user) return res.status(401).end()

    const [ordersDetails] = await db.execute("select * from checkout c join orders o on c.id = o.checkout_id where o.id=?",[parseInt(req.params.orderid)])
    const [products] = await db.execute("Select * from products")
    let allProducts = [];

    ordersDetails.forEach(order => {
        try {
            allProducts = typeof order.allProducts_id_qty === 'string'
                ? JSON.parse(order.allProducts_id_qty)
                : order.allProducts_id_qty;
        } catch (err) {
            console.error("Failed to parse allProduct_id for order:", order.id, err);
        }
    });

    const productresult = products.filter(product=> allProducts.find(item => item.product_id === product.id))
    const orderItems = await productresult.map((product) => ({ ...product, image: Base64.decode(product.image)}));
    return res.json({orderItems, ordersDetails})
});

orderRouter.get("/cancellations", async (req, res) => {

    if(!req.user) return res.status(401).end()
        
    const [allOrders] = await db.execute(
        "SELECT *, orders.id as order_id, orders.created_at as order_date from (select distinct id,allProducts_id_qty from checkout group by id) c join products p on JSON_CONTAINS(c.allProducts_id_qty, JSON_ARRAY(p.id)) join orders on c.id = orders.checkout_id"
    );
    const result = await allOrders.map((product) => ({
        ...product,
        image: Base64.decode(product.image),
    }));
    const filterCancelItems = await result.filter(
        (item) => item.order_status === "returns"
    );
    return res.json(filterCancelItems);
});


module.exports = orderRouter;
