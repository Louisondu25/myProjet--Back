const { text } = require("express");
const LabelService = require("../../services/LabelService");
const UserService = require('../../services/UserService')
const chai = require("chai");
let expect = chai.expect;
const _ = require("lodash");
var ValidLabelId = "";
var TabLabelId = [];
var TabUserId = [];
var labels = []


var users = [
    {
        firstName: "detenteur  d'etiquette 1",
        lastName: "Iencli",
        username: "oui1",
        email: "Iencli@gmail.com",
        password: "higuys",
        age: 10,
        phone_Number: "15415215"
    },
    {
        firstName: "detenteur  d'etiquette 2",
        lastName: "Iencli",
        username: "oui2",
        email: "Iencli2@gmail.com",
        password: "higuys",
        age: 10,
        phone_Number: "15415215"

    }, {
        firstName: "detenteur  d'etiquette 3",
        lastName: "Iencli",
        username: "oui3",
        email: "Iencli3@gmail.com",
        password: "higuys",
        age: 10,
        phone_Number: "15415215"
    },
    {
        firstName: "detenteur  d'etiquette 4",
        lastName: "Iencli",
        username: "oui4",
        email: "Iencli4@gmail.com",
        password: "higuys",
        age: 10,
        phone_Number: "15415215"
    },
    {
        firstName: "detenteur  d'etiquette 5",
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

describe("addOneLabel", () => {
    it("Etiquette correct. - S", (done) => {
        var label = {
            text: "Label Blue",
            date: 1,
            status: true,
            task_id: "66bc7ded639d08dee594f342",
            user_id: rdm_users(TabUserId),
            board_id: "66bb1c1b2bbcb76e3c7cacf4",
            created_at: new Date(),
            updated_at: new Date(),
        };
        LabelService.addOneLabel(label, null, function (err, value) {
            expect(value).to.be.a("object");
            expect(value).to.haveOwnProperty("_id");
            expect(value).to.haveOwnProperty("user_id");
            ValidLabelId = value._id;
            done()
            //
        });
    }); -
        it("Etiquette incorrect. (Sans Text) - E", (done) => {
            var InvalidLabel = {
                date: 1,
                status: true,
                task_id: "66bc7ded639d08dee594f342",
                user_id: rdm_users(TabUserId),
                board_id: "66bb1c1b2bbcb76e3c7cacf4",
                created_at: new Date(),
                updated_at: new Date(),
            };
            LabelService.addOneLabel(InvalidLabel, null, function (err, value) {
                expect(err).to.haveOwnProperty("msg");
                expect(err).to.haveOwnProperty("fields_with_error").with.lengthOf(1);
                expect(err).to.haveOwnProperty("fields");
                expect(err["fields"]).to.haveOwnProperty("text");
                expect(err["fields"]["text"]).to.equal(
                    "Path `text` is required."
                );
                done()
            });
        });
});

describe("addManyLabels", () => {
    it("Etiquettes à ajouter, non valide. - E", (done) => {
        var ErrorTabLabel = [
            {
                date: 1,
                status: true,
                task_id: "66bc7ded639d08dee594f342",
                user_id: rdm_users(TabUserId),
                board_id: "66bb1c1b2bbcb76e3c7cacf4",
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                text: "Label Blue",
                date: 2,
                status: true,
                task_id: "66bc7ded639d08dee594f342",
                user_id: rdm_users(TabUserId),
                board_id: "66bb1c1b2bbcb76e3c7cacf4",
            },
            {
                text: "Label Blue",
                date: 3,
                status: true,
                task_id: "66bc7ded639d08dee594f342",
                user_id: rdm_users(TabUserId),
            },
            {
                text: "Label Blue",
                date: 4,
                status: true,
                created_at: new Date(),
                updated_at: new Date(),
            },
        ];
        LabelService.addManyLabels(ErrorTabLabel, null, function (err, value) {
            expect(err[0]).to.haveOwnProperty("msg");
            expect(err[0]).to.haveOwnProperty("type_error");
            done();
        });
    });

    it("Etiquettes à ajouter, valide. - S", (done) => {
        var TabLabel = [
            {
                text: "Label Green",
                date: 1,
                status: true,
                task_id: "66bc7ded639d08dee594f342",
                user_id: rdm_users(TabUserId),
                board_id: "66bb1c1b2bbcb76e3c7cacf4",
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                text: "Label Red",
                date: 2,
                status: true,
                task_id: "66bc7ded639d08dee594f342",
                user_id: rdm_users(TabUserId),
                board_id: "66bb1c1b2bbcb76e3c7cacf4",
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                text: "Label Purple",
                date: 3,
                status: true,
                task_id: "66bc7ded639d08dee594f342",
                user_id: rdm_users(TabUserId),
                board_id: "66bb1c1b2bbcb76e3c7cacf4",
                created_at: new Date(),
                updated_at: new Date(),
            },
        ];

        LabelService.addManyLabels(TabLabel, null, function (err, value) {
            TabLabelId = _.map(value, "_id");
            expect(value).lengthOf(3);
            labels = [...value, ...labels]
            done();
        });
    });
});

describe("findOneLabelById", () => {
    it("Chercher une Etiquette existant correct. - S", (done) => {
        LabelService.findOneLabelById(ValidLabelId, null, function (err, value) {
            expect(value).to.be.a("object");
            expect(value).to.haveOwnProperty("_id");
            done();
        });
    });
    it("Chercher une Etiquette non-existant correct. - E", (done) => {
        LabelService.findOneLabelById("100", null, function (err, value) {
            expect(err).to.haveOwnProperty("msg");
            expect(err).to.haveOwnProperty("type_error");
            expect(err["type_error"]).to.equal("no-valid");
            done();
        });
    });
});

describe('findOneLabel', () => {
    it('Chercher une Etiquette avec un champ autorisé - S', (done) => {
        LabelService.findOneLabel(['text'], labels[0].text, null, (err, value) => {
            expect(value).to.haveOwnProperty('text');
            done();
        });
    });

    it('Chercher une Etiquette avec un champ non autorisé - E', (done) => {
        LabelService.findOneLabel(['labelname', 'firstName'], labels[0].name, null, (err, value) => {
            expect(err).to.haveOwnProperty('type_error');
            done();
        });
    });

    it('Chercher une Etiquette sans tableau de champ -E', (done) => {
        LabelService.findOneLabel('email', labels[0].name, null, (err, value) => {
            expect(err).to.haveOwnProperty('type_error');
            done();
        });
    });

    it('chercher une Etiquette inexistant', (done) => {
        LabelService.findOneLabel(['email'], 'labels[0].labelname', null, (err, value) => {
            expect(err).to.haveOwnProperty('type_error');
            done();
        });
    });
});

describe('findManyLabels', () => {
    it('Retourne 3 Etiquettes sur les 4 - S ', (done) => {
        LabelService.findManyLabels(null, 1, 3, null, function (err, value,) {
            expect(value).to.haveOwnProperty('count')
            expect(value).to.haveOwnProperty('results')
            expect(value['count']).to.be.equal(4)
            expect(value['results']).lengthOf(3)
            expect(err).to.be.null
            done()
        })
    })
    it('Envoi chaine de caractere sur page - E ', (done) => {
        LabelService.findManyLabels(null, 'hi', 3, null, function (err, value) {
            expect(err).to.haveOwnProperty('type_error')
            expect(err['type_error']).to.be.equal('no-valid')
            expect(value).to.be.undefined
            done()
        })
    })
})

describe("updateOneLabel", () => {
    it("Modifier une Etiquette correct. - S", (done) => {
        LabelService.updateOneLabel(
            ValidLabelId,
            { text: "Choux", status: true },
            null,
            function (err, value) {
                expect(value).to.be.a("object");
                expect(value).to.haveOwnProperty("_id");
                expect(value).to.haveOwnProperty("text");
                expect(value).to.haveOwnProperty("status");
                expect(value["text"]).to.be.equal("Choux");
                expect(value["status"]).to.be.equal(true);
                done();
            }
        );
    });
    it("Modifier une Etiquette avec id incorrect. - E", (done) => {
        LabelService.updateOneLabel("1200", { firstName: "Jean", lastname: "Luc" }, null,
            function (err, value) {
                expect(err).to.be.a("object");
                expect(err).to.haveOwnProperty("msg");
                expect(err).to.haveOwnProperty("type_error");
                expect(err["type_error"]).to.be.equal("no-valid");
                done();
            }
        );
    });
    it("Modifier une Etriquette avec des champs requis vide. - E", (done) => {
        LabelService.updateOneLabel(ValidLabelId, { text: "", status: false }, null, function (err, value) {
            expect(value).to.be.undefined;
            expect(err).to.haveOwnProperty("msg");
            expect(err).to.haveOwnProperty("fields_with_error").with.lengthOf(1);
            expect(err).to.haveOwnProperty("fields");
            expect(err["fields"]).to.haveOwnProperty("text");
            expect(err["fields"]["text"]).to.equal("Path `text` is required.");
            done();
        }
        );
    });
});

describe("updateManyLabels", () => {
    it("Modifier plusieurs Etiquettes correctement. - S", (done) => {
        LabelService.updateManyLabels(TabLabelId, { status: false }, null, function (err, value) {
            expect(value).to.haveOwnProperty("modifiedCount");
            expect(value).to.haveOwnProperty("matchedCount");
            expect(value["matchedCount"]).to.be.equal(TabLabelId.length);
            expect(value["modifiedCount"]).to.be.equal(TabLabelId.length);
            done();
        }
        );
    });
    it("Modifier plusieurs Etiquettes avec id incorrect. - E", (done) => {
        LabelService.updateManyLabels("1200", { firstName: "Jean", lastName: "Luc" }, null, function (err, value) {
            expect(err).to.be.a("object");
            expect(err).to.haveOwnProperty("msg");
            expect(err).to.haveOwnProperty("type_error");
            expect(err["type_error"]).to.be.equal("no-valid");
            done();
        }
        );
    });
    it("Modifier plusieurs Etiquettes avec des champs requis vide. - E", (done) => {
        LabelService.updateManyLabels(
            TabLabelId,
            { text: "", status: false }, null,
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

describe("deleteOneLabel", () => {
    it("Supprimer une Etiquette correctement. - S", (done) => {
        LabelService.deleteOneLabel(ValidLabelId, null, function (err, value) {
            expect(value).to.be.a('Object')
            expect(value).to.haveOwnProperty("text");
            expect(value).to.haveOwnProperty("status");
            done()
        });
    });
    it("Supprimer une Etiquette avec id incorrect. - E", (done) => {
        LabelService.deleteOneLabel("1200", null, function (err, value) {
            expect(err).to.be.a("object");
            expect(err).to.haveOwnProperty("msg");
            expect(err).to.haveOwnProperty("type_error");
            expect(err["type_error"]).to.be.equal("no-valid");
            done();
        });
    });
    it("Supprimer une Etiquette qui n'existe pas. - E", () => {
        LabelService.deleteOneLabel(ValidLabelId, null, function (err, value) {
            expect(err).to.be.a("object");
            expect(err).to.haveOwnProperty("msg");
            expect(err).to.haveOwnProperty("type_error");
            expect(err["type_error"]).to.be.equal("no-found");
        });
    });
});

describe("deleteManyLabels", () => {
    it("Supprimer plusieurs Etiquettes correctement. - S", (done) => {
        LabelService.deleteManyLabels(TabLabelId, null, (err, value) => {
            expect(value).to.be.a("object");
            expect(value).to.haveOwnProperty("deletedCount");
            expect(value.deletedCount).to.equal(TabLabelId.length);
            done();
        });
    });

    it("Supprimer plusieurs Etiquettes avec id incorrect. - E", (done) => {
        LabelService.deleteManyLabels("1200", null, (err, value) => {
            expect(err).to.be.a("object");
            expect(err).to.haveOwnProperty("msg");
            expect(err).to.haveOwnProperty("type_error");
            expect(err.type_error).to.equal("no-valid");
            done();
        });
    });
});

it('Supprimer des Utilisateurs fictifs', (done) => {
    UserService.deleteManyUsers(TabUserId, null, function (err, value) {
        done()
    })
})