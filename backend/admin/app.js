
const express = require('express')
const adminRouter = require('./routes/adminRouter')
const app = express()
const port = 5000

app.use(express.json())

app.use(adminRouter)

app.use('/', (req, res)=>{
    res.send("Hello, i'm working......").end()
})

app.listen(port, ()=>{
    console.log("Admin server Started");
})