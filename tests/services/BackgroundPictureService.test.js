const BackgroundPictureService = require("../../services/BackgroundPictureService");
const UserService = require('../../services/UserService')
const chai = require("chai");
let expect = chai.expect;
const _ = require("lodash");
var id_backgroundpicture_valid = "";
var tab_id_backgroundpictures = [];
var tab_id_users = [];
var backgroundpictures = []


var users = [
    {
        firstName: "detenteur  d'backgroundpicture 1",
        lastName: "Iencli",
        username: "oui1",
        email: "Iencli@gmail.com",
        password: "higuys",
        phoneNumber: "15415215"
    },
    {
        firstName: "detenteur  d'backgroundpicture 2",
        lastName: "Iencli",
        username: "oui2",
        email: "Iencli2@gmail.com",
        password: "higuys",
        phoneNumber: "15415215"

    }, {
        firstName: "detenteur  d'backgroundpicture 3",
        lastName: "Iencli",
        username: "oui3",
        email: "Iencli3@gmail.com",
        password: "higuys",
        phoneNumber: "15415215"
    },
    {
        firstName: "detenteur  d'backgroundpicture 4",
        lastName: "Iencli",
        username: "oui4",
        email: "Iencli4@gmail.com",
        password: "higuys",
        phoneNumber: "15415215"
    },
    {
        firstName: "detenteur  d'backgroundpicture 5",
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

describe("addOneBackgroundPicture", () => {
    it("BackgroundPicture correct. - S", (done) => {
        var backgroundpicture = {
            title: "Histoire",
            image: "blabla",
            board_id: '66bb1c1b2bbcb76e3c7cacf4',
            created_at: new Date(),
            updated_at: new Date(),
            user_id: rdm_users(tab_id_users),
        };
        BackgroundPictureService.addOneBackgroundPicture(backgroundpicture, null, function (err, value) {
            expect(value).to.be.a("object");
            expect(value).to.haveOwnProperty("_id");
            expect(value).to.haveOwnProperty("user_id");
            id_backgroundpicture_valid = value._id;
            done()
            //
        });
    });
    it("BackgroundPicture incorrect. (Sans Title) - E", (done) => {
        var backgroundpicture_no_valid = {
            image: "Equipe Equipe",
            board_id: '66bb1c1b2bbcb76e3c7cacf4',
            created_at: new Date(),
            updated_at: new Date(),
            user_id: rdm_users(tab_id_users),
        };
        BackgroundPictureService.addOneBackgroundPicture(backgroundpicture_no_valid, null, function (err, value) {
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

describe("addManyBackgroundPictures", () => {
    it("BackgroundPictures à ajouter, non valide. - E", (done) => {
        var backgroundpictures_tab_error = [
            {
                image: "blabla",
                board_id: '66bb1c1b2bbcb76e3c7cacf4',
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
            {
                created_at: new Date(),
                updated_at: new Date(),
                user_id: rdm_users(tab_id_users),
            },
            {
                updated_at: new Date(),
                user_id: rdm_users(tab_id_users),
            },
        ];
        BackgroundPictureService.addManyBackgroundPictures(backgroundpictures_tab_error, null, function (err, value) {
            done();
        });
    });

    it("BackgroundPictures à ajouter, valide. - S", (done) => {
        var backgroundpictures_tab = [
            {
                title: "Informatique",
                image: "CPU",
                board_id: '66bb1c1b2bbcb76e3c7cacf4',
                created_at: new Date(),
                updated_at: new Date(),
                user_id: rdm_users(tab_id_users),
            },
            {
                title: "Image",
                image: "Photo",
                board_id: '66bb1c1b2bbcb76e3c7cacf4',
                created_at: new Date(),
                updated_at: new Date(),
                user_id: rdm_users(tab_id_users),
            },
            {
                title: "Jeux Video",
                image: "Call Of Duty",
                board_id: '66bb1c1b2bbcb76e3c7cacf4',
                created_at: new Date(),
                updated_at: new Date(),
                user_id: rdm_users(tab_id_users),
            },
        ];

        BackgroundPictureService.addManyBackgroundPictures(backgroundpictures_tab, null, function (err, value) {
            tab_id_backgroundpictures = _.map(value, "_id");
            expect(value).lengthOf(3);
            backgroundpictures = [...value, ...backgroundpictures]
            done();
        });
    });
});

describe("findOneBackgroundPictureById", () => {
    it("Chercher un BackgroundPicture existant correct. - S", (done) => {
        BackgroundPictureService.findOneBackgroundPictureById(id_backgroundpicture_valid, null, function (err, value) {
            expect(value).to.be.a("object");
            expect(value).to.haveOwnProperty("_id");
            done();
        });
    });
    it("Chercher un BackgroundPicture non-existant correct. - E", (done) => {
        BackgroundPictureService.findOneBackgroundPictureById("100", null, function (err, value) {
            expect(err).to.haveOwnProperty("msg");
            expect(err).to.haveOwnProperty("type_error");
            expect(err["type_error"]).to.equal("no-valid");
            done();
        });
    });
});

describe('findOneBackgroundPicture', () => {
    it('Chercher un BackgroundPicture avec un champ autorisé - S', (done) => {
        BackgroundPictureService.findOneBackgroundPicture(['title'], backgroundpictures[0].title, null, (err, value) => {
            expect(value).to.haveOwnProperty('title');
            done();
        });
    });

    it('Chercher un BackgroundPicture avec un champ non autorisé - E', (done) => {
        BackgroundPictureService.findOneBackgroundPicture(['backgroundpicturename', 'firstName'], backgroundpictures[0].name, null, (err, value) => {
            expect(err).to.haveOwnProperty('type_error');
            done();
        });
    });

    it('Chercher un BackgroundPicture sans tableau de champ -E', (done) => {
        BackgroundPictureService.findOneBackgroundPicture('email', backgroundpictures[0].name, null, (err, value) => {
            expect(err).to.haveOwnProperty('type_error');
            done();
        });
    });

    it('chercher un BackgroundPicture inexistant', (done) => {
        BackgroundPictureService.findOneBackgroundPicture(['email'], 'backgroundpictures[0].backgroundpicturename', null, (err, value) => {
            expect(err).to.haveOwnProperty('type_error');
            done();
        });
    });
});

describe('findManyBackgroundPictures', () => {
    it('Retourne 3 BackgroundPictures sur les 4 - S ', (done) => {
        BackgroundPictureService.findManyBackgroundPictures(null, 1, 3, null, function (err, value,) {

            expect(value).to.haveOwnProperty('count')
            expect(value).to.haveOwnProperty('results')
            expect(value['count']).to.be.equal(4)
            expect(value['results']).lengthOf(3)
            expect(err).to.be.null
            done()
        })
    })
    it('Envoi chaine de caractere sur page - E ', (done) => {
        BackgroundPictureService.findManyBackgroundPictures(null, 'hi', 3, null, function (err, value) {
            expect(err).to.haveOwnProperty('type_error')
            expect(err['type_error']).to.be.equal('no-valid')
            expect(value).to.be.undefined
            done()
        })
    })
})

describe("updateOneBackgroundPicture", () => {
    it("Modifier un BackgroundPicture correct. - S", (done) => {
        BackgroundPictureService.updateOneBackgroundPicture(
            id_backgroundpicture_valid,
            { title: "Animaux", image: "Zebre", },
            null,
            function (err, value) {
                expect(value).to.be.a("object");
                expect(value).to.haveOwnProperty("_id");
                expect(value).to.haveOwnProperty("title");
                expect(value).to.haveOwnProperty("image");
                expect(value["title"]).to.be.equal("Animaux");
                expect(value["image"]).to.be.equal("Zebre");
                done();
            }
        );
    });
    it("Modifier un BackgroundPicture avec id incorrect. - E", (done) => {
        BackgroundPictureService.updateOneBackgroundPicture(
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
    it("Modifier un BackgroundPicture avec des champs requis vide. - E", (done) => {
        BackgroundPictureService.updateOneBackgroundPicture(
            id_backgroundpicture_valid,
            { title: "", content: "Hello" }, null,
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

describe("updateManyBackgroundPictures", () => {
    it("Modifier plusieurs BackgroundPictures correctement. - S", (done) => {
        BackgroundPictureService.updateManyBackgroundPictures(tab_id_backgroundpictures, { title: "Choux" }, null, function (err, value) {
            expect(value).to.haveOwnProperty("modifiedCount");
            expect(value).to.haveOwnProperty("matchedCount");
            expect(value["matchedCount"]).to.be.equal(tab_id_backgroundpictures.length);
            expect(value["modifiedCount"]).to.be.equal(tab_id_backgroundpictures.length);
            done();
        }
        );
    });
    it("Modifier plusieurs BackgroundPictures avec id incorrect. - E", (done) => {
        BackgroundPictureService.updateManyBackgroundPictures("1200", { firstName: "Jean", lastName: "Luc" }, null, function (err, value) {
            expect(err).to.be.a("object");
            expect(err).to.haveOwnProperty("msg");
            expect(err).to.haveOwnProperty("type_error");
            expect(err["type_error"]).to.be.equal("no-valid");
            done();
        }
        );
    });
    it("Modifier plusieurs BackgroundPictures avec des champs requis vide. - E", (done) => {
        BackgroundPictureService.updateManyBackgroundPictures(
            tab_id_backgroundpictures,
            { title: "", content: "Luc" }, null,
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

describe("deleteOneBackgroundPicture", () => {
    it("Supprimer un BackgroundPicture correctement. - S", (done) => {
        BackgroundPictureService.deleteOneBackgroundPicture(id_backgroundpicture_valid, null, function (err, value) {
            expect(value).to.be.a('Object')
            expect(value).to.haveOwnProperty("title");
            done()
        });
    });
    it("Supprimer un BackgroundPictures avec id incorrect. - E", (done) => {
        BackgroundPictureService.deleteOneBackgroundPicture("1200", null, function (err, value) {
            expect(err).to.be.a("object");
            expect(err).to.haveOwnProperty("msg");
            expect(err).to.haveOwnProperty("type_error");
            expect(err["type_error"]).to.be.equal("no-valid");
            done();
        });
    });
    it("Supprimer un BackgroundPicture qui n'existe pas. - E", () => {
        BackgroundPictureService.deleteOneBackgroundPicture(id_backgroundpicture_valid, null, function (err, value) {
            expect(err).to.be.a("object");
            expect(err).to.haveOwnProperty("msg");
            expect(err).to.haveOwnProperty("type_error");
            expect(err["type_error"]).to.be.equal("no-found");
        });
    });
});

describe("deleteManyBackgroundPictures", () => {
    it("Supprimer plusieurs BackgroundPictures correctement. - S", (done) => {
        BackgroundPictureService.deleteManyBackgroundPictures(tab_id_backgroundpictures, null, (err, value) => {
            expect(value).to.be.a("object");
            expect(value).to.haveOwnProperty("deletedCount");
            expect(value.deletedCount).to.equal(tab_id_backgroundpictures.length);
            done();
        });
    });

    it("Supprimer plusieurs BackgroundPictures avec id incorrect. - E", (done) => {
        BackgroundPictureService.deleteManyBackgroundPictures("1200", null, (err, value) => {
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