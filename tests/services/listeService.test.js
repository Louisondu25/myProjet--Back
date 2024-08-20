const ListeService = require("../../services/ListeService");
const UserService = require('../../services/UserService')
const chai = require("chai");
let expect = chai.expect;
const _ = require("lodash");
var id_liste_valid = "";
var tab_id_listes = [];
var tab_id_users = [];
var listes = []


var users = [
    {
        firstName: "detenteur  d'liste 1",
        lastName: "Iencli",
        username: "oui1",
        email: "Iencli@gmail.com",
        password: "higuys"
    },
    {
        firstName: "detenteur  d'liste 2",
        lastName: "Iencli",
        username: "oui2",
        email: "Iencli2@gmail.com",
        password: "higuys"

    }, {
        firstName: "detenteur  d'liste 3",
        lastName: "Iencli",
        username: "oui3",
        email: "Iencli3@gmail.com",
        password: "higuys"
    },
    {
        firstName: "detenteur  d'liste 4",
        lastName: "Iencli",
        username: "oui4",
        email: "Iencli4@gmail.com",
        password: "higuys"
    },
    {
        firstName: "detenteur  d'liste 5",
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

describe("addOneListe", () => {
    it("Liste correct. - S", (done) => {
        var liste = {
            name: "Carottes",
            description: "blabla",
            price: 2.50,
            quantity: 500,
            created_at: new Date(),
            updated_at: new Date(),
            user_id: rdm_users(tab_id_users),
            password: "higuys"
        };
        ListeService.addOneListe(liste, null, function (err, value) {
            expect(value).to.be.a("object");
            expect(value).to.haveOwnProperty("_id");
            expect(value).to.haveOwnProperty("user_id");
            id_liste_valid = value._id;
            done()
            //
        });
    });
    it("Liste incorrect. (Sans Name) - E", (done) => {
        var liste_no_valid = {
            description: "blabla",
            price: 2.50,
            quantity: 500,
            created_at: new Date(),
            updated_at: new Date(),
            user_id: rdm_users(tab_id_users),
            password: "higuys"
        };
        ListeService.addOneListe(liste_no_valid, null, function (err, value) {
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

describe("addManyListes", () => {
    it("Listes à ajouter, non valide. - E", (done) => {
        var listes_tab_error = [
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
        ListeService.addManyListes(listes_tab_error, null, function (err, value) {
            done();
        });
    });

    it("Listes à ajouter, valide. - S", (done) => {
        var listes_tab = [
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

        ListeService.addManyListes(listes_tab, null, function (err, value) {
            tab_id_listes = _.map(value, "_id");
            expect(value).lengthOf(3);
            listes = [...value, ...listes]
            done();
        });
    });
});

describe("findOneListeById", () => {
    it("Chercher un Liste existant correct. - S", (done) => {
        ListeService.findOneListeById(id_liste_valid, null, function (err, value) {
            expect(value).to.be.a("object");
            expect(value).to.haveOwnProperty("_id");
            expect(value).to.haveOwnProperty("description");
            done();
        });
    });
    it("Chercher un Liste non-existant correct. - E", (done) => {
        ListeService.findOneListeById("100", null, function (err, value) {
            expect(err).to.haveOwnProperty("msg");
            expect(err).to.haveOwnProperty("type_error");
            expect(err["type_error"]).to.equal("no-valid");
            done();
        });
    });
});

describe('findOneListe', () => {
    it('Chercher un Liste avec un champ autorisé - S', (done) => {
        ListeService.findOneListe(['name'], listes[0].name, null, (err, value) => {
            expect(value).to.haveOwnProperty('name');
            done();
        });
    });

    it('Chercher un Liste avec un champ non autorisé - E', (done) => {
        ListeService.findOneListe(['listename', 'firstName'], listes[0].name, null, (err, value) => {
            expect(err).to.haveOwnProperty('type_error');
            done();
        });
    });

    it('Chercher un Liste sans tableau de champ -E', (done) => {
        ListeService.findOneListe('email', listes[0].name, null, (err, value) => {
            expect(err).to.haveOwnProperty('type_error');
            done();
        });
    });

    it('chercher un Liste inexistant', (done) => {
        ListeService.findOneListe(['email'], 'listes[0].listename', null, (err, value) => {
            expect(err).to.haveOwnProperty('type_error');
            done();
        });
    });
});

describe('findManyListes', () => {
    it('Retourne 3 Listes sur les 4 - S ', (done) => {
        ListeService.findManyListes(null, 1, 3, null, function (err, value,) {

            expect(value).to.haveOwnProperty('count')
            expect(value).to.haveOwnProperty('results')
            expect(value['count']).to.be.equal(4)
            expect(value['results']).lengthOf(3)
            expect(err).to.be.null
            done()
        })
    })
    it('Envoi chaine de caractere sur page - E ', (done) => {
        ListeService.findManyListes(null, 'hi', 3, null, function (err, value) {
            expect(err).to.haveOwnProperty('type_error')
            expect(err['type_error']).to.be.equal('no-valid')
            expect(value).to.be.undefined
            done()
        })
    })
})

describe("updateOneListe", () => {
    it("Modifier un Liste correct. - S", (done) => {
        ListeService.updateOneListe(
            id_liste_valid,
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
    it("Modifier un Liste avec id incorrect. - E", (done) => {
        ListeService.updateOneListe(
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
    it("Modifier un Liste avec des champs requis vide. - E", (done) => {
        ListeService.updateOneListe(
            id_liste_valid,
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

describe("updateManyListes", () => {
    it("Modifier plusieurs Listes correctement. - S", (done) => {
        ListeService.updateManyListes(tab_id_listes, { name: "Choux", description: "Hello" }, null, function (err, value) {
            expect(value).to.haveOwnProperty("modifiedCount");
            expect(value).to.haveOwnProperty("matchedCount");
            expect(value["matchedCount"]).to.be.equal(tab_id_listes.length);
            expect(value["modifiedCount"]).to.be.equal(tab_id_listes.length);
            done();
        }
        );
    });
    it("Modifier plusieurs Listes avec id incorrect. - E", (done) => {
        ListeService.updateManyListes("1200", { firstName: "Jean", lastName: "Luc" }, null, function (err, value) {
            expect(err).to.be.a("object");
            expect(err).to.haveOwnProperty("msg");
            expect(err).to.haveOwnProperty("type_error");
            expect(err["type_error"]).to.be.equal("no-valid");
            done();
        }
        );
    });
    it("Modifier plusieurs Listes avec des champs requis vide. - E", (done) => {
        ListeService.updateManyListes(
            tab_id_listes,
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

describe("deleteOneListe", () => {
    it("Supprimer un Liste correctement. - S", (done) => {
        ListeService.deleteOneListe(id_liste_valid, null, function (err, value) {
            expect(value).to.be.a('Object')
            expect(value).to.haveOwnProperty("name");
            expect(value).to.haveOwnProperty("description");
            done()
        });
    });
    it("Supprimer un Listes avec id incorrect. - E", (done) => {
        ListeService.deleteOneListe("1200", null, function (err, value) {
            expect(err).to.be.a("object");
            expect(err).to.haveOwnProperty("msg");
            expect(err).to.haveOwnProperty("type_error");
            expect(err["type_error"]).to.be.equal("no-valid");
            done();
        });
    });
    it("Supprimer un Liste qui n'existe pas. - E", () => {
        ListeService.deleteOneListe(id_liste_valid, null, function (err, value) {
            expect(err).to.be.a("object");
            expect(err).to.haveOwnProperty("msg");
            expect(err).to.haveOwnProperty("type_error");
            expect(err["type_error"]).to.be.equal("no-found");
        });
    });
});

describe("deleteManyListes", () => {
    it("Supprimer plusieurs Listes correctement. - S", (done) => {
        ListeService.deleteManyListes(tab_id_listes, null, (err, value) => {
            expect(value).to.be.a("object");
            expect(value).to.haveOwnProperty("deletedCount");
            expect(value.deletedCount).to.equal(tab_id_listes.length);
            done();
        });
    });

    it("Supprimer plusieurs Listes avec id incorrect. - E", (done) => {
        ListeService.deleteManyListes("1200", null, (err, value) => {
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