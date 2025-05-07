const db = require('../../config/database')
const {Base64} = require('js-base64')


const getProducts = async(req, res)=>{
    const [products] = await db.execute('SELECT * FROM products')
    const result = products.map(product => ({...product, image: Base64.decode(product.image)}))
    return res.json(result)
}

const getProductsById = async(req, res)=>{
    const [products] = await db.execute('SELECT * FROM products WHERE slug=?',[req.params.id])
    const result = products.map(product => ({...product, image: Base64.decode(product.image)}))
    return res.json(result)
}

const getProductsByCategory = async(req, res)=>{

    const [products] = await db.execute('SELECT * FROM products WHERE category=?',[req.params.props])
    const result = products.map(product => ({...product, image: Base64.decode(product.image)}))
    return res.json(result)
}

module.exports = {getProducts, getProductsById, getProductsByCategory}