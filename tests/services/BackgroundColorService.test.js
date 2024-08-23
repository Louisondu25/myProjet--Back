const BackgroundColorService = require("../../services/BackgroundColorService");
const UserService = require('../../services/UserService')
const chai = require("chai");
let expect = chai.expect;
const _ = require("lodash");
var id_backgroundcolor_valid = "";
var tab_id_backgroundcolors = [];
var tab_id_users = [];
var backgroundcolors = []


var users = [
    {
        firstName: "detenteur  d'backgroundcolor 1",
        lastName: "Iencli",
        username: "oui1",
        email: "Iencli@gmail.com",
        password: "higuys"
    },
    {
        firstName: "detenteur  d'backgroundcolor 2",
        lastName: "Iencli",
        username: "oui2",
        email: "Iencli2@gmail.com",
        password: "higuys"

    }, {
        firstName: "detenteur  d'backgroundcolor 3",
        lastName: "Iencli",
        username: "oui3",
        email: "Iencli3@gmail.com",
        password: "higuys"
    },
    {
        firstName: "detenteur  d'backgroundcolor 4",
        lastName: "Iencli",
        username: "oui4",
        email: "Iencli4@gmail.com",
        password: "higuys"
    },
    {
        firstName: "detenteur  d'backgroundcolor 5",
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

describe("addOneBackgroundColor", () => {
    it("BackgroundColor correct. - S", (done) => {
        var backgroundcolor = {
            name: "Carottes",
            description: "blabla",
            price: 2.50,
            quantity: 500,
            created_at: new Date(),
            updated_at: new Date(),
            user_id: rdm_users(tab_id_users),
            password: "higuys"
        };
        BackgroundColorService.addOneBackgroundColor(backgroundcolor, null, function (err, value) {
            expect(value).to.be.a("object");
            expect(value).to.haveOwnProperty("_id");
            expect(value).to.haveOwnProperty("user_id");
            id_backgroundcolor_valid = value._id;
            done()
            //
        });
    });
    it("BackgroundColor incorrect. (Sans Name) - E", (done) => {
        var backgroundcolor_no_valid = {
            description: "blabla",
            price: 2.50,
            quantity: 500,
            created_at: new Date(),
            updated_at: new Date(),
            user_id: rdm_users(tab_id_users),
            password: "higuys"
        };
        BackgroundColorService.addOneBackgroundColor(backgroundcolor_no_valid, null, function (err, value) {
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

describe("addManyBackgroundColors", () => {
    it("BackgroundColors à ajouter, non valide. - E", (done) => {
        var backgroundcolors_tab_error = [
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
        BackgroundColorService.addManyBackgroundColors(backgroundcolors_tab_error, null, function (err, value) {
            done();
        });
    });

    it("BackgroundColors à ajouter, valide. - S", (done) => {
        var backgroundcolors_tab = [
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

        BackgroundColorService.addManyBackgroundColors(backgroundcolors_tab, null, function (err, value) {
            tab_id_backgroundcolors = _.map(value, "_id");
            expect(value).lengthOf(3);
            backgroundcolors = [...value, ...backgroundcolors]
            done();
        });
    });
});

describe("findOneBackgroundColorById", () => {
    it("Chercher un BackgroundColor existant correct. - S", (done) => {
        BackgroundColorService.findOneBackgroundColorById(id_backgroundcolor_valid, null, function (err, value) {
            expect(value).to.be.a("object");
            expect(value).to.haveOwnProperty("_id");
            expect(value).to.haveOwnProperty("description");
            done();
        });
    });
    it("Chercher un BackgroundColor non-existant correct. - E", (done) => {
        BackgroundColorService.findOneBackgroundColorById("100", null, function (err, value) {
            expect(err).to.haveOwnProperty("msg");
            expect(err).to.haveOwnProperty("type_error");
            expect(err["type_error"]).to.equal("no-valid");
            done();
        });
    });
});

describe('findOneBackgroundColor', () => {
    it('Chercher un BackgroundColor avec un champ autorisé - S', (done) => {
        BackgroundColorService.findOneBackgroundColor(['name'], backgroundcolors[0].name, null, (err, value) => {
            expect(value).to.haveOwnProperty('name');
            done();
        });
    });

    it('Chercher un BackgroundColor avec un champ non autorisé - E', (done) => {
        BackgroundColorService.findOneBackgroundColor(['backgroundcolorname', 'firstName'], backgroundcolors[0].name, null, (err, value) => {
            expect(err).to.haveOwnProperty('type_error');
            done();
        });
    });

    it('Chercher un BackgroundColor sans tableau de champ -E', (done) => {
        BackgroundColorService.findOneBackgroundColor('email', backgroundcolors[0].name, null, (err, value) => {
            expect(err).to.haveOwnProperty('type_error');
            done();
        });
    });

    it('chercher un BackgroundColor inexistant', (done) => {
        BackgroundColorService.findOneBackgroundColor(['email'], 'backgroundcolors[0].backgroundcolorname', null, (err, value) => {
            expect(err).to.haveOwnProperty('type_error');
            done();
        });
    });
});

describe('findManyBackgroundColors', () => {
    it('Retourne 3 BackgroundColors sur les 4 - S ', (done) => {
        BackgroundColorService.findManyBackgroundColors(null, 1, 3, null, function (err, value,) {

            expect(value).to.haveOwnProperty('count')
            expect(value).to.haveOwnProperty('results')
            expect(value['count']).to.be.equal(4)
            expect(value['results']).lengthOf(3)
            expect(err).to.be.null
            done()
        })
    })
    it('Envoi chaine de caractere sur page - E ', (done) => {
        BackgroundColorService.findManyBackgroundColors(null, 'hi', 3, null, function (err, value) {
            expect(err).to.haveOwnProperty('type_error')
            expect(err['type_error']).to.be.equal('no-valid')
            expect(value).to.be.undefined
            done()
        })
    })
})

describe("updateOneBackgroundColor", () => {
    it("Modifier un BackgroundColor correct. - S", (done) => {
        BackgroundColorService.updateOneBackgroundColor(
            id_backgroundcolor_valid,
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
    it("Modifier un BackgroundColor avec id incorrect. - E", (done) => {
        BackgroundColorService.updateOneBackgroundColor(
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
    it("Modifier un BackgroundColor avec des champs requis vide. - E", (done) => {
        BackgroundColorService.updateOneBackgroundColor(
            id_backgroundcolor_valid,
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

describe("updateManyBackgroundColors", () => {
    it("Modifier plusieurs BackgroundColors correctement. - S", (done) => {
        BackgroundColorService.updateManyBackgroundColors(tab_id_backgroundcolors, { name: "Choux", description: "Hello" }, null, function (err, value) {
            expect(value).to.haveOwnProperty("modifiedCount");
            expect(value).to.haveOwnProperty("matchedCount");
            expect(value["matchedCount"]).to.be.equal(tab_id_backgroundcolors.length);
            expect(value["modifiedCount"]).to.be.equal(tab_id_backgroundcolors.length);
            done();
        }
        );
    });
    it("Modifier plusieurs BackgroundColors avec id incorrect. - E", (done) => {
        BackgroundColorService.updateManyBackgroundColors("1200", { firstName: "Jean", lastName: "Luc" }, null, function (err, value) {
            expect(err).to.be.a("object");
            expect(err).to.haveOwnProperty("msg");
            expect(err).to.haveOwnProperty("type_error");
            expect(err["type_error"]).to.be.equal("no-valid");
            done();
        }
        );
    });
    it("Modifier plusieurs BackgroundColors avec des champs requis vide. - E", (done) => {
        BackgroundColorService.updateManyBackgroundColors(
            tab_id_backgroundcolors,
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

describe("deleteOneBackgroundColor", () => {
    it("Supprimer un BackgroundColor correctement. - S", (done) => {
        BackgroundColorService.deleteOneBackgroundColor(id_backgroundcolor_valid, null, function (err, value) {
            expect(value).to.be.a('Object')
            expect(value).to.haveOwnProperty("name");
            expect(value).to.haveOwnProperty("description");
            done()
        });
    });
    it("Supprimer un BackgroundColors avec id incorrect. - E", (done) => {
        BackgroundColorService.deleteOneBackgroundColor("1200", null, function (err, value) {
            expect(err).to.be.a("object");
            expect(err).to.haveOwnProperty("msg");
            expect(err).to.haveOwnProperty("type_error");
            expect(err["type_error"]).to.be.equal("no-valid");
            done();
        });
    });
    it("Supprimer un BackgroundColor qui n'existe pas. - E", () => {
        BackgroundColorService.deleteOneBackgroundColor(id_backgroundcolor_valid, null, function (err, value) {
            expect(err).to.be.a("object");
            expect(err).to.haveOwnProperty("msg");
            expect(err).to.haveOwnProperty("type_error");
            expect(err["type_error"]).to.be.equal("no-found");
        });
    });
});

describe("deleteManyBackgroundColors", () => {
    it("Supprimer plusieurs BackgroundColors correctement. - S", (done) => {
        BackgroundColorService.deleteManyBackgroundColors(tab_id_backgroundcolors, null, (err, value) => {
            expect(value).to.be.a("object");
            expect(value).to.haveOwnProperty("deletedCount");
            expect(value.deletedCount).to.equal(tab_id_backgroundcolors.length);
            done();
        });
    });

    it("Supprimer plusieurs BackgroundColors avec id incorrect. - E", (done) => {
        BackgroundColorService.deleteManyBackgroundColors("1200", null, (err, value) => {
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