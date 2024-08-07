const CommentService = require("../../services/CommentService");
const UserService = require('../../services/UserService')
const chai = require("chai");
let expect = chai.expect;
const _ = require("lodash");
var ValidCommentId = "";
var TabCommentId = [];
var TabUsersId = [];
var comments = []

var users = [
    {
        firstName: "detenteur  d'un commentaire 1",
        lastName: "Iencli",
        username: "oui1",
        email: "Iencli@gmail.com",
        password: "higuys"
    },
    {
        firstName: "detenteur  d'un commentaire 2",
        lastName: "Iencli",
        username: "oui2",
        email: "Iencli2@gmail.com",
        password: "higuys"

    }, {
        firstName: "detenteur  d'un commentaire 3",
        lastName: "Iencli",
        username: "oui3",
        email: "Iencli3@gmail.com",
        password: "higuys"
    },
    {
        firstName: "detenteur  d'un commentaire 4",
        lastName: "Iencli",
        username: "oui4",
        email: "Iencli4@gmail.com",
        password: "higuys"
    },
    {
        firstName: "detenteur  d'un commentaire 5",
        lastName: "Iencli",
        username: "oui5",
        email: "Iencli5@gmail.com",
        password: "higuys"
    },
]

it('Creation des Utilisateurs fictif', (done) => {
    UserService.addManyUsers(users, null, function (err, value) {
        tab_id_users = _.map(value, '_id')
        done()
    })
})

function rdm_users(tab) {
    var rdm_id = tab[Math.floor(Math.random() * (tab.length - 1))];
    return rdm_id;
}

describe("addOneComment", () => {
    it("Commentaire correct. - S", (done) => {
        var commentaire = {
            text: "Carottes",
            date: 1,
            status: 'hi',
            user_id: rdm_users(tab_id_users),
            task_id: 'doit etre  un Objectid',
            created_at: new Date(),
            updated_at: new Date(),
        };
        CommentService.addOneComment(commentaire, null, function (err, value) {
            expect(value).to.be.a("object");
            expect(value).to.haveOwnProperty("_id");
            expect(value).to.haveOwnProperty("user_id");

            ValidCommentId = value._id;
            done()
            //
        });
    });
    it("Commentaire incorrect. (Sans Name) - E", (done) => {
        var InvalidComment = {
            description: "blabla",
            price: 2.50,
            quantity: 500,
            created_at: new Date(),
            updated_at: new Date(),
            user_id: rdm_users(tab_id_users),
            password: "higuys"
        };
        CommentService.addOneComment(InvalidComment, null, function (err, value) {
            expect(err).to.haveOwnProperty("msg");
            expect(err).to.haveOwnProperty("fields_with_error").with.lengthOf(1);
            expect(err).to.haveOwnProperty("fields");
            expect(err["fields"]).to.haveOwnProperty("name");
            expect(err["fields"]["name"]).to.equal(
                "Path `name` is required."
            );
            done()
        });
    });
});

describe("addManyComments", () => {
    it("Commentaires à ajouter, non valide. - E", (done) => {
        var ErrorTabComment = [
            {
                name: "Carottes",
                description: "Hey Honey",
                price: 2.50,
                quantity: "500",
                created_at: new Date(),
                updated_at: new Date(),
                user_id: rdm_users(tab_id_users),
                password: "higuys"
            },
            {
                name: "Carottes",
                description: "blabla",
                price: 2.50,
                created_at: new Date(),
                updated_at: new Date(),
                user_id: rdm_users(tab_id_users),
                password: "higuys"
            },
            {
                name: "Carottes",
                description: "pookie",
                created_at: new Date(),
                updated_at: new Date(),
                user_id: rdm_users(tab_id_users),
                password: "higuys"
            },
            {
                name: "Carottes",
                description: "blabla",
                user_id: rdm_users(tab_id_users),
                password: "higuys"
            },
        ];
        CommentService.addManyComments(ErrorTabComment, null, function (err, value) {
            done();
        });
    });

    it("Commentaires à ajouter, valide. - S", (done) => {
        var TabComment = [
            {
                name: "Carottes",
                description: "blabla",
                price: 2.50,
                quantity: 500,
                created_at: new Date(),
                updated_at: new Date(),
                user_id: rdm_users(tab_id_users),
                password: "higuys"
            },
            {
                name: "Pomme de terre",
                description: "blabla",
                price: 2.80,
                quantity: 800,
                created_at: new Date(),
                updated_at: new Date(),
                user_id: rdm_users(tab_id_users),
                password: "higuys"
            },
            {
                name: "Navet",
                description: "blabla",
                price: 3.10,
                quantity: 200,
                created_at: new Date(),
                updated_at: new Date(),
                user_id: rdm_users(tab_id_users),
                password: "higuys"
            },
        ];

        CommentService.addManyComments(TabComment, null, function (err, value) {
            TabCommentId = _.map(value, "_id");
            expect(value).lengthOf(3);
            comments = [...value, ...comments]
            done();
        });
    });
});

