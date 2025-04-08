
const { Router } = require('express')
const adminRouter = Router()
const db = require('../database/database')
const multer = require('multer')
const {Base64} = require('js-base64')


// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         return cb(null, './images/products')
//     },
//     filename: (req, file, cb) =>{
//         return cb(null, `${Date.now()}-${file.originalname}`)
//     }
// })

const storage = multer.memoryStorage()
const upload = multer({storage: storage});


adminRouter.get('/', (req, res)=>{
    return res.send("admin homepage").end()
})

adminRouter.post('/', (req, res)=>{

    const {name, age} = req.body
    console.log(name, age);
    return res.end()
})

adminRouter.get('/signin', async (req, res)=>{
    return res.send("Signin")
})

adminRouter.post('/signin', async (req, res)=>{
    const {email,password} = req.body
    const [admindata] = await db.execute('SELECT * FROM admin WHERE email=? and password=?',[email, password])

    admindata.length > 0 ? res.json(admindata) : res.status(401).json({ message: "Invalid credentials" })
})

adminRouter.post('/signup', async (req, res)=>{
    const {firstname,lastname,email,mobile,password} = req.body
    await db.execute('INSERT INTO admin (firstname,lastname,email,mobile,password) VALUES (?,?,?,?,?)' ,[firstname, lastname, email, mobile, password])
    return res.end()
})


adminRouter.get('/products', async(req, res)=>{

    const products = await db.execute('SELECT * FROM products')
    return res.json(products)
})

adminRouter.post('/products/addproduct', upload.single('image') , async(req, res)=>{

    try {
        const {productname, price, description, category, rating, rate_count, stock_count, brand} = req.body
        const image = Base64.encode(req.file?.originalname)
        await db.execute('INSERT INTO products (productname, price, description, category, image, rating, rate_count, stock_count, brand) VALUES (?,?,?,?,?,?,?,?,?)' ,[productname, price, description, category, image, rating,  rate_count, stock_count, brand])
        return res.json("Product Succesfully Inserted")
        
    } catch (error) {
        console.log("Error generated during product added");
    }
})


adminRouter.post('/editproduct/:id', async(req, res)=>{

    // const response = db.execute('SELECT * FROM products WHERE id=?',[req.params.id])
    
    const {productname, price, description, category, image, rating, rate_count, stock_count, brand} = req.body
    await db.execute('UPDATE products SET productname=?, price=?, description=?, category=?, image=?, rating=?, rate_count=?, stock_count=?, brand=?, updated_at=? WHERE id=? ' ,[productname, price, description, category, image, rating,  rate_count, stock_count, brand, CURRENT_TIMESTAMP, req.params.id])
    return res.json("Product Succesfully Updated")
})

module.exports = adminRouter