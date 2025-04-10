const {Router} = require('express')
const userRouter = Router()
const db = require('../../config/database')
const {Base64} = require('js-base64')

userRouter.get('/', async(req, res)=>{
    const [products] = await db.execute('SELECT * FROM products')
    const result = products.map(product => ( {...product, image : Base64.decode(product.image) } ) )
    return res.json(result)
})

userRouter.post('/', async(req, res)=> {
    return res.end()
})

userRouter.get('/signin', async(req, res)=>{
    return res.send('signin')
})

userRouter.post('/signin', async(req, res)=>{
    const {email, password} = req.body
    const [userData] = await db.execute('SELECT * FROM users WHERE email=? and password=?',[email, password])
    userData.length > 0 ? res.json(userData) : res.status(401).json({ message: "Invalid Email or Password" })
})

userRouter.post('/signup', async(req, res)=>{
    const {firstname, lastname, email, mobile, password} = req.body
    await db.execute('INSERT INTO users (firstname,lastname,email,mobile,password) VALUES (?,?,?,?,?)',[firstname, lastname, email, mobile, password])
    return res.end()
})


module.exports = userRouter