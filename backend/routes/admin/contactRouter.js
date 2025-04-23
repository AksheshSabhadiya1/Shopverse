const {Router} = require('express')
const contactRouter = Router()
const db = require('../../config/database')


contactRouter.get('/admin/contact', async(req, res)=> {
    const [contactData] = await db.execute('SELECT * FROM contact')
    return res.json(contactData)
})

module.exports = contactRouter