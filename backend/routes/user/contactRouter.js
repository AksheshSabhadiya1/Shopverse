const {Router} = require('express')
const contactRouter = Router()
const db = require('../../config/database')
const { getContactData } = require('../../controllers/user/contactController')

contactRouter.post('/contact', getContactData)

module.exports = contactRouter