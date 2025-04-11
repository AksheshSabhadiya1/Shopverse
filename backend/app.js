
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

const corsOptions = {
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    method: 'GET, POST, PUT, PATCH, HEAD',
    credentials: true
}

app.use(cors(corsOptions))
app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/admin', adminRouter)
app.use('/admin/users', adminUserRouter)
app.use('/admin/products', adminProductRouter)
app.use(userRouter)
app.use(productRouter)


app.get('/', (req, res)=>{
    res.send("Hello, i'm working......").end()
})

app.listen(port, ()=>{
    console.log(`server Started on port:${port}`);
})