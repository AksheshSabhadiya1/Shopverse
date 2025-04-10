const {Router} = require('express')
const userRouter = Router()
const db = require('../database/database')
const {Base64} = require('js-base64')

userRouter.get('/', async(req, res)=>{
    const [products] = await db.execute('SELECT * FROM products')
    const result = products.map(product => ( {...product, image : Base64.decode(product.image) } ) )
    return res.json(result)
})


module.exports = userRouter