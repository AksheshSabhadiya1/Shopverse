const {Router} = require('express')
const contactRouter = Router()
const {getContact} = require('../../controllers/admin/contactController')


contactRouter.get('/', getContact)

module.exports = contactRouter