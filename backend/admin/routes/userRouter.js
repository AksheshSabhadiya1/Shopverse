const { Router } = require('express')
const userRouter = Router()
const multer = require('multer')
const { getAllUsers, getUserById, deleteUserById } = require('../controllers/userController')

const diskstorage = multer.diskStorage({
    destination: (req, file, cb) => {
        return cb(null, './uploads/users')
    },
    filename: (req, file, cb) =>{
        uniqueNumber = Math.round(Math.random() * 1e9)
        req.uniqueNumber = uniqueNumber
        return cb(null, `${uniqueNumber}-${file.originalname}`)
    }
})


userRouter.get('/', getAllUsers)
userRouter.get('/:id', getUserById)

userRouter.delete('/:id', deleteUserById)


module.exports = userRouter