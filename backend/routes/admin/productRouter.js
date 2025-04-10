const { Router } = require('express')
const productRouter = Router()
const multer = require('multer')
const {getAllProducts, getSlugProduct, addProduct, editProduct, deleteProduct } = require('../../controllers/admin/productController')

const diskstorage = multer.diskStorage({
    destination: (req, file, cb) => {
        return cb(null, './uploads/products')
    },
    filename: (req, file, cb) =>{
        uniqueNumber = Math.round(Math.random() * 1e9)
        req.uniqueNumber = uniqueNumber
        return cb(null, `${uniqueNumber}-${file.originalname}`)
    }
})

const storage = multer.memoryStorage()
const upload = multer({storage: storage, storage: diskstorage});


productRouter.get('/', getAllProducts)
productRouter.get('/:slug', getSlugProduct)

productRouter.post('/addproduct', upload.single('image') , addProduct)
productRouter.post('/editproduct/:id', upload.single('image'), editProduct)

productRouter.delete('/:id', deleteProduct)


module.exports = productRouter