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
const BoardController = require('./controllers/BoardController');
const TaskController = require('./controllers/TaskController');
const LabelController = require('./controllers/LabelController');

// Définit une route pour connecter un utilisateur
app.post("/login", database_middleware.checkMongooseConnection, UserController.loginUser);

// Définit une route pour deconnecter un utilisateur
app.post("/logout", database_middleware.checkMongooseConnection, UserController.logoutUser);

// <---------------------------------------------------------- Utilisateurs ------------------------------------------------------------------>

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

// <-------------------------------------------------------------- Board ----------------------------------------------------------------------->

// Définit une route pour ajouter un Tableau
app.post("/board", database_middleware.checkMongooseConnection, BoardController.addOneBoard);

// // Définit une route pour ajouter plusieurs Tableaux
app.post(`/boards`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), BoardController.addManyBoards);

// // Définit une route pour récupérer un Tableau par Id
app.get(`/board/:id`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), BoardController.findOneBoardById);

// // Définit une route pour récupérer un Tableau
app.get(`/board`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), BoardController.findOneBoard);

// // Définit une route pour récupérer plusieur Tableaux
app.get(`/boards_by_filters`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), BoardController.findManyBoards);

// // Définit une route pour récupérer plusieurs Tableaux par Ids
app.get(`/boards`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), BoardController.findManyBoardByIds);

// // Définit une route pour mettre à jour un Tableau
app.put(`/board/:id`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), BoardController.updateOneBoard);

// // Définit une route pour mettre à jour plusieurs Tableaux
app.put(`/boards`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), BoardController.updateManyBoards);

// // Définit une route pour supprimer un Tableau
app.delete(`/board/:id`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), BoardController.deleteOneBoard);

// // Définit une route pour supprimer plusieurs Tableaux
app.delete(`/boards`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), BoardController.deleteManyBoards);

// <--------------------------------------------------------------- Taches ------------------------------------------------------------------------------->

// Définit une route pour ajouter un utilisateur
app.post("/task", database_middleware.checkMongooseConnection, TaskController.addOneTask);

// Définit une route pour ajouter plusieurs utilisateurs
// app.post(`/tasks`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), TaskController.addManyTasks);

// Définit une route pour récupérer un utilisateur par Id
// app.get(`/task/:id`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), TaskController.findOneTaskById);

// Définit une route pour récupérer un utilisateur
// app.get(`/task`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), TaskController.findOneTask);

// Définit une route pour récupérer plusieur utilisateurs
// app.get(`/tasks_by_filters`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), TaskController.findManyTasks);

// Définit une route pour récupérer plusieurs utilisateurs par Ids
// app.get(`/tasks`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), TaskController.findManyTaskByIds);

// Définit une route pour mettre à jour un utilisateur
// app.put(`/task/:id`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), TaskController.updateOneTask);

// Définit une route pour mettre à jour plusieurs utilisateurs
// app.put(`/tasks`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), TaskController.updateManyTasks);

// Définit une route pour supprimer un utilisateur
// app.delete(`/task/:id`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), TaskController.deleteOneTask);

// Définit une route pour supprimer plusieurs utilisateurs
// app.delete(`/tasks`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), TaskController.deleteManyTasks);

// <----------------------------------------------------------- Label ------------------------------------------------------------------------->

// Définit une route pour ajouter un Commentaire
// app.post("/label", database_middleware.checkMongooseConnection, LabelController.addOneLabel);

// // Définit une route pour ajouter plusieurs Commentaires
// app.post(`/labels`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), LabelController.addManyLabels);

// // Définit une route pour récupérer un Commentaire par Id
// app.get(`/label/:id`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), LabelController.findOneLabelById);

// // Définit une route pour récupérer un Commentaire
// app.get(`/label`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), LabelController.findOneLabel);

// // Définit une route pour récupérer plusieur Commentaires
// app.get(`/labels_by_filters`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), LabelController.findManyLabels);

// // Définit une route pour récupérer plusieurs Commentaires par Ids
// app.get(`/labels`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), LabelController.findManyLabelByIds);

// // Définit une route pour mettre à jour un Commentaire
// app.put(`/label/:id`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), LabelController.updateOneLabel);

// // Définit une route pour mettre à jour plusieurs Commentaires
// app.put(`/labels`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), LabelController.updateManyLabels);

// // Définit une route pour supprimer un Commentaire
// app.delete(`/label/:id`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), LabelController.deleteOneLabel);

// // Définit une route pour supprimer plusieurs Commentaires
// app.delete(`/labels`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), LabelController.deleteManyLabels);

// <----------------------------------------------------------- Commentaires ------------------------------------------------------------------------->

// Définit une route pour ajouter un Commentaire
// app.post("/comment", database_middleware.checkMongooseConnection, CommentController.addOneComment);

// // Définit une route pour ajouter plusieurs Commentaires
// app.post(`/comments`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), CommentController.addManyComments);

// // Définit une route pour récupérer un Commentaire par Id
// app.get(`/comment/:id`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), CommentController.findOneCommentById);

// // Définit une route pour récupérer un Commentaire
// app.get(`/comment`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), CommentController.findOneComment);

// // Définit une route pour récupérer plusieur Commentaires
// app.get(`/comments_by_filters`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), CommentController.findManyComments);

// // Définit une route pour récupérer plusieurs Commentaires par Ids
// app.get(`/comments`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), CommentController.findManyCommentByIds);

// // Définit une route pour mettre à jour un Commentaire
// app.put(`/comment/:id`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), CommentController.updateOneComment);

// // Définit une route pour mettre à jour plusieurs Commentaires
// app.put(`/comments`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), CommentController.updateManyComments);

// // Définit une route pour supprimer un Commentaire
// app.delete(`/comment/:id`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), CommentController.deleteOneComment);

// // Définit une route pour supprimer plusieurs Commentaires
// app.delete(`/Comments`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), CommentController.deleteManyComments);


// Démarre le serveur et affiche un message de log
app.listen(config.port, () => {
    Logger.info(`Le Serveur est démarré ${config.port}`)
});

module.exports = app