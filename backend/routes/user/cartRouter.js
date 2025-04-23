
const {Router} = require('express')
const cartRouter = Router()
const db = require('../../config/database')
const {Base64} = require('js-base64')


cartRouter.get('/cart', async(req, res)=>{

        const [cart] = await db.execute('select * from products join cart on products.id = cart.product_id')
        const result = cart.map(item => ({...item, image: Base64.decode(item.image)}))
        return res.json(result)
})

cartRouter.post('/cart/addToCart', async(req, res)=>{   
    
    if(req.user){
        const {id} = req.body
        const [cartItem] = await db.execute('SELECT * FROM cart WHERE user_id=? AND product_id=?',[req.user.id,id])
        const uniqueID = Math.floor(Math.random() * 1e16)

        if(cartItem.length > 0){
            await db.execute('UPDATE cart SET quantity = quantity + ? WHERE user_id=? AND product_id=?',[1,req.user.id,id])
        }else{
            await db.execute('INSERT INTO cart (id, user_id, product_id, quantity) VALUES (?,?,?,?)',[uniqueID, req.user.id, id, 1])
        }
        return res.json();
    } else {
        return res.send(req.body)
    }
})

cartRouter.post('/cart/updateCart/:id', async(req, res)=>{

    const {value} = req.body
    await db.execute('UPDATE cart SET quantity = quantity + ? WHERE user_id=? AND product_id=?',[value,req.user.id,req.params.id])
    return res.json()
})


cartRouter.get('/cart/remove/:id', async(req, res)=>{

    await db.execute('DELETE FROM cart WHERE product_id=?',[req.params.id])
    return res.send("Deleted done")
})

cartRouter.get('/cart/clearCart', async(req, res)=>{

    await db.execute('DELETE FROM cart WHERE user_id=?',[req.user.id])
    return res.send("Deleted All")
})


module.exports = cartRouter