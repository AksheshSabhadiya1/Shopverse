
const express = require('express')
const cors = require('cors')
const app = express()
const port = 5000
const path = require('path')
const adminRouter = require('./routes/admin/adminRouter')
const userRouter = require('./routes/admin/userRouter')
const productRouter = require('./routes/admin/productRouter')

const corsOptions = {
    origin: 'http://localhost:5173',
    method: 'GET, POST, PUT, PATCH, HEAD',
    credentials: true
}

app.use(cors(corsOptions))
app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/admin', adminRouter)
app.use('/admin/users', userRouter)
app.use('/admin/products', productRouter)


app.get('/', (req, res)=>{
    res.send("Hello, i'm working......").end()
})

app.listen(port, ()=>{
    console.log(`server Started on port:${port}`);
})