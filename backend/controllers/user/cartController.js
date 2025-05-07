const db = require('../../config/database')
const {Base64} = require('js-base64')

const getCart = async(req, res)=>{

    const [cart] = await db.execute('select * from products join cart on products.id = cart.product_id')
    const result = cart.map(item => ({...item, image: Base64.decode(item.image)}))
    return res.json(result)
}

const addToCart = async(req, res)=>{   
    
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
}

const updateCartQtyById = async(req, res)=>{

    const {value} = req.body
    await db.execute('UPDATE cart SET quantity = quantity + ? WHERE user_id=? AND product_id=?',[value,req.user.id,req.params.id])
    return res.json()
}

const removeFromCart =  async(req, res)=>{

    await db.execute('DELETE FROM cart WHERE product_id=?',[req.params.id])
    return res.send("Deleted done")
}

const clearCart = async(req, res)=>{

    await db.execute('DELETE FROM cart WHERE user_id=?',[req.user.id])
    return res.send("Deleted All")
}

module.exports = {getCart, addToCart, updateCartQtyById, removeFromCart, clearCart}