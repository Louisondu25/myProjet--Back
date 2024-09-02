const AstuceService = require("../../services/AstuceService");
const UserService = require('../../services/UserService')
const chai = require("chai");
let expect = chai.expect;
const _ = require("lodash");
var id_astuce_valid = "";
var tab_id_astuces = [];
var tab_id_users = [];
var astuces = []


var users = [
    {
        firstName: "detenteur  d'astuce 1",
        lastName: "Iencli",
        username: "oui1",
        email: "Iencli@gmail.com",
        password: "higuys",
        phoneNumber: "15415215"
    },
    {
        firstName: "detenteur  d'astuce 2",
        lastName: "Iencli",
        username: "oui2",
        email: "Iencli2@gmail.com",
        password: "higuys",
        phoneNumber: "15415215"

    }, {
        firstName: "detenteur  d'astuce 3",
        lastName: "Iencli",
        username: "oui3",
        email: "Iencli3@gmail.com",
        password: "higuys",
        phoneNumber: "15415215"
    },
    {
        firstName: "detenteur  d'astuce 4",
        lastName: "Iencli",
        username: "oui4",
        email: "Iencli4@gmail.com",
        password: "higuys",
        phoneNumber: "15415215"
    },
    {
        firstName: "detenteur  d'astuce 5",
        lastName: "Iencli",
        username: "oui5",
        email: "Iencli5@gmail.com",
        password: "higuys",
        phoneNumber: "15415215"
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

describe("addOneAstuce", () => {
    it("Astuce correct. - S", (done) => {
        var astuce = {
            title: 'Carottes',
            astuce: "Plantez vos graines",
            theme_id: '66cc482f14bfa7cf4dc496ad',
            board_id: '66bb1c1b2bbcb76e3c7cacf4',
            created_at: new Date(),
            updated_at: new Date(),
            user_id: rdm_users(tab_id_users),
        };
        AstuceService.addOneAstuce(astuce, null, function (err, value) {
            expect(value).to.be.a("object");
            expect(value).to.haveOwnProperty("_id");
            expect(value).to.haveOwnProperty("user_id");
            id_astuce_valid = value._id;
            done()
            //
        });
    });
    it("Astuce incorrect. (Sans Title) - E", (done) => {
        var astuce_no_valid = {
            astuce: "Plantez vos graines",
            theme_id: '66cc482f14bfa7cf4dc496ad',
            board_id: '66bb1c1b2bbcb76e3c7cacf4',
            created_at: new Date(),
            updated_at: new Date(),
            user_id: rdm_users(tab_id_users),
        };
        AstuceService.addOneAstuce(astuce_no_valid, null, function (err, value) {
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

describe("addManyAstuces", () => {
    it("Astuces à ajouter, non valide. - E", (done) => {
        var astuces_tab_error = [
            {
                astuce: "Plantez vos graines",
                theme_id: '66cc482f14bfa7cf4dc496ad',
                board_id: '66bb1c1b2bbcb76e3c7cacf4',
                created_at: new Date(),
                updated_at: new Date(),
                user_id: rdm_users(tab_id_users),
            },
            {
                theme_id: '66cc482f14bfa7cf4dc496ad',
                board_id: '66bb1c1b2bbcb76e3c7cacf4',
                created_at: new Date(),
                updated_at: new Date(),
                user_id: rdm_users(tab_id_users),
            },
            {
                created_at: new Date(),
                updated_at: new Date(),
                user_id: rdm_users(tab_id_users),
            },
            {
                board_id: '66bb1c1b2bbcb76e3c7cacf4',
                created_at: new Date(),
                updated_at: new Date(),
                user_id: rdm_users(tab_id_users),
            },
        ];
        AstuceService.addManyAstuces(astuces_tab_error, null, function (err, value) {
            done();
        });
    });

    it("Astuces à ajouter, valide. - S", (done) => {
        var astuces_tab = [
            {
                title: 'Pomme de terre',
                astuce: "Arroser votre terreau",
                theme_id: '66cc482f14bfa7cf4dc496ad',
                board_id: '66bb1c1b2bbcb76e3c7cacf4',
                created_at: new Date(),
                updated_at: new Date(),
                user_id: rdm_users(tab_id_users),
            },
            {
                title: 'Tomate',
                astuce: "Meetre dans une serre",
                theme_id: '66cc482f14bfa7cf4dc496ad',
                board_id: '66bb1c1b2bbcb76e3c7cacf4',
                created_at: new Date(),
                updated_at: new Date(),
                user_id: rdm_users(tab_id_users),
            },
            {
                title: 'Navet',
                astuce: "Gerez l'Humidité de vos Navet",
                theme_id: '66cc482f14bfa7cf4dc496ad',
                board_id: '66bb1c1b2bbcb76e3c7cacf4',
                created_at: new Date(),
                updated_at: new Date(),
                user_id: rdm_users(tab_id_users),
            },
        ];

        AstuceService.addManyAstuces(astuces_tab, null, function (err, value) {
            tab_id_astuces = _.map(value, "_id");
            expect(value).lengthOf(3);
            astuces = [...value, ...astuces]
            done();
        });
    });
});

describe("findOneAstuceById", () => {
    it("Chercher une Astuce existant correct. - S", (done) => {
        AstuceService.findOneAstuceById(id_astuce_valid, null, function (err, value) {
            expect(value).to.be.a("object");
            expect(value).to.haveOwnProperty("_id");
            done();
        });
    });
    it("Chercher un Astuce non-existant correct. - E", (done) => {
        AstuceService.findOneAstuceById("100", null, function (err, value) {
            expect(err).to.haveOwnProperty("msg");
            expect(err).to.haveOwnProperty("type_error");
            expect(err["type_error"]).to.equal("no-valid");
            done();
        });
    });
});

describe('findOneAstuce', () => {
    it('Chercher un Astuce avec un champ autorisé - S', (done) => {
        AstuceService.findOneAstuce(['title'], astuces[0].title, null, (err, value) => {
            expect(value).to.haveOwnProperty('title');
            done();
        });
    });

    it('Chercher un Astuce avec un champ non autorisé - E', (done) => {
        AstuceService.findOneAstuce(['astucename', 'firstName'], astuces[0].name, null, (err, value) => {
            expect(err).to.haveOwnProperty('type_error');
            done();
        });
    });

    it('Chercher un Astuce sans tableau de champ -E', (done) => {
        AstuceService.findOneAstuce('email', astuces[0].name, null, (err, value) => {
            expect(err).to.haveOwnProperty('type_error');
            done();
        });
    });

    it('chercher un Astuce inexistant', (done) => {
        AstuceService.findOneAstuce(['email'], 'astuces[0].astucename', null, (err, value) => {
            expect(err).to.haveOwnProperty('type_error');
            done();
        });
    });
});

describe('findManyAstuces', () => {
    it('Retourne 3 Astuces sur les 4 - S ', (done) => {
        AstuceService.findManyAstuces(null, 1, 3, null, function (err, value,) {

            expect(value).to.haveOwnProperty('count')
            expect(value).to.haveOwnProperty('results')
            expect(value['count']).to.be.equal(4)
            expect(value['results']).lengthOf(3)
            expect(err).to.be.null
            done()
        })
    })
    it('Envoi chaine de caractere sur page - E ', (done) => {
        AstuceService.findManyAstuces(null, 'hi', 3, null, function (err, value) {
            expect(err).to.haveOwnProperty('type_error')
            expect(err['type_error']).to.be.equal('no-valid')
            expect(value).to.be.undefined
            done()
        })
    })
})

describe("updateOneAstuce", () => {
    it("Modifier un Astuce correct. - S", (done) => {
        AstuceService.updateOneAstuce(
            id_astuce_valid,
            { title: "Choux", astuce:"Arroser vos champs", },
            null,
            function (err, value) {
                expect(value).to.be.a("object");
                expect(value).to.haveOwnProperty("_id");
                expect(value).to.haveOwnProperty("title");
                expect(value).to.haveOwnProperty("astuce");
                expect(value["title"]).to.be.equal("Choux");
                expect(value["astuce"]).to.be.equal("Arroser vos champs");
                done();
            }
        );
    });
    it("Modifier un Astuce avec id incorrect. - E", (done) => {
        AstuceService.updateOneAstuce(
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
    it("Modifier un Astuce avec des champs requis vide. - E", (done) => {
        AstuceService.updateOneAstuce(
            id_astuce_valid,
            { title: "", astuce: "Creuser un trou de 20 cm" }, null,
            function (err, value) {
                expect(value).to.be.undefined;
                expect(err).to.haveOwnProperty("msg");
                expect(err).to.haveOwnProperty("fields_with_error").with.lengthOf(1);
                expect(err).to.haveOwnProperty("fields");
                expect(err["fields"]).to.haveOwnProperty("title");
                expect(err["fields"]["title"]).to.equal("Path `title` is required.");
                done();
            }
        );
    });
});

describe("updateManyAstuces", () => {
    it("Modifier plusieurs Astuces correctement. - S", (done) => {
        AstuceService.updateManyAstuces(tab_id_astuces, { title: "Preparation" }, null, function (err, value) {
            expect(value).to.haveOwnProperty("modifiedCount");
            expect(value).to.haveOwnProperty("matchedCount");
            expect(value["matchedCount"]).to.be.equal(tab_id_astuces.length);
            expect(value["modifiedCount"]).to.be.equal(tab_id_astuces.length);
            done();
        }
        );
    });
    it("Modifier plusieurs Astuces avec id incorrect. - E", (done) => {
        AstuceService.updateManyAstuces("1200", { firstName: "Jean", lastName: "Luc" }, null, function (err, value) {
            expect(err).to.be.a("object");
            expect(err).to.haveOwnProperty("msg");
            expect(err).to.haveOwnProperty("type_error");
            expect(err["type_error"]).to.be.equal("no-valid");
            done();
        }
        );
    });
    it("Modifier plusieurs Astuces avec des champs requis vide. - E", (done) => {
        AstuceService.updateManyAstuces(
            tab_id_astuces,
            { title: "", astuce: "Creuser un trou" }, null,
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

describe("deleteOneAstuce", () => {
    it("Supprimer un Astuce correctement. - S", (done) => {
        AstuceService.deleteOneAstuce(id_astuce_valid, null, function (err, value) {
            expect(value).to.be.a('Object')
            expect(value).to.haveOwnProperty("title");
            done()
        });
    });
    it("Supprimer un Astuces avec id incorrect. - E", (done) => {
        AstuceService.deleteOneAstuce("1200", null, function (err, value) {
            expect(err).to.be.a("object");
            expect(err).to.haveOwnProperty("msg");
            expect(err).to.haveOwnProperty("type_error");
            expect(err["type_error"]).to.be.equal("no-valid");
            done();
        });
    });
    it("Supprimer un Astuce qui n'existe pas. - E", () => {
        AstuceService.deleteOneAstuce(id_astuce_valid, null, function (err, value) {
            expect(err).to.be.a("object");
            expect(err).to.haveOwnProperty("msg");
            expect(err).to.haveOwnProperty("type_error");
            expect(err["type_error"]).to.be.equal("no-found");
        });
    });
});

describe("deleteManyAstuces", () => {
    it("Supprimer plusieurs Astuces correctement. - S", (done) => {
        AstuceService.deleteManyAstuces(tab_id_astuces, null, (err, value) => {
            expect(value).to.be.a("object");
            expect(value).to.haveOwnProperty("deletedCount");
            expect(value.deletedCount).to.equal(tab_id_astuces.length);
            done();
        });
    });

    it("Supprimer plusieurs Astuces avec id incorrect. - E", (done) => {
        AstuceService.deleteManyAstuces("1200", null, (err, value) => {
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