describe("findOneCommentById", () => {
    it("Chercher un Commentaire existant correct. - S", (done) => {
        CommentService.findOneCommentById(ValidCommentId, null, function (err, value) {
            expect(value).to.be.a("object");
            expect(value).to.haveOwnProperty("_id");
            expect(value).to.haveOwnProperty("description");
            done();
        });
    });
    it("Chercher un Commentaire non-existant correct. - E", (done) => {
        CommentService.findOneCommentById("100", null, function (err, value) {
            expect(err).to.haveOwnProperty("msg");
            expect(err).to.haveOwnProperty("type_error");
            expect(err["type_error"]).to.equal("no-valid");
            done();
        });
    });
});

describe('findOneComment', () => {
    it('Chercher un Commentaire avec un champ autorisé - S', (done) => {
        CommentService.findOneComment(['name'], comments[0].name, null, (err, value) => {
            expect(value).to.haveOwnProperty('name');
            done();
        });
    });

    it('Chercher un Commentaire avec un champ non autorisé - E', (done) => {
        CommentService.findOneComment(['commentname', 'firstName'], comments[0].name, null, (err, value) => {
            expect(err).to.haveOwnProperty('type_error');
            done();
        });
    });

    it('Chercher un Commentaire sans tableau de champ -E', (done) => {
        CommentService.findOneComment('email', comments[0].name, null, (err, value) => {
            expect(err).to.haveOwnProperty('type_error');
            done();
        });
    });

    it('chercher un Commentaire inexistant', (done) => {
        CommentService.findOneComment(['email'], 'comments[0].commentname', null, (err, value) => {
            expect(err).to.haveOwnProperty('type_error');
            done();
        });
    });
});

describe('findManyComments', () => {
    it('Retourne 3 Commentaires sur les 4 - S ', (done) => {
        CommentService.findManyComments(null, 1, 3, null, function (err, value,) {

            expect(value).to.haveOwnProperty('count')
            expect(value).to.haveOwnProperty('results')
            expect(value['count']).to.be.equal(4)
            expect(value['results']).lengthOf(3)
            expect(err).to.be.null
            done()
        })
    })
    it('Envoi chaine de caractere sur page - E ', (done) => {
        CommentService.findManyComments(null, 'hi', 3, null, function (err, value) {
            expect(err).to.haveOwnProperty('type_error')
            expect(err['type_error']).to.be.equal('no-valid')
            expect(value).to.be.undefined
            done()
        })
    })
})

describe("updateOneComment", () => {
    it("Modifier un Commentaire correct. - S", (done) => {
        CommentService.updateOneComment(
             ValidCommentId,
            { name: "Choux", description: "Hello" },
            null,
            function (err, value) {
                expect(value).to.be.a("object");
                expect(value).to.haveOwnProperty("_id");
                expect(value).to.haveOwnProperty("name");
                expect(value).to.haveOwnProperty("description");
                expect(value["name"]).to.be.equal("Choux");
                expect(value["description"]).to.be.equal("Hello");
                done();
            }
        );
    });
    it("Modifier un Commentaire avec id incorrect. - E", (done) => {
        CommentService.updateOneComment(
            "1200",
            { firstName: "Jean", lastName: "Luc" }, null,
            function (err, value) {
                expect(err).to.be.a("object");
                expect(err).to.haveOwnProperty("msg");
                expect(err).to.haveOwnProperty("type_error");
                expect(err["type_error"]).to.be.equal("no-valid");
                done();
            }
        );
    });
    it("Modifier un Commentaire avec des champs requis vide. - E", (done) => {
        CommentService.updateOneComment(
            ValidCommentId,
            { name: "", description: "Hello" }, null,
            function (err, value) {
                expect(value).to.be.undefined;
                expect(err).to.haveOwnProperty("msg");
                expect(err).to.haveOwnProperty("fields_with_error").with.lengthOf(1);
                expect(err).to.haveOwnProperty("fields");
                expect(err["fields"]).to.haveOwnProperty("name");
                expect(err["fields"]["name"]).to.equal("Path `name` is required.");
                done();
            }
        );
    });
});

