const db = require('../../config/database')

const postCheckout = async(req, res)=>{

    if(!req.user) return res.status(401).end()

    const {firstname, lastname, floor, address, city, pincode, country, email, mobile, isSaveInfo, paymentType, subtotal, shippingCharge, total, products} = req.body
    const uniqueID = Math.floor(Math.random() * 1e6)
    const uniqueID2 = Math.floor(Math.random() * 1e6) 
    const paymentStatus = paymentType === 'Bank' ? "prepaid" : "unpaid";
        

    await db.execute("INSERT INTO checkout (id, user_id, firstname, lastname, email, floor, address, city, pincode, country, mobile, isSaveInfo, paymentType, subtotal, shippingCharge, total, allProducts_id_qty) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",[uniqueID, req.user.id,firstname,lastname,email,floor,address,city,pincode,country,mobile,isSaveInfo,paymentType,subtotal,shippingCharge,total, JSON.stringify(products)])

    await db.execute('INSERT INTO orders (id, user_id, checkout_id, total_price, payment_status, payment_method) VALUES (?,?,?,?,?,?)',[uniqueID2, req.user.id, uniqueID, total, paymentStatus, paymentType])

}

module.exports = {postCheckout}