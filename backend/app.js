
const express = require('express')
const cors = require('cors')
const app = express()
const port = 5000
const path = require('path')
const adminRouter = require('./routes/admin/adminRouter')
const adminUserRouter = require('./routes/admin/userRouter')
const adminProductRouter = require('./routes/admin/productRouter')
const userRouter = require('./routes/user/userRouter')
const productRouter = require('./routes/user/productRouter')
const { checkAuthCookie, checkAuthAdminCookie } = require('./middleware/authToken')
const cookieParser = require('cookie-parser')
const db = require('./config/database')
const cartRouter = require('./routes/user/cartRouter')

const corsOptions = {
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    method: 'GET, POST, PUT, PATCH, HEAD',
    credentials: true
}

app.use(cors(corsOptions))
app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.use(cookieParser())
app.use(checkAuthCookie('userToken'))
app.use(checkAuthAdminCookie('adminToken'))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/admin', adminRouter)
app.use('/admin/users', adminUserRouter)
app.use('/admin/products', adminProductRouter)
app.use(userRouter)
app.use(productRouter)
app.use(cartRouter)


app.listen(port, ()=>{
    console.log(`server Started on port:${port}`);
})