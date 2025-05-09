
const db = require('../../config/database')
const { generateSalt } = require('../../services/generateSalt')
const { matchPasswordAndCreateTokenForAdmin } = require('../../services/matchPasswordAndCreateToken')


const getAdminHomepage = async(req, res)=>{
    return res.send('admin Homepage')
}

const currentAdminData = async(req, res) => {
    
    if(!req.admin) return res.redirect('/admin/signin')
    
    const id = req.admin.id

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
        return res.cookie('adminToken', adminToken, { maxAge: 12 * 60 * 60 * 1000 }).redirect('/admin')
    } catch (error) {
        console.log("Error While AdminCookie generted");
    }
    admindata.length > 0 ? res.json(admindata) : res.status(401).json({ message: "Invalid Email or Password" })
}

const postSignup = async (req, res)=>{
    const {firstname,lastname,email,mobile,password} = req.body
    const {salt, hashPassword} = await generateSalt(password)
    const uniqueID = Math.floor(Math.random() * 1e6)
    await db.execute('INSERT INTO admin (id, firstname,lastname,email,mobile,password,salt) VALUES (?,?,?,?,?,?,?)' ,[uniqueID, firstname, lastname, email, mobile, hashPassword,salt])
    return res.end()
}

const logoutAdmin = async(req, res)=>{
    return res.clearCookie('adminToken').redirect('/')
}

module.exports = {getAdminHomepage, currentAdminData, postAdminHomepage, getSignin, postSignin, postSignup, logoutAdmin}