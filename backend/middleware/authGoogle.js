const db = require("../config/database");
const { Router } = require("express");
const authGoogleRouter = Router();
const session = require("express-session");
const passport = require("passport");
const OAuth20Strategy = require("passport-google-oauth20").Strategy;
const {generateSalt} = require('../services/generateSalt')

authGoogleRouter.use(
    session({
        secret: process.env.client_session_secret,
        resave: false,
        saveUninitialized: true,
    })
);

authGoogleRouter.use(passport.initialize());
authGoogleRouter.use(passport.session());

passport.use("google-user",
    new OAuth20Strategy(
        {
            clientID: process.env.client_id,
            clientSecret: process.env.client_secret,
            callbackURL: "/auth/google/callback",
            scope: ["profile", "email"],
        },
        async (accessToken, refreshToken, profile, callback) => {
            try {
                const [users] = await db.execute("SELECT * FROM users WHERE id = ?", [profile.id]);
                if (users.length === 0) {
                    const {salt, hashPassword} = await generateSalt(profile.id)
                    
                    await db.execute(
                        "INSERT INTO users (id, firstname, email, profile_picture, password, salt) VALUES (?, ?, ?, ?, ?, ?)",
                        [ profile.id, profile.displayName, profile.emails[0].value, profile.photos[0].value, hashPassword, salt]);
                    const [newUser] = await db.execute( "SELECT * FROM users WHERE id = ?", [profile.id]);
                    return callback(null, newUser[0]);
                }
                return callback(null, users[0]);
            } catch (error) {
                return callback(error, null);
            }
        }
    )
);


passport.serializeUser((user, callback) => {
    callback(null, user.id);
});

passport.deserializeUser(async(id, callback) => {
    try {
        const [users] = await db.execute('SELECT * FROM users WHERE id = ?', [id]);
        callback(null, users[0]);
    } catch (err) {
        callback(err, null);
    }
});

module.exports = { authGoogleRouter, passport };
