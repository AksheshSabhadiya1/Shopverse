require('dotenv').config()
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
const checkoutRouter = require('./routes/user/checkoutRouter')
const adminOrderRouter = require('./routes/admin/orderRouter')
const orderRouter = require('./routes/user/orderRouter')
const wishlistRouter = require('./routes/user/wishlistRouter')

const corsOptions = {
    origin: [process.env.frontend_url, process.env.admin_url],
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
app.use('/admin/orders', adminOrderRouter)
app.use(userRouter)
app.use(productRouter)
app.use(cartRouter)
app.use(checkoutRouter)
app.use(orderRouter)
app.use(wishlistRouter)


app.listen(port, ()=>{
    console.log(`server Started on port:${port}`);
})