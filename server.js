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
const BoardController = require('./controllers/BoardController');
const TaskController = require('./controllers/TaskController');
const LabelController = require('./controllers/LabelController');
const CommentController = require('./controllers/CommentController');

// Définit une route pour connecter un utilisateur
app.post("/login", database_middleware.checkMongooseConnection, UserController.loginUser);

// Définit une route pour deconnecter un utilisateur
app.post("/logout", database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), UserController.logoutUser);


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

 // Définit une route pour ajouter plusieurs Tableaux
app.post(`/boards`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), BoardController.addManyBoards);

 // Définit une route pour récupérer un Tableau par Id
app.get(`/board/:id`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), BoardController.findOneBoardById);

 // Définit une route pour récupérer un Tableau
app.get(`/board`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), BoardController.findOneBoard);

 // Définit une route pour récupérer plusieur Tableaux
app.get(`/boards_by_filters`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), BoardController.findManyBoards);

 // Définit une route pour récupérer plusieurs Tableaux par Ids
app.get(`/boards`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), BoardController.findManyBoardByIds);

 // Définit une route pour mettre à jour un Tableau
app.put(`/board/:id`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), BoardController.updateOneBoard);

 // Définit une route pour mettre à jour plusieurs Tableaux
app.put(`/boards`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), BoardController.updateManyBoards);

 // Définit une route pour supprimer un Tableau
app.delete(`/board/:id`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), BoardController.deleteOneBoard);

 // Définit une route pour supprimer plusieurs Tableaux
app.delete(`/boards`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), BoardController.deleteManyBoards);

// <--------------------------------------------------------------- Taches ------------------------------------------------------------------------------->

// Définit une route pour ajouter une Tache
app.post("/task", database_middleware.checkMongooseConnection, TaskController.addOneTask);

// Définit une route pour ajouter plusieurs Taches
app.post(`/tasks`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), TaskController.addManyTasks);

// Définit une route pour récupérer une Tache par Id
app.get(`/task/:id`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), TaskController.findOneTaskById);

// Définit une route pour récupérer une Tache
app.get(`/task`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), TaskController.findOneTask);

// Définit une route pour récupérer plusieurs Taches
app.get(`/tasks_by_filters`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), TaskController.findManyTasks);

// Définit une route pour récupérer plusieurs Taches par Ids
app.get(`/tasks`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), TaskController.findManyTaskByIds);

// Définit une route pour mettre à jour une Tache
app.put(`/task/:id`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), TaskController.updateOneTask);

// Définit une route pour mettre à jour plusieurs Taches
app.put(`/tasks`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), TaskController.updateManyTasks);

// Définit une route pour supprimer une Tache
app.delete(`/task/:id`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), TaskController.deleteOneTask);

// Définit une route pour supprimer plusieurs Taches
app.delete(`/tasks`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), TaskController.deleteManyTasks);

// <----------------------------------------------------------- Label ------------------------------------------------------------------------->

// Définit une route pour ajouter une Etiquette
app.post("/label", database_middleware.checkMongooseConnection, LabelController.addOneLabel);

 // Définit une route pour ajouter plusieurs Etiquettes
app.post(`/labels`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), LabelController.addManyLabels);

 // Définit une route pour récupérer une Etiquette par Id
app.get(`/label/:id`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), LabelController.findOneLabelById);

// Définit une route pour récupérer une Etiquette
app.get(`/label`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), LabelController.findOneLabel);

 // Définit une route pour récupérer plusieur Etiquettes
app.get(`/labels_by_filters`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), LabelController.findManyLabels);

 // Définit une route pour récupérer plusieurs Etiquettes par Ids
app.get(`/labels`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), LabelController.findManyLabelByIds);

// Définit une route pour mettre à jour une Etiquette
app.put(`/label/:id`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), LabelController.updateOneLabel);

 // Définit une route pour mettre à jour plusieurs Etiquettes
app.put(`/labels`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), LabelController.updateManyLabels);

