const db = require('../../config/database')
const {Base64} = require('js-base64')


const getAllProducts = async(req, res)=>{
    const [products] = await db.execute('SELECT * FROM products')
    const result = products.map(product => ( {...product, image : Base64.decode(product.image) } ) )
    return res.json(result)
}

const getSlugProduct = async(req, res)=>{
    const [products] = await db.execute('SELECT * FROM products WHERE slug=?',[req.params.slug])
    const result = products.map(product => ( {...product, image : Base64.decode(product.image) } ) )
    return res.json(result)
}

const addProduct =  async(req, res)=>{

    try {
        const {productname, originalprice, sellingprice, description, category, rating, rate_count, stock_count, brand, productcolor, productsize} = req.body
        const size = JSON.parse(productsize)
        const color = JSON.parse(productcolor)
        const slug = productname.toLowerCase().replaceAll(' ','_')
        const image = Base64.encode(`${req.uniqueNumber}-${req.file?.originalname}`)
        const uniqueID = Math.floor(Math.random() * 1e6)

        await db.execute('INSERT INTO products (id, productname, originalprice, sellingprice, description, category, image, rating, rate_count, stock_count, brand, slug, productcolor, productsize) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)' ,[uniqueID, productname, originalprice, sellingprice, description, category, image, rating, rate_count, stock_count, brand, slug, JSON.stringify(color), JSON.stringify(size)])
        return res.json("Product Succesfully Inserted")
        
    } catch (error) {
        console.log("Error generated during product added", error);
    }
}

const editProduct = async(req, res)=>{
    try {
        const {productname, originalprice, sellingprice, description, category, rating, rate_count, stock_count, brand, productcolor, productsize} = req.body
        const size = JSON.parse(productsize)
        const color = JSON.parse(productcolor)
        const [[oldimage]] = await db.execute('SELECT image FROM products WHERE slug=?',[req.params.id])
        const image = req.file ? Base64.encode(`${req.uniqueNumber}-${req.file?.originalname}`) : oldimage.image
        const slug = productname.toLowerCase().replaceAll(' ','_')

        await db.execute('UPDATE products SET productname=?, originalprice=?, sellingprice=?, description=?, category=?, image=?, rating=?, rate_count=?, stock_count=?, brand=?, slug=?, productcolor=?, productsize=? WHERE slug=? ' ,[productname, originalprice, sellingprice, description, category, image, rating,  rate_count, stock_count, brand, slug, JSON.stringify(color), JSON.stringify(size), req.params.id])
        return res.json("Product Succesfully Updated")

    } catch (error) {
        console.log("Product not Updated",error);
    }
    
}

const deleteProduct = async(req, res)=>{
    try {
        const [result] = await db.execute('DELETE FROM products WHERE id=?',[req.params.id])
        if(result.affectedRows > 0){
            console.log("Product Deleted Successfully");
            return res.status(200).json({ message: "Product deleted successfully" });
        }else{
            console.log("Product Not Found");
            return res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        console.log("Product Not Deleted", error);
    }
}

module.exports = {getAllProducts, getSlugProduct, addProduct, editProduct, deleteProduct}