
const { Router } = require('express')
const adminRouter = Router()
const {getAdminHomepage, currentAdminData, postAdminHomepage, getSignin, postSignin, postSignup, logoutAdmin} = require('../../controllers/admin/adminController')

adminRouter.get('/', getAdminHomepage)
adminRouter.post('/', postAdminHomepage)

adminRouter.get('/currentAdmin',currentAdminData)

adminRouter.get('/signin', getSignin)
adminRouter.post('/signin', postSignin )

adminRouter.post('/signup', postSignup)

adminRouter.get('/logout', logoutAdmin)

module.exports = adminRouter