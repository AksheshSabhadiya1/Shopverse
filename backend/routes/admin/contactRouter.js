const {Router} = require('express')
const contactRouter = Router()
const {getContact} = require('../../controllers/admin/contactController')


contactRouter.get('/admin/contact', getContact)

module.exports = contactRouter