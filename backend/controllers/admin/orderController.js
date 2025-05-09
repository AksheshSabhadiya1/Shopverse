const db = require('../../config/database')
const {Base64} = require('js-base64')


const getOrders = async(req, res)=>{
        const [ordersDetails] = await db.execute("select *, o.id as order_id from checkout c join orders o on c.id = o.checkout_id")
        const [products] = await db.execute("Select * from products")
        let allProducts = [];
        let orderItems = [];
    
        ordersDetails.forEach(order => {
            try {
                allProducts.push(order.allProducts_id_qty.slice(1,))
                const [result] = allProducts.map(allitem => allitem.map(data=> products.find(product => product.id === data.product_id.toString())))
                const productresult = result.map(product => ({ ...product, image: Base64.decode(product.image)}));
                orderItems.push(productresult)
                allProducts.pop()

            } catch (err) {
                console.error("Failed to parse allProduct_id for order:", order.id, err);
            }
        });
        return res.json({orderItems, ordersDetails})
}

const getOrderById = async(req, res)=>{
        const [ordersDetails] = await db.execute("select *, o.id as order_id from checkout c join orders o on c.id = o.checkout_id WHERE o.id=?",[parseInt(req.params.orderid)])
    
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
}

const updateOrderStatus =  async(req, res)=>{
    const {orderStatusList, orderid} = req.body
    await db.execute('UPDATE orders SET order_status=? WHERE id=?',[orderStatusList, orderid])
    return res.end()
}


module.exports = {getOrders, getOrderById, updateOrderStatus}