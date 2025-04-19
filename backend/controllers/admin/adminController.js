
const db = require('../../config/database')
const { generateSalt } = require('../../services/generateSalt')
const { matchPasswordAndCreateTokenForAdmin } = require('../../services/matchPasswordAndCreateToken')


const getAdminHomepage = async(req, res)=>{
    return res.send('admin Homepage')
}

const currentAdminData = async(req, res) => {
    const id = req.admin ? req.admin.id : null
    const [[admindata]] = await db.execute('SELECT * FROM admin WHERE id=?',[id])
    res.json(admindata)
    return admindata
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

    if(!admindata) return res.status(401).json({error: "Admin not Found"})

    try {
        const adminToken = await matchPasswordAndCreateTokenForAdmin(email,password)
        return res.cookie('adminToken', adminToken).redirect('/admin')
    } catch (error) {
        console.log("Error While AdminCookie generted");
    }
    admindata.length > 0 ? res.json(admindata) : res.status(401).json({ message: "Invalid Email or Password" })
}

const postSignup = async (req, res)=>{
    const {firstname,lastname,email,mobile,password} = req.body
    const {salt, hashPassword} = await generateSalt(password)
    const uniqueID = Math.floor(Math.random() * 1e16)
    await db.execute('INSERT INTO admin (id, firstname,lastname,email,mobile,password,salt) VALUES (?,?,?,?,?,?,?)' ,[uniqueID, firstname, lastname, email, mobile, hashPassword,salt])
    return res.end()
}

const logoutAdmin = async(req, res)=>{
    return res.clearCookie('adminToken').redirect('/')
}

module.exports = {getAdminHomepage, currentAdminData, postAdminHomepage, getSignin, postSignin, postSignup, logoutAdmin}