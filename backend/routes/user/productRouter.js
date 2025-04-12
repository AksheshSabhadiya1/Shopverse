const {Router} = require('express')
const productRouter = Router()
const db = require('../../config/database')
const {Base64} = require('js-base64')


productRouter.get('/products', async(req, res)=>{
    const [products] = await db.execute('SELECT * FROM products')
    const result = products.map(product => ({...product, image: Base64.decode(product.image)}))
    return res.json(result)
})

productRouter.get('/products/:id', async(req, res)=>{
    const [products] = await db.execute('SELECT * FROM products WHERE id=?',[req.params.id])
    const result = products.map(product => ({...product, image: Base64.decode(product.image)}))
    return res.json(result)
})


module.exports = productRouter