// Définit une route pour supprimer une Etiquette
app.delete(`/label/:id`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), LabelController.deleteOneLabel);

// // Définit une route pour supprimer plusieurs Etiquettes
app.delete(`/labels`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), LabelController.deleteManyLabels);

// <----------------------------------------------------------- Commentaires ------------------------------------------------------------------------->

// Définit une route pour ajouter un Commentaire
app.post("/comment", database_middleware.checkMongooseConnection, CommentController.addOneComment);

// Définit une route pour ajouter plusieurs Commentaires
app.post(`/comments`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), CommentController.addManyComments);

 // Définit une route pour récupérer un Commentaire par Id
app.get(`/comment/:id`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), CommentController.findOneCommentById);

// Définit une route pour récupérer un Commentaire
app.get(`/comment`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), CommentController.findOneComment);

 // Définit une route pour récupérer plusieur Commentaires
app.get(`/comments_by_filters`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), CommentController.findManyComments);

// Définit une route pour récupérer plusieurs Commentaires par Ids
app.get(`/comments`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), CommentController.findManyCommentByIds);

 // Définit une route pour mettre à jour un Commentaire
app.put(`/comment/:id`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), CommentController.updateOneComment);

 // Définit une route pour mettre à jour plusieurs Commentaires
app.put(`/comments`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), CommentController.updateManyComments);

 // Définit une route pour supprimer un Commentaire
app.delete(`/comment/:id`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), CommentController.deleteOneComment);

 // Définit une route pour supprimer plusieurs Commentaires
app.delete(`/comments`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), CommentController.deleteManyComments);

// <----------------------------------------------------------- Cartes ------------------------------------------------------------------------->

// Définit une route pour ajouter une Carte
// app.post("/carte", database_middleware.checkMongooseConnection, CarteController.addOneCarte);

// Définit une route pour ajouter plusieurs Cartes
// app.post(`/cartes`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), CarteController.addManyCartes);

// Définit une route pour récupérer une Carte par Id
// app.get(`/carte/:id`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), CarteController.findOneCarteById);

// Définit une route pour récupérer une Carte
// app.get(`/carte`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), CarteController.findOneCarte);

// Définit une route pour récupérer plusieurs Cartes
// app.get(`/carte_by_filters`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), CarteController.findManyCartes);

// Définit une route pour récupérer plusieurs Cartes par Ids
// app.get(`/cartes`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), CarteController.findManyCarteByIds);

// Définit une route pour mettre à jour une Carte
// app.put(`/carte/:id`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), CarteController.updateOneCarte);

// Définit une route pour mettre à jour plusieurs Cartes
// app.put(`/cartes`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), CarteController.updateManyCartes);

// Définit une route pour supprimer une Carte
// app.delete(`/carte/:id`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), CarteController.deleteOneCarte);

// Définit une route pour supprimer plusieurs Cartes
// app.delete(`/cartes`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), CarteController.deleteManyCartes);

// <----------------------------------------------------------- Listes ------------------------------------------------------------------------->

// Définit une route pour ajouter une Liste
// app.post("/liste", database_middleware.checkMongooseConnection, ListeController.addOneListe);

// Définit une route pour ajouter plusieurs Listes
// app.post(`/listes`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), ListeController.addManyListes);

// Définit une route pour récupérer une Liste par Id
// app.get(`/liste/:id`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), ListeController.findOneListeById);

// Définit une route pour récupérer une Liste
// app.get(`/liste`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), ListeController.findOneListe);

// Définit une route pour récupérer plusieur Listes
// app.get(`/liste_by_filters`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), ListeController.findManyListes);

// Définit une route pour récupérer plusieurs Listes par Ids
// app.get(`/listes`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), ListeController.findManyListeByIds);

// Définit une route pour mettre à jour une Liste
// app.put(`/liste/:id`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), ListeController.updateOneListe);

// Définit une route pour mettre à jour plusieurs Listes
// app.put(`/listes`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), ListeController.updateManyListes);

// Définit une route pour supprimer une Liste
// app.delete(`/liste/:id`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), ListeController.deleteOneListe);

