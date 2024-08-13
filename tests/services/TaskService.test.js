const TaskService = require("../../services/TaskService");
const UserService = require('../../services/UserService')
const chai = require("chai");
let expect = chai.expect;
const _ = require("lodash");
var ValidTaskId = "";
var TabTaskId = [];
var TabUserId = [];
var tasks = []


var users = [
    {
        firstName: "detenteur  de la Tache 1",
        lastName: "Iencli",
        username: "oui1",
        email: "Iencli@gmail.com",
        password: "higuys",
        age: 10,
        phone_Number: "15415215"
    },
    {
        firstName: "detenteur  de la Tache 2",
        lastName: "Iencli",
        username: "oui2",
        email: "Iencli2@gmail.com",
        password: "higuys",
        age: 10,
        phone_Number: "15415215"

    }, {
        firstName: "detenteur  de la Tache 3",
        lastName: "Iencli",
        username: "oui3",
        email: "Iencli3@gmail.com",
        password: "higuys",
        age: 10,
        phone_Number: "15415215"
    },
    {
        firstName: "detenteur  de la Tache 4",
        lastName: "Iencli",
        username: "oui4",
        email: "Iencli4@gmail.com",
        password: "higuys",
        age: 10,
        phone_Number: "15415215"
    },
    {
        firstName: "detenteur  de la Tache 5",
        lastName: "Iencli",
        username: "oui5",
        email: "Iencli5@gmail.com",
        password: "higuys",
        age: 10,
        phone_Number: "15415215"
    },
]

it('Creation des Utilisateurs fictif', (done) => {
    UserService.addManyUsers(users, null, function (err, value) {
        TabUserId = _.map(value, '_id')
        done()
    })
})

function rdm_users(tab) {
    var rdm_id = tab[Math.floor(Math.random() * (tab.length - 1))];
    return rdm_id;
}

