
const { Router } = require('express')
const adminRouter = Router()
const {getAdminHomepage, postAdminHomepage, getSignin, postSignin, postSignup} = require('../controllers/adminController')

adminRouter.get('/', getAdminHomepage)
adminRouter.post('/', postAdminHomepage)

adminRouter.get('/signin', getSignin)
adminRouter.post('/signin', postSignin )

adminRouter.post('/signup', postSignup)


module.exports = adminRouter