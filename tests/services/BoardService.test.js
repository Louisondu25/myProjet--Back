const BoardService = require("../../services/BoardService");
const UserService = require('../../services/UserService')
const chai = require("chai");
let expect = chai.expect;
const _ = require("lodash");
var ValidBoardId = "";
var TabBoardId = [];
var TabUserId = [];
var boards = []

var users = [
    {
        firstName: "detenteur  d'un tableau 1",
        lastName: "Iencli",
        username: "oui1",
        email: "Iencli@gmail.com",
        password: "higuys",
        age: 10,
        phone_Number: "15415215"
    },
    {
        firstName: "detenteur  d'un tableau 2",
        lastName: "Iencli",
        username: "oui2",
        email: "Iencli2@gmail.com",
        password: "higuys",
        age: 10,
        phone_Number: "15415215"

    }, {
        firstName: "detenteur  d'un tableau 3",
        lastName: "Iencli",
        username: "oui3",
        email: "Iencli3@gmail.com",
        password: "higuys",
        age: 10,
        phone_Number: "15415215"
    },
    {
        firstName: "detenteur  d'un tableau 4",
        lastName: "Iencli",
        username: "oui4",
        email: "Iencli4@gmail.com",
        password: "higuys",
        age: 10,
        phone_Number: "15415215"
    },
    {
        firstName: "detenteur  d'un tableau 5",
        lastName: "Iencli",
        username: "oui5",
        email: "Iencli5@gmail.com",
        password: "higuys",
        age: 10,
        phone_Number: "15415215"
    },
]

describe('Gestion externe (User)', () => {
    it('Creation des Utilisateurs fictif', (done) => {
        UserService.addManyUsers(users, null, function (err, value) {
            TabUserId = _.map(value, '_id')
            done()
        })
    })
})

function rdm_users(tab) {
    var rdm_id = tab[Math.floor(Math.random() * (tab.length - 1))];
    return rdm_id;
}

describe("addOneBoard", () => {
    it("Tableau correct. - S", (done) => {
        var board = {
            user_id: rdm_users(TabUserId),
            tableau_id: rdm_users(TabUserId),
            title: "blabla",
            description: "La description de cet objet board",
            index: 1,
            setting_list: rdm_users(TabUserId),
            created_at: new Date(),
            updated_at: new Date(),
        };
        BoardService.addOneBoard(board, null, function (err, value) {
            expect(value).to.be.a("object");
            expect(value).to.haveOwnProperty("_id");
            expect(value).to.haveOwnProperty("user_id");
            ValidBoardId = value._id;
            done()
            //
        });
    });
    it("Tableau incorrect. (Sans Name) - E", (done) => {
        var InvalidUser = {
            user_id: rdm_users(TabUserId),
            tableau_id: rdm_users(TabUserId),

            description: "La description de cet objet board",
            index: 1,
            setting_list: rdm_users(TabUserId),
            created_at: new Date(),
            updated_at: new Date(),
        };
        BoardService.addOneBoard(InvalidUser, null, function (err, value) {
            expect(err).to.haveOwnProperty("msg");
            expect(err).to.haveOwnProperty("fields_with_error").with.lengthOf(1);
            expect(err).to.haveOwnProperty("fields");
            expect(err["fields"]).to.haveOwnProperty("title");
            expect(err["fields"]["title"]).to.equal(
                "Path `title` is required."
            );
            done()
        });
    });
});

describe("addManyBoards", () => {
    it("Tableaux à ajouter, non valide. - E", (done) => {
        var board_tab_error = [
            {
                user_id: rdm_users(TabUserId),
                tableau_id: rdm_users(TabUserId),
                title: "blabla",
                description: "La description de cet objet board",
                index: 1,
                setting_list: rdm_users(TabUserId),
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                user_id: rdm_users(TabUserId),
                tableau_id: rdm_users(TabUserId),
                title: "blabla",
                description: "La description de cet objet board",
                index: 1,
                setting_list: rdm_users(TabUserId),
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
            user_id: rdm_users(TabUserId),
            tableau_id: rdm_users(TabUserId),
            title: "blabla",
            description: "La description de cet objet board",
            index: 1,
            setting_list: rdm_users(TabUserId),
            created_at: new Date(),
            updated_at: new Date(),
            },
            {
                user_id: rdm_users(TabUserId),
                tableau_id: rdm_users(TabUserId),
                title: "blabla",
                description: "La description de cet objet board",
                index: 1,
                setting_list: rdm_users(TabUserId),
            },
        ];
        BoardService.addManyBoards(board_tab_error, null, function (err, value) {
            done();
        });
    });

    it("Tableaux à ajouter, valide. - S", (done) => {
        var boards_tab = [
            {
                user_id: rdm_users(TabUserId),
                tableau_id: rdm_users(TabUserId),
                title: "blabla",
                description: "La description de cet objet board",
                index: 1,
                setting_list: rdm_users(TabUserId),
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                user_id: rdm_users(TabUserId),
                tableau_id: rdm_users(TabUserId),
                title: "how are u",
                description: "La description de cet objet board",
                index: 1,
                setting_list: rdm_users(TabUserId),
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                user_id: rdm_users(TabUserId),
                tableau_id: rdm_users(TabUserId),
                title: "im good n u ?",
                description: "La description de cet objet board",
                index: 1,
                setting_list: rdm_users(TabUserId),
                created_at: new Date(),
                updated_at: new Date(),
            },
        ];

        BoardService.addManyBoards(boards_tab, null, function (err, value) {
            tab_id_board = _.map(value, "_id");
            expect(value).lengthOf(3);
            boards = [...value, ...boards]
            done();
        });
    });
});

