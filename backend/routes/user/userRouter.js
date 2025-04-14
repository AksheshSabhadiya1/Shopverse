const {Router} = require('express')
const userRouter = Router()
const db = require('../../config/database')
const {Base64} = require('js-base64')
const { generateSalt } = require('../../services/generateSalt')
const { matchPasswordAndCreateToken } = require('../../services/matchPasswordAndCreateToken')

userRouter.get('/', (req, res)=>{
    return res.send("Hello i'm working.....")
})

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


userRouter.post('/', async(req, res)=> {
    return res.end()
})

userRouter.get('/signin', async(req, res)=>{
    return res.send('signin')
})

userRouter.post('/signin', async(req, res)=>{
    const {email, password} = req.body
    const [userData] = await db.execute('SELECT * FROM users WHERE email=? and password=?',[email, password])

    if(!userData) return res.status(401).json({error: "User not Found"})

    try {
        const userToken = await matchPasswordAndCreateToken(email,password)
        return res.cookie('userToken', userToken).redirect('/')
    } catch (error) {
        console.log("Error While UserCookie generted");
    }
    userData.length > 0 ? res.json(userData) : res.status(401).json({ error: "Invalid Email or Password" })
})

userRouter.post('/signup', async(req, res)=>{
    const {firstname, lastname, email, mobile, password} = req.body
    const {salt, hashPassword} = await generateSalt(password)
    await db.execute('INSERT INTO users (firstname,lastname,email,mobile,password,salt) VALUES (?,?,?,?,?,?)',[firstname, lastname, email, mobile, hashPassword, salt])
    return res.end()
})


userRouter.get('/user/logout', async(req, res)=>{
    return res.clearCookie('userToken').redirect('/')
})


module.exports = userRouter