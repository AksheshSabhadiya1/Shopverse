const {Base64} = require('js-base64')
const db = require('../../config/database')


const getWishlist = async(req, res)=>{
    try {
        const [wishlist] = await db.execute('SELECT * FROM wishlist join products on wishlist.product_id = products.id')
        const result = wishlist.map(product => ({...product, image: Base64.decode(product.image) }))
        return res.json(result)
    } catch (error) {
        return res.status(404).end()
    }
}

const addToWishlist = async(req, res)=>{
    const {id} = req.body
    const [wishlistItem] = await db.execute('SELECT * FROM wishlist WHERE user_id=? AND product_id=?',[req.user.id, id])
    const [products] = await db.execute('SELECT * FROM products WHERE id=?',[id])
    const uniqueID = Math.floor(Math.random() * 1e16)

    if(wishlistItem.length > 0) {
        console.log("Already wishlisted");
        return res.json("Already wishlisted")
    } else {
        await db.execute('INSERT INTO wishlist (id, user_id, product_id) VALUES (?,?,?)',[uniqueID, req.user.id, id])
        await db.execute('UPDATE products SET isFavourite=? WHERE id=?',[!(products.isFavourite), id])
        console.log("wishlist inserted");
        return res.status(201).json("wishlist inserted")
    }
}

const removeWishlistById = async(req, res)=>{
    const [products] = await db.execute('SELECT * FROM products WHERE id=?',[parseInt(req.params.id)])
    console.log(products);
    if(req.user) {
        await db.execute('DELETE FROM wishlist WHERE user_id=? AND product_id=?',[req.user.id, parseInt(req.params.id)])
        await db.execute('UPDATE products SET isFavourite=? WHERE id=?',[!(products.isFavourite), parseInt(req.params.id)])
        return res.send("Deleted done")
    }
}

const clearWishlist = async(req, res)=>{
    if(req.user) {
        await db.execute('DELETE FROM wishlist WHERE user_id=?',[req.user.id])
        await db.execute('UPDATE products SET isFavourite=?',[0])
        return res.send("Deleted all")
    }
}

module.exports = {getWishlist, addToWishlist, removeWishlistById, clearWishlist}