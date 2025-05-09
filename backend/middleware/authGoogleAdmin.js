const db = require("../config/database");
const { Router } = require("express");
const authGoogleAdminRouter = Router();
const session = require("express-session");
const adminPassport = require("passport");
const OAuth20Strategy = require("passport-google-oauth20").Strategy;
const {generateSalt} = require('../services/generateSalt')

authGoogleAdminRouter.use(
    session({
        secret: process.env.admin_session_secret,
        resave: false,
        saveUninitialized: true,
    })
);

authGoogleAdminRouter.use(adminPassport.initialize());
authGoogleAdminRouter.use(adminPassport.session());


adminPassport.use("google-admin",
    new OAuth20Strategy(
        {
            clientID: process.env.admin_client_id,
            clientSecret: process.env.admin_client_secret,
            callbackURL: "/admin/auth/google/callback",
            scope: ["profile", "email"],
        },
        async (accessToken, refreshToken, profile, callback) => {
            try {
                const [admin] = await db.execute("SELECT * FROM admin WHERE id=?", [profile.id]);

                if (admin.length === 0) {
                    const {salt, hashPassword} = await generateSalt(profile.id)                    
                    await db.execute( "INSERT INTO admin (id, firstname, email, password, salt) VALUES (?, ?, ?, ?, ?)",
                        [ profile.id, profile.displayName, profile.emails[0].value, hashPassword, salt]);
                    
                    const [newAdmin] = await db.execute( "SELECT * FROM admin WHERE id=?", [profile.id]);
                    return callback(null, newAdmin[0]);
                }
                return callback(null, admin[0]);
            } catch (error) {
                return callback(error, null);
            }
        }
    )
);


adminPassport.serializeUser((admin, callback) => {
    callback(null, admin.id);
});

adminPassport.deserializeUser(async(id, callback) => {
    try {
        const [admin] = await db.execute('SELECT * FROM admin WHERE id = ?', [id]);
        callback(null, admin[0]);
    } catch (err) {
        callback(err, null);
    }
});


module.exports = {authGoogleAdminRouter, adminPassport}