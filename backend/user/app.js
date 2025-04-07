
const express = require('express')
const app = express()
const port = 4000

app.use(express.json())
app.use('/', (req, res)=>{
    res.send("Hello, i'm working......").end()
})

app.listen(port, ()=>{
    console.log("User server Started");
})