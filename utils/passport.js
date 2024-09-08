var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
const UserService = require('../services/UserService')
var ConfigFile = require('../config')

const passportJWT = require('passport-jwt')
const JWTStrategy = passportJWT.Strategy
const ExtractJWT = passportJWT.ExtractJwt

passport.serializeUser((user, done) => { done(null, user) })
passport.deserializeUser((user, done) => { done(null, user) })

passport.use('login', new LocalStrategy({ usernameField: 'email', passReqToCallback: true }, function (req, email, password, done) {
    // Création du système de login avec comparaison des mots de passe
    UserService.loginUser(email, password, null, done)
}))

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: ConfigFile.secret_key,
    passReqToCallback: true,
}, function (req, jwt_payLoad, done) {
    // Dechiffrer  le token et lire les Information dedans.(_id) -> Pour rechercher l'utilisateur.

    UserService.findOneUserById(jwt_payLoad._id, null, function (err, value) {
        if (err)
            done(err)
        else if (value && value.token == "") {
            done(null, false, { msg: "unauthorized", type_error: 'no-valid' })
        }
        else
            done(null, value)
    })
}))

module.exports = passport