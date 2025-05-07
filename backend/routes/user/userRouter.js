const {Router} = require('express')
const userRouter = Router()
const { checkAuthCookie } = require('../../middleware/authToken')
const { getUser, userSignin, userSignup, userUpdatePassword, userUpdatePayment, userUpdateAddress, userLogout } = require('../../controllers/user/userController')


userRouter.get('/user', checkAuthCookie('userToken'), getUser);

userRouter.post('/signin', userSignin)
userRouter.post('/signup', userSignup)

userRouter.post('/updatePassword', userUpdatePassword)
userRouter.post('/updatePayment', userUpdatePayment)
userRouter.post('/updateAddress', userUpdateAddress)

userRouter.get('/user/logout', userLogout)


module.exports = userRouter