// Définit une route pour supprimer plusieurs Listes
// app.delete(`/listes`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), ListeController.deleteManyListes);

// <----------------------------------------------------------- BackgroundPicture ------------------------------------------------------------------------->

// Définit une route pour ajouter une Photo
// app.post("/backgroundpicture", database_middleware.checkMongooseConnection, BackgroundPictureController.addOneBackgroundPicture);

// Définit une route pour ajouter plusieurs Photos
// app.post(`/backgroundpictures`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), BackgroundPictureController.addManyBackgroundPictures);

// Définit une route pour récupérer une Photo par Id
// app.get(`/backgroundpicture/:id`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), BackgroundPictureController.findOneBackgroundPictureById);

// Définit une route pour récupérer une Photo
// app.get(`/backgroundpicture`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), BackgroundPictureController.findOneBackgroundPicture);

// Définit une route pour récupérer plusieur Photos
// app.get(`/backgroundpicture_by_filters`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), BackgroundPictureController.findManyBackgroundPictures);

// Définit une route pour récupérer plusieurs Photo par Ids
// app.get(`/backgroundpictures`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), BackgroundPictureController.findManyBackgroundPictureByIds);

// Définit une route pour mettre à jour une Photo
// app.put(`/backgroundpicture/:id`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), BackgroundPictureController.updateOneBackgroundPicture);

// Définit une route pour mettre à jour plusieurs Photos
// app.put(`/backgroundpictures`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), BackgroundPictureController.updateManyBackgroundPictures);

// Définit une route pour supprimer une Photo
// app.delete(`/backgroundpicture/:id`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), BackgroundPictureController.deleteOneBackgroundPicture);

// Définit une route pour supprimer plusieurs Photos
// app.delete(`/backgroundpictures`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), BackgroundPictureController.deleteManyBackgroundPictures);

// <----------------------------------------------------------- BackgroundColor ------------------------------------------------------------------------->

// Définit une route pour ajouter une Couleur
// app.post("/backgroundcolor", database_middleware.checkMongooseConnection, BackgroundColorController.addOneBackgroundColor);

// Définit une route pour ajouter plusieurs Couleurs
// app.post(`/backgroundcolors`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), BackgroundColorController.addManyBackgroundColors);

// Définit une route pour récupérer une Couleur par Id
// app.get(`/backgroundcolor/:id`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), BackgroundColorController.findOneBackgroundColorById);

// Définit une route pour récupérer une Couleur
// app.get(`/backgroundcolor`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), BackgroundColorController.findOneBackgroundColor);

// Définit une route pour récupérer plusieur Couleurs
// app.get(`/backgroundcolor_by_filters`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), BackgroundColorController.findManyBackgroundColors);

// Définit une route pour récupérer plusieurs Couleurs par Ids
// app.get(`/backgroundcolors`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), BackgroundColorController.findManyBackgroundColorByIds);

// Définit une route pour mettre à jour une Couleur
// app.put(`/backgroundcolor/:id`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), BackgroundColorController.updateOneBackgroundColor);

// Définit une route pour mettre à jour plusieurs Couleurs
// app.put(`/backgroundcolors`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), BackgroundColorController.updateManyBackgroundColors);

// Définit une route pour supprimer une Couleur
// app.delete(`/backgroundcolor/:id`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), BackgroundColorController.deleteOneBackgroundColor);

// Définit une route pour supprimer plusieurs Couleurs
// app.delete(`/backgroundcolors`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), BackgroundColorController.deleteManyBackgroundColors);

// <----------------------------------------------------------- Tableaux ------------------------------------------------------------------------->

// Définit une route pour ajouter un Tableau
// app.post("/tableau", database_middleware.checkMongooseConnection, TableauxController.addOneTableaux);

// Définit une route pour ajouter plusieurs Tableaux
// app.post(`/tableaux`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), TableauxController.addManyTableaux);

// Définit une route pour récupérer un Tableau par Id
// app.get(`/tableau/:id`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), TableauxController.findOneTableauById);

