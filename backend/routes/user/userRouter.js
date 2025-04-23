const {Router} = require('express')
const userRouter = Router()
const db = require('../../config/database')
const {Base64} = require('js-base64')
const {createHmac} = require('crypto')
const { generateSalt } = require('../../services/generateSalt')
const { matchPasswordAndCreateToken } = require('../../services/matchPasswordAndCreateToken')


userRouter.get('/user', async (req, res) => {
    try {
        const id = req.user?.id;
        if (!id) return res.status(401).json({ error: 'Unauthorized: User not logged in' });

        const [[user]] = await db.execute('SELECT * FROM users WHERE id = ?', [id]);

        if (!user) return res.status(404).json({ error: 'User not found' });

        res.json(user);
        return user
    } catch (err) {
        console.error('Error fetching user:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


userRouter.post('/signin', async(req, res)=>{
    const {email, password} = req.body
    const [userData] = await db.execute('SELECT * FROM users WHERE email=? and password=?',[email, password])

    if(!userData) return res.status(401).json({error: "User not Found"})

    try {
        const userToken = await matchPasswordAndCreateToken(email,password)
        return res.cookie('userToken', userToken, { maxAge: 12 * 60 * 60 * 1000 }).redirect('/')
    } catch (error) {
        console.log("Error While UserCookie generted");
    }
    userData.length > 0 ? res.json(userData) : res.status(401).json({ error: "Invalid Email or Password" })
})

userRouter.post('/signup', async(req, res)=>{
    const {firstname, lastname, email, mobile, password} = req.body
    const [[userData]] = await db.execute('SELECT * FROM users WHERE email=?',[email])
    const uniqueID = Math.floor(Math.random() * 1e16)
    if(userData){
        const {gender, address} = req.body
        await db.execute('UPDATE users SET firstname=? ,lastname=?, email=?, mobile=?, gender=?, address=? WHERE email=?',[firstname, lastname, email, mobile, gender, address, email])
        return res.end()
    } else {
        const {salt, hashPassword} = await generateSalt(password)
        await db.execute('INSERT INTO users (id, firstname,lastname,email,mobile,password,salt) VALUES (?,?,?,?,?,?,?)',[uniqueID, firstname, lastname, email, mobile, hashPassword, salt])
        return res.end()
    }
})

userRouter.post('/updatePassword', async(req, res)=>{

    if(!req.user) return res.status(401).end()

    const {current_password, new_password, salt, password, email} = req.body
    
    const currentPassword = createHmac("sha256",salt).update(current_password).digest('hex')
    if(currentPassword !== password) return res.end('Incorrect Password')

    const [[userData]] = await db.execute('SELECT * FROM users WHERE email=? and password=?',[email, currentPassword])
    if(!userData) return res.status(401).end('User Not Found!')

    if(userData){
        const {salt: newSalt, hashPassword: newHashPassword} = await generateSalt(new_password)
        await db.execute('UPDATE users SET password=?, salt=? WHERE email=?',[newHashPassword, newSalt, email])
        return res.end()
    }
})

userRouter.post('/updatePayment', async(req, res)=>{

    if(!req.user) return res.status(401).end()

    const {payment, email} = req.body
    const [[userData]] = await db.execute('SELECT * FROM users WHERE email=?',[email])

    if(!userData) return res.status(401).end('User Not Found!')

    if(userData){
        await db.execute('UPDATE users SET payment_method=? WHERE email=?',[payment, email])
        return res.end()
    }
})

userRouter.post('/updateAddress', async(req, res)=>{

    if(!req.user) return res.status(401).end()

    const {defaultAddress, email} = req.body
    const [[userData]] = await db.execute('SELECT * FROM users WHERE email=?',[email])

    if(!userData) return res.status(401).end('User Not Found!')

    if(userData){
        await db.execute('UPDATE users SET address=? WHERE email=?',[defaultAddress, email])
        return res.end()
    }
})

userRouter.get('/user/logout', async(req, res)=>{

    if(!req.user) return res.status(401).end()
        
    return res.clearCookie('userToken').redirect('/')
})


module.exports = userRouter