const CarteService = require("../../services/CarteService");
const UserService = require('../../services/UserService')
const chai = require("chai");
let expect = chai.expect;
const _ = require("lodash");
var id_carte_valid = "";
var tab_id_cartes = [];
var tab_id_users = [];
var cartes = []


var users = [
    {
        firstName: "detenteur  de carte 1",
        lastName: "Iencli",
        username: "oui1",
        email: "Iencli@gmail.com",
        password: "higuys"
    },
    {
        firstName: "detenteur  de carte 2",
        lastName: "Iencli",
        username: "oui2",
        email: "Iencli2@gmail.com",
        password: "higuys"

    }, {
        firstName: "detenteur  de carte 3",
        lastName: "Iencli",
        username: "oui3",
        email: "Iencli3@gmail.com",
        password: "higuys"
    },
    {
        firstName: "detenteur  d'carte 4",
        lastName: "Iencli",
        username: "oui4",
        email: "Iencli4@gmail.com",
        password: "higuys"
    },
    {
        firstName: "detenteur  d'carte 5",
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

describe("addOneCarte", () => {
    it("Carte correct. - S", (done) => {
        var carte = {
            name: "Carottes",
            description: "blabla",
            price: 2.50,
            quantity: 500,
            created_at: new Date(),
            updated_at: new Date(),
            user_id: rdm_users(tab_id_users),
            password: "higuys"
        };
        CarteService.addOneCarte(carte, null, function (err, value) {
            expect(value).to.be.a("object");
            expect(value).to.haveOwnProperty("_id");
            expect(value).to.haveOwnProperty("user_id");
            id_carte_valid = value._id;
            done()
            //
        });
    });
    it("Carte incorrect. (Sans Name) - E", (done) => {
        var carte_no_valid = {
            description: "blabla",
            price: 2.50,
            quantity: 500,
            created_at: new Date(),
            updated_at: new Date(),
            user_id: rdm_users(tab_id_users),
            password: "higuys"
        };
        CarteService.addOneCarte(carte_no_valid, null, function (err, value) {
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

describe("addManyCartes", () => {
    it("Cartes à ajouter, non valide. - E", (done) => {
        var cartes_tab_error = [
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
        CarteService.addManyCartes(cartes_tab_error, null, function (err, value) {
            done();
        });
    });

    it("Cartes à ajouter, valide. - S", (done) => {
        var cartes_tab = [
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

        CarteService.addManyCartes(cartes_tab, null, function (err, value) {
            tab_id_cartes = _.map(value, "_id");
            expect(value).lengthOf(3);
            cartes = [...value, ...cartes]
            done();
        });
    });
});

describe("findOneCarteById", () => {
    it("Chercher un Carte existant correct. - S", (done) => {
        CarteService.findOneCarteById(id_carte_valid, null, function (err, value) {
            expect(value).to.be.a("object");
            expect(value).to.haveOwnProperty("_id");
            expect(value).to.haveOwnProperty("description");
            done();
        });
    });
    it("Chercher un Carte non-existant correct. - E", (done) => {
        CarteService.findOneCarteById("100", null, function (err, value) {
            expect(err).to.haveOwnProperty("msg");
            expect(err).to.haveOwnProperty("type_error");
            expect(err["type_error"]).to.equal("no-valid");
            done();
        });
    });
});

describe('findOneCarte', () => {
    it('Chercher un Carte avec un champ autorisé - S', (done) => {
        CarteService.findOneCarte(['name'], cartes[0].name, null, (err, value) => {
            expect(value).to.haveOwnProperty('name');
            done();
        });
    });

    it('Chercher un Carte avec un champ non autorisé - E', (done) => {
        CarteService.findOneCarte(['cartename', 'firstName'], cartes[0].name, null, (err, value) => {
            expect(err).to.haveOwnProperty('type_error');
            done();
        });
    });

    it('Chercher un Carte sans tableau de champ -E', (done) => {
        CarteService.findOneCarte('email', cartes[0].name, null, (err, value) => {
            expect(err).to.haveOwnProperty('type_error');
            done();
        });
    });

    it('chercher un Carte inexistant', (done) => {
        CarteService.findOneCarte(['email'], 'cartes[0].cartename', null, (err, value) => {
            expect(err).to.haveOwnProperty('type_error');
            done();
        });
    });
});

describe('findManyCartes', () => {
    it('Retourne 3 Cartes sur les 4 - S ', (done) => {
        CarteService.findManyCartes(null, 1, 3, null, function (err, value,) {

            expect(value).to.haveOwnProperty('count')
            expect(value).to.haveOwnProperty('results')
            expect(value['count']).to.be.equal(4)
            expect(value['results']).lengthOf(3)
            expect(err).to.be.null
            done()
        })
    })
    it('Envoi chaine de caractere sur page - E ', (done) => {
        CarteService.findManyCartes(null, 'hi', 3, null, function (err, value) {
            expect(err).to.haveOwnProperty('type_error')
            expect(err['type_error']).to.be.equal('no-valid')
            expect(value).to.be.undefined
            done()
        })
    })
})

describe("updateOneCarte", () => {
    it("Modifier un Carte correct. - S", (done) => {
        CarteService.updateOneCarte(
            id_carte_valid,
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
    it("Modifier un Carte avec id incorrect. - E", (done) => {
        CarteService.updateOneCarte(
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
    it("Modifier un Carte avec des champs requis vide. - E", (done) => {
        CarteService.updateOneCarte(
            id_carte_valid,
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

describe("updateManyCartes", () => {
    it("Modifier plusieurs Cartes correctement. - S", (done) => {
        CarteService.updateManyCartes(tab_id_cartes, { name: "Choux", description: "Hello" }, null, function (err, value) {
            expect(value).to.haveOwnProperty("modifiedCount");
            expect(value).to.haveOwnProperty("matchedCount");
            expect(value["matchedCount"]).to.be.equal(tab_id_cartes.length);
            expect(value["modifiedCount"]).to.be.equal(tab_id_cartes.length);
            done();
        }
        );
    });
    it("Modifier plusieurs Cartes avec id incorrect. - E", (done) => {
        CarteService.updateManyCartes("1200", { firstName: "Jean", lastName: "Luc" }, null, function (err, value) {
            expect(err).to.be.a("object");
            expect(err).to.haveOwnProperty("msg");
            expect(err).to.haveOwnProperty("type_error");
            expect(err["type_error"]).to.be.equal("no-valid");
            done();
        }
        );
    });
    it("Modifier plusieurs Cartes avec des champs requis vide. - E", (done) => {
        CarteService.updateManyCartes(
            tab_id_cartes,
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

describe("deleteOneCarte", () => {
    it("Supprimer un Carte correctement. - S", (done) => {
        CarteService.deleteOneCarte(id_carte_valid, null, function (err, value) {
            expect(value).to.be.a('Object')
            expect(value).to.haveOwnProperty("name");
            expect(value).to.haveOwnProperty("description");
            done()
        });
    });
    it("Supprimer un Cartes avec id incorrect. - E", (done) => {
        CarteService.deleteOneCarte("1200", null, function (err, value) {
            expect(err).to.be.a("object");
            expect(err).to.haveOwnProperty("msg");
            expect(err).to.haveOwnProperty("type_error");
            expect(err["type_error"]).to.be.equal("no-valid");
            done();
        });
    });
    it("Supprimer un Carte qui n'existe pas. - E", () => {
        CarteService.deleteOneCarte(id_carte_valid, null, function (err, value) {
            expect(err).to.be.a("object");
            expect(err).to.haveOwnProperty("msg");
            expect(err).to.haveOwnProperty("type_error");
            expect(err["type_error"]).to.be.equal("no-found");
        });
    });
});

describe("deleteManyCartes", () => {
    it("Supprimer plusieurs Cartes correctement. - S", (done) => {
        CarteService.deleteManyCartes(tab_id_cartes, null, (err, value) => {
            expect(value).to.be.a("object");
            expect(value).to.haveOwnProperty("deletedCount");
            expect(value.deletedCount).to.equal(tab_id_cartes.length);
            done();
        });
    });

    it("Supprimer plusieurs Cartes avec id incorrect. - E", (done) => {
        CarteService.deleteManyCartes("1200", null, (err, value) => {
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