describe("updateManyComments", () => {
    it("Modifier plusieurs Commentaires correctement. - S", (done) => {
        CommentService.updateManyComments(TabCommentId, { name: "Choux", description: "Hello" }, null, function (err, value) {
            expect(value).to.haveOwnProperty("modifiedCount");
            expect(value).to.haveOwnProperty("matchedCount");
            expect(value["matchedCount"]).to.be.equal(TabCommentId.length);
            expect(value["modifiedCount"]).to.be.equal(TabCommentId.length);
            done();
        }
        );
    });
    it("Modifier plusieurs Commentaires avec id incorrect. - E", (done) => {
        CommentService.updateManyComments("1200", { firstName: "Jean", lastName: "Luc" }, null, function (err, value) {
            expect(err).to.be.a("object");
            expect(err).to.haveOwnProperty("msg");
            expect(err).to.haveOwnProperty("type_error");
            expect(err["type_error"]).to.be.equal("no-valid");
            done();
        }
        );
    });
    it("Modifier plusieurs Commentaires avec des champs requis vide. - E", (done) => {
        CommentService.updateManyComments(
            TabCommentId,
            { name: "", description: "Luc" }, null,
            function (err, value) {
                expect(value).to.be.undefined;
                expect(err).to.haveOwnProperty("msg");
                expect(err).to.haveOwnProperty("fields_with_error").with.lengthOf(1);
                expect(err).to.haveOwnProperty("fields");

                done();
            }
        );
    });
});

describe("deleteOneComment", () => {
    it("Supprimer un Commentaire correctement. - S", () => {
        CommentService.deleteOneComment(ValidCommentId, null, function (err, value) {
            expect(value).to.be.a('Object')
            expect(value).to.haveOwnProperty("firstName");
            expect(value).to.haveOwnProperty("lastName");
        });
    });
    it("Supprimer un Commentaires avec id incorrect. - E", (done) => {
        CommentService.deleteOneComment("1200", null, function (err, value) {
            expect(err).to.be.a("object");
            expect(err).to.haveOwnProperty("msg");
            expect(err).to.haveOwnProperty("type_error");
            expect(err["type_error"]).to.be.equal("no-valid");
            done();
        });
    });
    it("Supprimer un Commentaire qui n'existe pas. - E", () => {
        CommentService.deleteOneComment(ValidCommentId, null, function (err, value) {
            expect(err).to.be.a("object");
            expect(err).to.haveOwnProperty("msg");
            expect(err).to.haveOwnProperty("type_error");
            expect(err["type_error"]).to.be.equal("no-found");
        });
    });
});

describe("deleteManyComments", () => {
    it("Supprimer plusieurs Commentaires correctement. - S", (done) => {
        CommentService.deleteManyComments(TabCommentId, null, (err, value) => {
            expect(value).to.be.a("object");
            expect(value).to.haveOwnProperty("deletedCount");
            expect(value.deletedCount).to.equal(TabCommentId.length);
            done();
        });
    });

    it("Supprimer plusieurs Commentaires avec id incorrect. - E", (done) => {
        CommentService.deleteManyComments("1200", null, (err, value) => {
            expect(err).to.be.a("object");
            expect(err).to.haveOwnProperty("msg");
            expect(err).to.haveOwnProperty("type_error");
            expect(err.type_error).to.equal("no-valid");
            done();
        });
    });
});

it('Supprimer des Utilisateurs fictifs', (done) => {
    UserService.deleteManyUsers(tab_id_users, null, function (err, value) {
        done()
    })
})