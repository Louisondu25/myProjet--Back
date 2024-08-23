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
describe("BoardController", () => {
//   /* Importation des tests pour le service "UserController" */
  require("./controllers/boardController.test");
});

// <------------ TaskService/Controller ---------------------->

/* Définition d'un bloc de tests pour le service "UserService" */
describe("TaskService", () => {
/* Importation des tests pour le service "UserService" */
require("./services/TaskService.test");
});

// /* Définition d'un bloc de tests pour le Controller "UserController" */
describe("TaskController", () => {
//   /* Importation des tests pour le service "UserController" */
  require("./controllers/TaskController.test");
});

// <------------ LabelService/Controller ---------------------->

/* Définition d'un bloc de tests pour le service "UserService" */
describe("LabelService", () => {
/* Importation des tests pour le service "UserService" */
require("./services/LabelService.test");
});

// /* Définition d'un bloc de tests pour le Controller "UserController" */
describe("LabelController", () => {
//   /* Importation des tests pour le service "UserController" */
  require("./controllers/LabelController.test");
});

// <------------ CommentService/Controller ---------------------->

// /* Définition d'un bloc de tests pour le service "CommentsService" */
describe("CommentService", () => {
  //   /* Importation des tests pour le service "CommentService" */
  require("./services/CommentService.test");
});

// /* Définition d'un bloc de tests pour le Controller "CommentController" */
describe("CommentController", () => {
//   /* Importation des tests pour le service "CommentController" */
 require("./controllers/CommentController.test");
});

// <------------ CarteService/Controller ---------------------->

// /* Définition d'un bloc de tests pour le service "CartesService" */
// describe("CarteService", () => {
  //   /* Importation des tests pour le service "CarteService" */
//   require("./services/CarteService.test");
// });

// /* Définition d'un bloc de tests pour le Controller "CommentController" */
// describe("CarteController", () => {
  //   /* Importation des tests pour le service "CarteController" */
//   require("./controllers/CarteController.test");
// });

// <------------ ListeService/Controller ---------------------->

// /* Définition d'un bloc de tests pour le service "ListesService" */
// describe("ListeService", () => {
//   /* Importation des tests pour le service "ListeService" */
//   require("./services/ListeService.test");
// });

// /* Définition d'un bloc de tests pour le Controller "ListeController" */
// describe("ListeController", () => {
//   /* Importation des tests pour le service "ListeController" */
//   require("./controllers/ListeController.test");
// });

// <------------ BackgroundPictureService/Controller ---------------------->

// /* Définition d'un bloc de tests pour le service "BackgroundPictureService" */
// describe("BackgroundPictureService", () => {
//   /* Importation des tests pour le service "BackgroundPictureService" */
//   require("./services/BackgroundPictureService.test");
// });

// /* Définition d'un bloc de tests pour le Controller "BackgroundPictureController" */
// describe("BackgroundPictureController", () => {
//   /* Importation des tests pour le service "BackgroundPictureController" */
//   require("./controllers/BackgroundPictureController.test");
// });

// <------------ BackgroundColorService/Controller ---------------------->

// /* Définition d'un bloc de tests pour le service "BackgroundColorService" */
// describe("BackgroundColorService", () => {
//   /* Importation des tests pour le service "BackgroundColorService" */
//   require("./services/BackgroundColorService.test");
// });

// /* Définition d'un bloc de tests pour le Controller "BackgroundColorController" */
// describe("BackgroundColorController", () => {
//   /* Importation des tests pour le service "BackgroundColorController" */
//   require("./controllers/BackgroundColorController.test");
// });

// <------------ AstuceService/Controller ---------------------->

// /* Définition d'un bloc de tests pour le service "AstuceService" */
// describe("AstuceService", () => {
//   /* Importation des tests pour le service "AstuceService" */
//   require("./services/AstuceService.test");
// });

// /* Définition d'un bloc de tests pour le Controller "AstuceController" */
// describe("AstuceController", () => {
//   /* Importation des tests pour le service "AstuceController" */
//   require("./controllers/AstuceController.test");
// });

// <------------ ThemeService/Controller ---------------------->

// /* Définition d'un bloc de tests pour le service "ThemeService" */
// describe("ThemeService", () => {
//   /* Importation des tests pour le service "ThemeService" */
//   require("./services/ThemeService.test");
// });

// /* Définition d'un bloc de tests pour le Controller "ThemeController" */
// describe("ThemeController", () => {
//   /* Importation des tests pour le service "ThemeController" */
//   require("./controllers/ThemeController.test");
// });

// <------------ TableauxService/Controller ---------------------->

// /* Définition d'un bloc de tests pour le service "TableauxService" */
// describe("TableauxService", () => {
//   /* Importation des tests pour le service "TableauxService" */
//   require("./services/TableauxService.test");
// });

// /* Définition d'un bloc de tests pour le Controller "TableauxController" */
// describe("TableauxController", () => {
//   /* Importation des tests pour le service "TableauxController" */
//   require("./controllers/TableauxController.test");
// });

describe('API -Mongo', () => {
  it('Vider Les base datas -S', () => {
    if (process.env.npm_lifecycle_event == 'test') {
      mongoose.connection.db.dropDatabase()
    }
  })
})