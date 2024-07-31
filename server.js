// Importe le module Express et le module Lodash
const express = require("express");
const _ = require("lodash");

// Importe le module body-parser
const bodyparser = require("body-parser");

// Importe le fichier de configuration et le numéro de port
const config = require("./config");

// Crée une instance de l'application Express
const app = express();

//Demarrage de la database
require("./utils/database");
const passport = require('./utils/passport')

var session = require('express-session')
app.use(session({
    secret: config.secret_cookie,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}))

app.use(passport.initialize())
app.use(passport.session())

const Logger = require('./utils/logger').pino

const database_middleware = require('./middleware/database_middleware')
const addLogger = require('./middleware/logger_middleware')

// Utilise le middleware body-parser pour analyser les données JSON envoyées dans le corps des requêtes
app.use(bodyparser.json(), addLogger.Log);

// Importe le contrôleur pour les utilisateurs
const UserController = require('./controllers/UserController');
const CommentController = require('./controllers/CommentController');


// Définit une route pour connecter un utilisateur
app.post("/login", database_middleware.checkMongooseConnection, UserController.loginUser);

// <------------------------------------------------- Utilisateurs ----------------------------------------------------------->

// Définit une route pour ajouter un utilisateur
app.post("/user", database_middleware.checkMongooseConnection, UserController.addOneUser);

// Définit une route pour ajouter plusieurs utilisateurs
app.post(`/users`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), UserController.addManyUsers);

// Définit une route pour récupérer un utilisateur par Id
app.get(`/user/:id`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), UserController.findOneUserById);

// Définit une route pour récupérer un utilisateur
app.get(`/user`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), UserController.findOneUser);

// Définit une route pour récupérer plusieur utilisateurs
app.get(`/users_by_filters`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), UserController.findManyUsers);

// Définit une route pour récupérer plusieurs utilisateurs par Ids
app.get(`/users`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), UserController.findManyUserByIds);

// Définit une route pour mettre à jour un utilisateur
app.put(`/user/:id`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), UserController.updateOneUser);

// Définit une route pour mettre à jour plusieurs utilisateurs
app.put(`/users`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), UserController.updateManyUsers);

// Définit une route pour supprimer un utilisateur
app.delete(`/user/:id`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), UserController.deleteOneUser);

// Définit une route pour supprimer plusieurs utilisateurs
app.delete(`/users`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), UserController.deleteManyUsers);

// <------------------------------------------------- Comments ----------------------------------------------------------->

// Définit une route pour ajouter un utilisateur
app.post("/comment", database_middleware.checkMongooseConnection, CommentController.addOneComment);

// // Définit une route pour ajouter plusieurs utilisateurs
// app.post(`/comments`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), CommentController.addManyComments);

// // Définit une route pour récupérer un utilisateur par Id
// app.get(`/comment/:id`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), CommentController.findOneCommentById);

// // Définit une route pour récupérer un utilisateur
// app.get(`/comment`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), CommentController.findOneComment);

// // Définit une route pour récupérer plusieur utilisateurs
// app.get(`/comments_by_filters`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), CommentController.findManyComments);

// // Définit une route pour récupérer plusieurs utilisateurs par Ids
// app.get(`/comments`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), CommentController.findManyCommentByIds);

// // Définit une route pour mettre à jour un utilisateur
// app.put(`/comment/:id`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), CommentController.updateOneComment);

// // Définit une route pour mettre à jour plusieurs utilisateurs
// app.put(`/comments`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), CommentController.updateManyComments);

// // Définit une route pour supprimer un utilisateur
// app.delete(`/comment/:id`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), CommentController.deleteOneComment);

// // Définit une route pour supprimer plusieurs utilisateurs
// app.delete(`/Comments`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), CommentController.deleteManyComments);














// Démarre le serveur et affiche un message de log
app.listen(config.port, () => {
    Logger.info(`Le Serveur est démarré ${config.port}`)
});

module.exports = app