describe("findOneBoardById", () => {
    it("Chercher un Tableaux existant correct. - S", (done) => {
        BoardService.findOneBoardById(ValidBoardId, null, function (err, value) {
            expect(value).to.be.a("object");
            expect(value).to.haveOwnProperty("_id");
            expect(value).to.haveOwnProperty("description");
            done();
        });
    });
    it("Chercher un Tableau non-existant correct. - E", (done) => {
        BoardService.findOneBoardById("100", null, function (err, value) {
            expect(err).to.haveOwnProperty("msg");
            expect(err).to.haveOwnProperty("type_error");
            expect(err["type_error"]).to.equal("no-valid");
            done();
        });
    });
});

describe('findOneBoard', () => {
    it('Chercher un Tableau avec un champ autorisé - S', (done) => {
        BoardService.findOneBoard(['title'], boards[0].title, null, (err, value) => {
            expect(value).to.haveOwnProperty('title');
            done();
        });
    });

    it('Chercher un Tableau avec un champ non autorisé - E', (done) => {
        BoardService.findOneBoard(['boardname', 'firstName'], boards[0].name, null, (err, value) => {
            expect(err).to.haveOwnProperty('type_error');
            done();
        });
    });

    it('Chercher un Tableau sans tableau de champ -E', (done) => {
        BoardService.findOneBoard('email', boards[0].name, null, (err, value) => {
            expect(err).to.haveOwnProperty('type_error');
            done();
        });
    });

    it('chercher un Tableau inexistant', (done) => {
        BoardService.findOneBoard(['email'], 'boards[0].boardname', null, (err, value) => {
            expect(err).to.haveOwnProperty('type_error');
            done();
        });
    });
});

describe('findOneBoard', () => {
    it('Chercher un Tableau avec un champ autorisé - S', (done) => {
        BoardService.findOneBoard(['title'], boards[0].title, null, (err, value) => {
            expect(value).to.haveOwnProperty('title');
            done();
        });
    });

    it('Chercher un Tableau avec un champ non autorisé - E', (done) => {
        BoardService.findOneBoard(['boardname', 'firstName'], boards[0].name, null, (err, value) => {
            expect(err).to.haveOwnProperty('type_error');
            done();
        });
    });

    it('Chercher un Tableau sans tableau de champ -E', (done) => {
        BoardService.findOneBoard('email', boards[0].name, null, (err, value) => {
            expect(err).to.haveOwnProperty('type_error');
            done();
        });
    });

    it('chercher un Tableau inexistant', (done) => {
        BoardService.findOneBoard(['email'], 'boards[0].boardname', null, (err, value) => {
            expect(err).to.haveOwnProperty('type_error');
            done();
        });
    });
});

// describe('findManyBoards', () => {
//     it('Retourne 3 Tableaux sur les 4 - S ', (done) => {
//         BoardService.findManyBoards(null, 1, 3, null, function (err, value,) {
//             console.log(err, value)
//             expect(value).to.haveOwnProperty('count')
//             expect(value).to.haveOwnProperty('results')
//             expect(value['count']).to.be.equal(5)
//             expect(value['results']).lengthOf(3)
//             expect(err).to.be.null
//             done()
//         })
//     })
//     it('Envoi chaine de caractere sur page - E ', (done) => {
//         BoardService.findManyBoards(null, 'hi', 3, null, function (err, value) {
//             expect(err).to.haveOwnProperty('type_error')
//             expect(err['type_error']).to.be.equal('no-valid')
//             expect(value).to.be.undefined
//             done()
//         })
//     })
// })

