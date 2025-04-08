
const express = require('express')
const adminRouter = require('./routes/adminRouter')
const cors = require('cors')
const app = express()
const port = 5000

const corsOptions = {
    origin: 'http://localhost:5173',
    method: 'GET, POST, PUT, PATCH, HEAD',
    credentials: true
}

app.use(cors(corsOptions))
app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.use('/admin',adminRouter)


app.get('/', (req, res)=>{
    res.send("Hello, i'm working......").end()
})

app.listen(port, ()=>{
    console.log("Admin server Started");
})