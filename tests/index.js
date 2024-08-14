// // Users

/* Établissement de la connexion à la base de données */
require("../utils/database");
const mongoose = require('mongoose')

// <------------ UserService/Controller ---------------------->

/* Définition d'un bloc de tests pour le service "UserService" */
describe("UserService", () => {
  /* Importation des tests pour le service "UserService" */
  require("./services/UserService.test");
});

/* Définition d'un bloc de tests pour le Controller "UserController" */
describe("UserController", () => {
  /* Importation des tests pour le service "UserController" */
  require("./controllers/UserController.test");
});

// <------------ BoardService/Controller ---------------------->


/* Définition d'un bloc de tests pour le service "UserService" */
describe("BoardService", () => {
  /* Importation des tests pour le service "UserService" */
  require("./services/BoardService.test");
});

// /* Définition d'un bloc de tests pour le Controller "UserController" */
// describe("BoardController", () => {
//   /* Importation des tests pour le service "UserController" */
//   require("./controllers/BoardController.test");
// });

// <------------ TaskService/Controller ---------------------->

/* Définition d'un bloc de tests pour le service "UserService" */
describe("TaskService", () => {
/* Importation des tests pour le service "UserService" */
require("./services/TaskService.test");
});

// /* Définition d'un bloc de tests pour le Controller "UserController" */
// describe("TaskController", () => {
//   /* Importation des tests pour le service "UserController" */
//   require("./controllers/TaskController.test");
// });

// <------------ LabelService/Controller ---------------------->

/* Définition d'un bloc de tests pour le service "UserService" */
describe("LabelService", () => {
/* Importation des tests pour le service "UserService" */
require("./services/LabelService.test");
});

// /* Définition d'un bloc de tests pour le Controller "UserController" */
// describe("LabelController", () => {
//   /* Importation des tests pour le service "UserController" */
//   require("./controllers/LabelController.test");
// });

// <------------ CommentService/Controller ---------------------->

// /* Définition d'un bloc de tests pour le service "CommentsService" */
describe("CommentService", () => {
  //   /* Importation des tests pour le service "CommentService" */
  require("./services/CommentService.test");
});

// /* Définition d'un bloc de tests pour le Controller "CommentController" */
// describe("CommentController", () => {
//   /* Importation des tests pour le service "CommentController" */
//  // require("./controllers/CommentController.test");
// });

describe('API -Mongo', () => {
  it('Vider Les base datas -S', () => {
    if (process.env.npm_lifecycle_event == 'test') {
      mongoose.connection.db.dropDatabase()
    }
  })
})