// describe("updateOneBoard", () => {
//     it("Modifier un Tableau correct. - S", (done) => {
//         BoardService.updateOneBoard(
//             ValidBoardId,
//             { name: "Choux", description: "Hello" },
//             null,
//             function (err, value) {
//                 expect(value).to.be.a("object");
//                 expect(value).to.haveOwnProperty("_id");
//                 expect(value).to.haveOwnProperty("name");
//                 expect(value).to.haveOwnProperty("description");
//                 expect(value["name"]).to.be.equal("Choux");
//                 expect(value["description"]).to.be.equal("Hello");
//                 done();
//             }
//         );
//     });
//     it("Modifier un Tableau avec id incorrect. - E", (done) => {
//         BoardService.updateOneBoard(
//             "1200",
//             { firstName: "Jean", lastName: "Luc" }, null,
//             function (err, value) {
//                 expect(err).to.be.a("object");
//                 expect(err).to.haveOwnProperty("msg");
//                 expect(err).to.haveOwnProperty("type_error");
//                 expect(err["type_error"]).to.be.equal("no-valid");
//                 done();
//             }
//         );
//     });
//     it("Modifier un Tableau avec des champs requis vide. - E", (done) => {
//         BoardService.updateOneBoard(
//             ValidBoardId,
//             { name: "", description: "Hello" }, null,
//             function (err, value) {
//                 expect(value).to.be.undefined;
//                 expect(err).to.haveOwnProperty("msg");
//                 expect(err).to.haveOwnProperty("fields_with_error").with.lengthOf(1);
//                 expect(err).to.haveOwnProperty("fields");
//                 expect(err["fields"]).to.haveOwnProperty("name");
//                 expect(err["fields"]["name"]).to.equal("Path `name` is required.");
//                 done();
//             }
//         );
//     });
// });

// describe("updateManyBoards", () => {
//     it("Modifier plusieurs Tableaux correctement. - S", (done) => {
//         BoardService.updateManyBoards(TabBoardId, { name: "Choux", description: "Hello" }, null, function (err, value) {
//             expect(value).to.haveOwnProperty("modifiedCount");
//             expect(value).to.haveOwnProperty("matchedCount");
//             expect(value["matchedCount"]).to.be.equal(TabBoardId.length);
//             expect(value["modifiedCount"]).to.be.equal(TabBoardId.length);
//             done();
//         }
//         );
//     });
//     it("Modifier plusieurs Tableaux avec id incorrect. - E", (done) => {
//         BoardService.updateManyBoards("1200", { firstName: "Jean", lastName: "Luc" }, null, function (err, value) {
//             expect(err).to.be.a("object");
//             expect(err).to.haveOwnProperty("msg");
//             expect(err).to.haveOwnProperty("type_error");
//             expect(err["type_error"]).to.be.equal("no-valid");
//             done();
//         }
//         );
//     });
//     it("Modifier plusieurs Tableaux avec des champs requis vide. - E", (done) => {
//         BoardService.updateManyBoards(
//             TabBoardId,
//             { name: "", description: "Luc" }, null,
//             function (err, value) {
//                 expect(value).to.be.undefined;
//                 expect(err).to.haveOwnProperty("msg");
//                 expect(err).to.haveOwnProperty("fields_with_error").with.lengthOf(1);
//                 expect(err).to.haveOwnProperty("fields");

//                 done();
//             }
//         );
//     });
// });

// describe("deleteOneBoard", () => {
//     it("Supprimer un Tableau correctement. - S", () => {
//         BoardService.deleteOneBoard(ValidBoardId, null, function (err, value) {
//             expect(value).to.be.a('Object')
//             expect(value).to.haveOwnProperty("firstName");
//             expect(value).to.haveOwnProperty("lastName");
//         });
//     });
//     it("Supprimer un Tableau avec id incorrect. - E", (done) => {
//         BoardService.deleteOneBoard("1200", null, function (err, value) {
//             expect(err).to.be.a("object");
//             expect(err).to.haveOwnProperty("msg");
//             expect(err).to.haveOwnProperty("type_error");
//             expect(err["type_error"]).to.be.equal("no-valid");
//             done();
//         });
//     });
//     it("Supprimer un Tableau qui n'existe pas. - E", () => {
//         BoardService.deleteOneBoard(ValidBoardId, null, function (err, value) {
//             expect(err).to.be.a("object");
//             expect(err).to.haveOwnProperty("msg");
//             expect(err).to.haveOwnProperty("type_error");
//             expect(err["type_error"]).to.be.equal("no-found");
//         });
//     });
// });

describe("deleteManyBoards", () => {
  it("Supprimer plusieurs Tableau correctement. - S", (done) => {
    BoardService.deleteManyBoards(TabBoardId, null, (err, value) => {
        console.log(TabBoardId)
      expect(value).to.be.a("object");
      expect(value).to.haveOwnProperty("deletedCount");
      expect(value.deletedCount).to.equal(TabBoardId.length);
      expect(err).to.be.null;
      done();
    });
  });

  it("Supprimer plusieurs Tableau avec id incorrect. - E", (done) => {
    BoardService.deleteManyBoards("1200", null, (err, value) => {
      expect(err).to.be.a("object");
      expect(err).to.haveOwnProperty("msg");
      expect(err).to.haveOwnProperty("type_error");
      expect(err.msg).to.equal("Tableau d'id invalide.");
      expect(err.type_error).to.equal("no-valid");
      expect(value).to.be.undefined;
      done();
    });
  });
});

describe('Gestion externe (User)', () => {
    it('Supprimer des Utilisateurs fictifs', (done) => {
        UserService.deleteManyUsers(TabUserId, null, function (err, value) {
            done()
        })
    })
})