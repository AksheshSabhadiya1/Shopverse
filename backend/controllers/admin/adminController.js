
const db = require('../../config/database')


const getAdminHomepage = async(req, res)=>{
    const [admindata] = await db.execute('SELECT * FROM admin limit 1')
    return res.send(admindata)
}

const postAdminHomepage = (req, res)=>{
    return res.end()
}

const getSignin =  async (req, res)=>{
    return res.send("Signin")
}

const postSignin = async (req, res)=>{
    const {email,password} = req.body
    const [admindata] = await db.execute('SELECT * FROM admin WHERE email=? and password=?',[email, password])

    admindata.length > 0 ? res.json(admindata) : res.status(401).json({ message: "Invalid Email or Password" })
}

const postSignup = async (req, res)=>{
    const {firstname,lastname,email,mobile,password} = req.body
    await db.execute('INSERT INTO admin (firstname,lastname,email,mobile,password) VALUES (?,?,?,?,?)' ,[firstname, lastname, email, mobile, password])
    return res.end()
}


module.exports = {getAdminHomepage, postAdminHomepage, getSignin, postSignin, postSignup}