// Définit une route pour récupérer un Tableau
// app.get(`/tableau`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), TableauxController.findOneTableau);

// Définit une route pour récupérer plusieur Tableaux
// app.get(`/tableaux_by_filters`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), TableauxController.findManyTableaux);

// Définit une route pour récupérer plusieurs Tableaux par Ids
// app.get(`/tableaux`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), TableauxController.findManyTableauByIds);

// Définit une route pour mettre à jour un Tableau
// app.put(`/tableau/:id`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), TableauxController.updateOneTableau);

// Définit une route pour mettre à jour plusieurs Tableaux
// app.put(`/tableaux`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), TableauxController.updateManyTableaux);

// Définit une route pour supprimer un Tableau
// app.delete(`/tableau/:id`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), TableauxController.deleteOneTableau);

// Définit une route pour supprimer plusieurs Tableaux
// app.delete(`/tableaux`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), TableauxController.deleteManyTableaux);

// <----------------------------------------------------------- Themes ------------------------------------------------------------------------->

// Définit une route pour ajouter un Theme
// app.post("/theme", database_middleware.checkMongooseConnection, ThemeController.addOneThemes);

// Définit une route pour ajouter plusieurs Themes
// app.post(`/themes`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), ThemeController.addManyThemes);

// Définit une route pour récupérer un Theme par Id
// app.get(`/theme/:id`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), ThemeController.findOneThemeById);

// Définit une route pour récupérer un Tableau
// app.get(`/theme`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), ThemeController.findOneTableau);

// Définit une route pour récupérer plusieur Themes
// app.get(`/themes_by_filters`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), ThemeController.findManyThemes);

// Définit une route pour récupérer plusieurs Themes par Ids
// app.get(`/themes`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), ThemeController.findManyThemeByIds);

// Définit une route pour mettre à jour un Tableau
// app.put(`/theme/:id`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), ThemeController.updateOneTheme);

// Définit une route pour mettre à jour plusieurs Themes
// app.put(`/themes`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), ThemeController.updateManyThemes);

// Définit une route pour supprimer un Theme
// app.delete(`/theme/:id`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), ThemeController.deleteOneTheme);

// Définit une route pour supprimer plusieurs Themes
// app.delete(`/themes`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), ThemeController.deleteManyThemes);

// <----------------------------------------------------------- Astuces ------------------------------------------------------------------------->

// Définit une route pour ajouter une Astuce
// app.post("/astuce", database_middleware.checkMongooseConnection, AstuceController.addOneAstuces);

// Définit une route pour ajouter plusieurs Astuces
// app.post(`/astuces`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), AstuceController.addManyAstuces);

// Définit une route pour récupérer une Astuce par Id
// app.get(`/astuce/:id`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), AstuceController.findOneAstuceById);

// Définit une route pour récupérer une Astuce
// app.get(`/astuce`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), AstucesController.findOneAstuce);

// Définit une route pour récupérer plusieur Astuces
// app.get(`/astuces_by_filters`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), AstuceController.findManyAstuces);

// Définit une route pour récupérer plusieurs Astuces par Ids
// app.get(`/astuces`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), AstuceController.findManyAstuceByIds);

// Définit une route pour mettre à jour une Astuce
// app.put(`/astuce/:id`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), AstuceController.updateOneAstuces);

// Définit une route pour mettre à jour plusieurs Astuces
// app.put(`/astuces`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), AstuceController.updateManyAstuces);

// Définit une route pour supprimer une Astuce
// app.delete(`/astuce/:id`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), AstuceController.deleteOneAstuce);

// Définit une route pour supprimer plusieurs Astuces
// app.delete(`/astuces`, database_middleware.checkMongooseConnection, passport.authenticate('jwt', { session: false }), AstuceController.deleteManyAstuces);
// Démarre le serveur et affiche un message de log
app.listen(config.port, () => {
    Logger.info(`Le Serveur est démarré ${config.port}`)
});

module.exports = app