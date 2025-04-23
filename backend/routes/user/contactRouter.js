const {Router} = require('express')
const contactRouter = Router()
const db = require('../../config/database')

contactRouter.post('/contact', async(req, res)=>{

    if(!req.user) return res.status(401).end()

    const {email, firstname, lastname, mobile, message } = req.body
    const [[userData]] = await db.execute('SELECT id as user_id FROM users WHERE email=?',[email])
    const uniqueID = Math.floor(Math.random()* 1e16)
    
    if(userData){
        await db.execute('INSERT INTO contact (id, user_id, firstname, lastname, email, mobile, message) VALUES (?,?,?,?,?,?,?)' ,[uniqueID,userData.user_id, firstname, lastname, email, mobile, message])
    }
    return res.end()
})

module.exports = contactRouter