describe("addOneTask", () => {
    it("Taches correct. - S", (done) => {
        var task = {
            archive: true,
            title: "blabla",
            description: "description de Blabla",
            date_start: 1,
            date_end: 1,
            board_id: "66bb1c1b2bbcb76e3c7cacf4", // en attendant d'avoir les bon ids
            status: "Finish",
            user_id: rdm_users(TabUserId),
            created_at: new Date(),
            updated_at: new Date(),
        };
        TaskService.addOneTask(task, null, function (err, value) {
            expect(value).to.be.a("object");
            expect(value).to.haveOwnProperty("_id");
            expect(value).to.haveOwnProperty("user_id");
            ValidTaskId = value._id;
            done()
            //
        });
    });
    it("Tache incorrect. (Sans Name) - E", (done) => {
        var InvalidTask = {
            archive: false,
            description: "description du title",
            date_start: 1,
            date_end: 2,
            board_id: "66bb1c1b2bbcb76e3c7cacf4",
            status: "en cours",
            user_id: rdm_users(TabUserId),
            created_at: new Date(),
            updated_at: new Date(),
        };
        TaskService.addOneTask(InvalidTask, null, function (err, value) {
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

describe("addManyTasks", () => {
    it("Taches à ajouter, non valide. - E", (done) => {
        var ErrorTabTask = [
            {
                archive: false,
                description: "description du title",
                date_start: 1,
                date_end: 2,
                board_id: "66bb1c1b2bbcb76e3c7cacf4",
                status: "en cours",
                user_id: rdm_users(TabUserId),
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                archive: false,
                date_start: 1,
                date_end: 1,
                board_id: "66bb1c1b2bbcb76e3c7cacf4", // en attendant d'avoir les bon ids
                status: "en cours",
                user_id: rdm_users(TabUserId),
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                archive: false,
                date_start: 1,
                date_end: 1,
                board_id: "66bb1c1b2bbcb76e3c7cacf4", // en attendant d'avoir les bon ids
                status: "en cours",
                user_id: rdm_users(TabUserId),
            },
            {
                archive: false,
                description: "description du title",
                status: "en cours",
                user_id: rdm_users(TabUserId),
            },
        ];
        TaskService.addManyTasks(ErrorTabTask, null, function (err, value) {
            expect(err[0]).to.haveOwnProperty("msg");
            expect(err[0]).to.haveOwnProperty("type_error");
            done();
        });
    });

    it("Taches à ajouter, valide. - S", (done) => {
        var tasks_tab = [
            {
                archive: true,
                title: "blabla",
                description: "description de Blabla",
                date_start: 1,
                date_end: 1,
                board_id: "66bb1c1b2bbcb76e3c7cacf4", // en attendant d'avoir les bon ids
                status: "Finish",
                user_id: rdm_users(TabUserId),
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                archive: true,
                title: "blabla",
                description: "description de Blabla",
                date_start: 2,
                date_end: 2,
                board_id: "66bb1c1b2bbcb76e3c7cacf4", // en attendant d'avoir les bon ids
                status: "Finish",
                user_id: rdm_users(TabUserId),
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                archive: true,
                title: "blabla",
                description: "description de Blabla",
                date_start: 3,
                date_end: 3,
                board_id: "66bb1c1b2bbcb76e3c7cacf4", // en attendant d'avoir les bon ids
                status: "Finish",
                user_id: rdm_users(TabUserId),
                created_at: new Date(),
                updated_at: new Date(),
            },
        ];

        TaskService.addManyTasks(tasks_tab, null, function (err, value) {
            TabTaskId = _.map(value, "_id");
            expect(value).lengthOf(3);
            tasks = [...value, ...tasks]
            done();
        });
    });
});

// describe("findOneTaskById", () => {
//     it("Chercher un Tache existant correct. - S", (done) => {
//         TaskService.findOneTaskById(ValidTaskId, null, function (err, value) {
//             expect(value).to.be.a("object");
//             expect(value).to.haveOwnProperty("_id");
//             expect(value).to.haveOwnProperty("description");
//             done();
//         });
//     });
//     it("Chercher un Tache non-existant correct. - E", (done) => {
//         TaskService.findOneTaskById("100", null, function (err, value) {
//             expect(err).to.haveOwnProperty("msg");
//             expect(err).to.haveOwnProperty("type_error");
//             expect(err["type_error"]).to.equal("no-valid");
//             done();
//         });
//     });
// });

// describe('findOneTask', () => {
//     it('Chercher une Tache avec un champ autorisé - S', (done) => {
//         TaskService.findOneTask(['name'], tasks[0].name, null, (err, value) => {
//             expect(value).to.haveOwnProperty('name');
//             done();
//         });
//     });

//     it('Chercher une Tache avec un champ non autorisé - E', (done) => {
//         TaskService.findOneTask(['taskname', 'firstName'], tasks[0].name, null, (err, value) => {
//             expect(err).to.haveOwnProperty('type_error');
//             done();
//         });
//     });

//     it('Chercher une Tache sans tableau de champ -E', (done) => {
//         TaskService.findOneTask('email', tasks[0].name, null, (err, value) => {
//             expect(err).to.haveOwnProperty('type_error');
//             done();
//         });
//     });

//     it('chercher une Tache inexistant', (done) => {
//         TaskService.findOneTask(['email'], 'tasks[0].taskname', null, (err, value) => {
//             expect(err).to.haveOwnProperty('type_error');
//             done();
//         });
//     });
// });

// describe('findManyTasks', () => {
//     it('Retourne 3 Taches sur les 4 - S ', (done) => {
//         TaskService.findManyTasks(null, 1, 3, null, function (err, value,) {

//             expect(value).to.haveOwnProperty('count')
//             expect(value).to.haveOwnProperty('results')
//             expect(value['count']).to.be.equal(4)
//             expect(value['results']).lengthOf(3)
//             expect(err).to.be.null
//             done()
//         })
//     })
//     it('Envoi chaine de caractere sur page - E ', (done) => {
//         TaskService.findManyTasks(null, 'hi', 3, null, function (err, value) {
//             expect(err).to.haveOwnProperty('type_error')
//             expect(err['type_error']).to.be.equal('no-valid')
//             expect(value).to.be.undefined
//             done()
//         })
//     })
// })

// describe("updateOneTask", () => {
//     it("Modifier une Tache correct. - S", (done) => {
//         TaskService.updateOneTask(
//             ValidTaskId,
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
//     it("Modifier une Tache avec id incorrect. - E", (done) => {
//         TaskService.updateOneTask(
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
//     it("Modifier une Tache avec des champs requis vide. - E", (done) => {
//         TaskService.updateOneTask(
//             ValidTaskId,
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

// describe("updateManyTasks", () => {
//     it("Modifier plusieurs Taches correctement. - S", (done) => {
//         TaskService.updateManyTasks(TabTaskId, { name: "Choux", description: "Hello" }, null, function (err, value) {
//             expect(value).to.haveOwnProperty("modifiedCount");
//             expect(value).to.haveOwnProperty("matchedCount");
//             expect(value["matchedCount"]).to.be.equal(TabTaskId.length);
//             expect(value["modifiedCount"]).to.be.equal(TabTaskId.length);
//             done();
//         }
//         );
//     });
//     it("Modifier plusieurs Taches avec id incorrect. - E", (done) => {
//         TaskService.updateManyTasks("1200", { firstName: "Jean", lastName: "Luc" }, null, function (err, value) {
//             expect(err).to.be.a("object");
//             expect(err).to.haveOwnProperty("msg");
//             expect(err).to.haveOwnProperty("type_error");
//             expect(err["type_error"]).to.be.equal("no-valid");
//             done();
//         }
//         );
//     });
//     it("Modifier plusieurs Taches avec des champs requis vide. - E", (done) => {
//         TaskService.updateManyTasks(
//             TabTaskId,
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

// describe("deleteOneTask", () => {
//     it("Supprimer une Tache correctement. - S", () => {
//         TaskService.deleteOneTask(ValidTaskId, null, function (err, value) {
//             expect(value).to.be.a('Object')
//             expect(value).to.haveOwnProperty("firstName");
//             expect(value).to.haveOwnProperty("lastName");
//         });
//     });
//     it("Supprimer une Tache avec id incorrect. - E", (done) => {
//         TaskService.deleteOneTask("1200", null, function (err, value) {
//             expect(err).to.be.a("object");
//             expect(err).to.haveOwnProperty("msg");
//             expect(err).to.haveOwnProperty("type_error");
//             expect(err["type_error"]).to.be.equal("no-valid");
//             done();
//         });
//     });
//     it("Supprimer une Tache qui n'existe pas. - E", () => {
//         TaskService.deleteOneTask(ValidTaskId, null, function (err, value) {
//             expect(err).to.be.a("object");
//             expect(err).to.haveOwnProperty("msg");
//             expect(err).to.haveOwnProperty("type_error");
//             expect(err["type_error"]).to.be.equal("no-found");
//         });
//     });
// });

// describe("deleteManyTasks", () => {
//     it("Supprimer plusieurs Taches correctement. - S", (done) => {
//         TaskService.deleteManyTasks(TabTaskId, null, (err, value) => {
//             expect(value).to.be.a("object");
//             expect(value).to.haveOwnProperty("deletedCount");
//             expect(value.deletedCount).to.equal(TabTaskId.length);
//             done();
//         });
//     });

//     it("Supprimer plusieurs Taches avec id incorrect. - E", (done) => {
//         TaskService.deleteManyTasks("1200", null, (err, value) => {
//             expect(err).to.be.a("object");
//             expect(err).to.haveOwnProperty("msg");
//             expect(err).to.haveOwnProperty("type_error");
//             expect(err.type_error).to.equal("no-valid");
//             done();
//         });
//     });
// });

it('Supprimer des Utilisateurs fictifs', (done) => {
    UserService.deleteManyUsers(TabUserId, null, function (err, value) {
        done()
    })
})