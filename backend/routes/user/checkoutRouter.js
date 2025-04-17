
const {Router} = require('express')
const checkoutRouter = Router()
const db = require('../../config/database')

checkoutRouter.get('/checkout', async(req, res)=>{
    return res.json("checkout")
})

checkoutRouter.post('/checkout', async(req, res)=>{
    if(req.user){
        const {firstname, lastname, floor, address, city, pincode, country, email, mobile, isSaveInfo, paymentType, subtotal, shippingCharge, total} = req.body
    
        await db.execute("INSERT INTO checkout (user_id, firstname, lastname, email, floor, address, city, pincode, country, mobile, isSaveInfo, paymentType, subtotal, shippingCharge, total) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",[req.user.id,firstname,lastname,email,floor,address,city,pincode,country,mobile,isSaveInfo,paymentType,subtotal,shippingCharge,total])
        return res.status(201).end()
    }
    return res.end()
})

module.exports = checkoutRouter