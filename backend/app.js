require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const port = 5000
const path = require('path')
const adminRouter = require('./routes/admin/adminRouter')
const adminUserRouter = require('./routes/admin/userRouter')
const adminProductRouter = require('./routes/admin/productRouter')
const userRouter = require('./routes/user/userRouter')
const productRouter = require('./routes/user/productRouter')
const { checkAuthCookie, checkAuthAdminCookie } = require('./middleware/authToken')
const cookieParser = require('cookie-parser')
const cartRouter = require('./routes/user/cartRouter')
const checkoutRouter = require('./routes/user/checkoutRouter')
const adminOrderRouter = require('./routes/admin/orderRouter')
const orderRouter = require('./routes/user/orderRouter')
const wishlistRouter = require('./routes/user/wishlistRouter')
const admincontactRouter = require('./routes/admin/contactRouter')
const contactRouter = require('./routes/user/contactRouter')
const { createTokenForUser, createTokenForAdmin } = require('./services/createToken')
const { authGoogleRouter, passport} = require('./middleware/authGoogle')
const { authGoogleAdminRouter, adminPassport } = require('./middleware/authGoogleAdmin')


const corsOptions = {
    origin: [process.env.frontend_url, process.env.admin_url],
    method: 'GET, POST, PUT, PATCH, HEAD',
    credentials: true
}

app.use(cors(corsOptions))
app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.use(cookieParser())
app.use(checkAuthCookie('userToken'))
app.use(checkAuthAdminCookie('adminToken'))

app.use(authGoogleRouter)
app.use(authGoogleAdminRouter)

app.get("/auth/google", passport.authenticate("google-user",{
    scope: ["profile", "email"]
}))

app.get("/auth/google/callback", (req, res, next) => {
    passport.authenticate("google-user", async (err, user) => {
        if (err || !user) {
            return res.redirect("http://localhost:5173/signin");
        }

        req.logIn(user, (err) => {
            if (err) return res.redirect("http://localhost:5173/signin");

            const userToken = createTokenForUser(user)
            res.cookie("userToken", userToken, {
                maxAge: 1 * 24 * 60 * 60 * 1000,
            });

            return res.redirect("http://localhost:5173");
        });
    })(req, res, next);
});


app.get("/admin/auth/google", adminPassport.authenticate("google-admin",{
    scope: ["profile", "email"]
}))

app.get("/admin/auth/google/callback", (req, res, next) => {
    adminPassport.authenticate("google-admin", async (err, admin) => {
        if (err || !admin) {
            return res.redirect("http://localhost:5174/admin/signin");
        }

        req.logIn(admin, (err) => {
            if (err) return res.redirect("http://localhost:5174/admin/signin");

            const adminToken = createTokenForAdmin(admin)
            res.cookie("adminToken", adminToken, {
                maxAge: 1 * 24 * 60 * 60 * 1000,
            });

            return res.redirect("http://localhost:5174/admin");
        });
    })(req, res, next);
});


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/admin', adminRouter)
app.use('/admin/users', adminUserRouter)
app.use('/admin/products', adminProductRouter)
app.use('/admin/orders', adminOrderRouter)
app.use('/admin/contact',admincontactRouter)
app.use(userRouter)
app.use(productRouter)
app.use(cartRouter)
app.use(checkoutRouter)
app.use(orderRouter)
app.use(wishlistRouter)
app.use(contactRouter)


app.listen(port, ()=>{
    console.log(`server Started on port:${port}`);
})