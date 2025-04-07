
const { Router } = require('express')
const adminRouter = Router()
const db = require('../database/database')

adminRouter.get('/', (req, res)=>{
    return res.send("adminRouter Data").end()
})

adminRouter.post('/', (req, res)=>{
    const {name, age} = req.body
    console.log(name, age);
    return res.end()
})


adminRouter.post('/signup', async (req, res)=>{
    const {firstname,lastname,email,mobile,password} = req.body
    await db.execute('INSERT INTO admin (firstname,lastname,email,mobile,password,created_at, updated_at) VALUES (?,?,?,?,?,?,?)' ,[firstname, lastname, email, mobile, password, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP ])
    return res.end()
})

adminRouter.post('/signin', async (req, res)=>{
    const {email,password} = req.body
    await db.execute('SELECT * FROM admin WHERE email=? and password=?',[email, password])
    return res.end()
})

module.exports = adminRouter