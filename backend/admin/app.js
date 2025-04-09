
const express = require('express')
const adminRouter = require('./routes/adminRouter')
const cors = require('cors')
const productRouter = require('./routes/productRouter')
const userRouter = require('./routes/userRouter')
const app = express()
const port = 5000
const path = require('path')

const corsOptions = {
    origin: 'http://localhost:5173',
    method: 'GET, POST, PUT, PATCH, HEAD',
    credentials: true
}

app.use(cors(corsOptions))
app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/admin',adminRouter)
app.use('/admin/products',productRouter)
app.use('/admin/users',userRouter)


app.get('/', (req, res)=>{
    res.send("Hello, i'm working......").end()
})

app.listen(port, ()=>{
    console.log("Admin server Started");
})