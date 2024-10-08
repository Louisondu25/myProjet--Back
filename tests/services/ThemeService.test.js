const ThemeService = require("../../services/ThemeService");
const UserService = require('../../services/UserService')
const chai = require("chai");
let expect = chai.expect;
const _ = require("lodash");
var id_theme_valid = "";
var tab_id_themes = [];
var tab_id_users = [];
var themes = []


var users = [
    {
        firstName: "detenteur  d'theme 1",
        lastName: "Iencli",
        username: "oui1",
        email: "Iencli@gmail.com",
        password: "higuys",
        phoneNumber: "15415215"
    },
    {
        firstName: "detenteur  d'theme 2",
        lastName: "Iencli",
        username: "oui2",
        email: "Iencli2@gmail.com",
        password: "higuys",
        phoneNumber: "15415215"

    }, {
        firstName: "detenteur  d'theme 3",
        lastName: "Iencli",
        username: "oui3",
        email: "Iencli3@gmail.com",
        password: "higuys",
        phoneNumber: "15415215"
    },
    {
        firstName: "detenteur  d'theme 4",
        lastName: "Iencli",
        username: "oui4",
        email: "Iencli4@gmail.com",
        password: "higuys",
        phoneNumber: "15415215"
    },
    {
        firstName: "detenteur  d'theme 5",
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

describe("addOneTheme", () => {
    it("Theme correct. - S", (done) => {
        var theme = {
            title: "Carottes",
            themes: "blabla",
            user_id: rdm_users(tab_id_users),
            board_id:'66bb1c1b2bbcb76e3c7cacf4',
            created_at: new Date(),
            updated_at: new Date(),
        };
        ThemeService.addOneTheme(theme, null, function (err, value) {
            expect(value).to.be.a("object");
            expect(value).to.haveOwnProperty("_id");
            expect(value).to.haveOwnProperty("user_id");
            id_theme_valid = value._id;
            done()
            //
        });
    });
    it("Theme incorrect. (Sans Name) - E", (done) => {
        var theme_no_valid = {
            themes: "blabla",
            user_id: rdm_users(tab_id_users),
            board_id: '66bb1c1b2bbcb76e3c7cacf4',
            created_at: new Date(),
            updated_at: new Date(),
        };
        ThemeService.addOneTheme(theme_no_valid, null, function (err, value) {
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

describe("addManyThemes", () => {
    it("Themes à ajouter, non valide. - E", (done) => {
        var themes_tab_error = [
            {
                themes: "Ski",
                user_id: rdm_users(tab_id_users),
                board_id: '66bb1c1b2bbcb76e3c7cacf4',
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                user_id: rdm_users(tab_id_users),
                board_id: '66bb1c1b2bbcb76e3c7cacf4',
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                board_id: '66bb1c1b2bbcb76e3c7cacf4',
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                title: "Decembre",
                themes: "Hiver",
                created_at: new Date(),
                updated_at: new Date(),
            },
        ];
        ThemeService.addManyThemes(themes_tab_error, null, function (err, value) {
            done();
        });
    });

    it("Themes à ajouter, valide. - S", (done) => {
        var themes_tab = [
            {
                title: "Marie",
                themes: "Anniversaire",
                user_id: rdm_users(tab_id_users),
                board_id: '66bb1c1b2bbcb76e3c7cacf4',
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                title: "Pomme de terre",
                themes: "Plage",
                user_id: rdm_users(tab_id_users),
                board_id: '66bb1c1b2bbcb76e3c7cacf4',
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                title: "Navet",
                themes: "Noel",
                user_id: rdm_users(tab_id_users),
                board_id: '66bb1c1b2bbcb76e3c7cacf4',
                created_at: new Date(),
                updated_at: new Date(),
            },
        ];

        ThemeService.addManyThemes(themes_tab, null, function (err, value) {
            tab_id_themes = _.map(value, "_id");
            expect(value).lengthOf(3);
            themes = [...value, ...themes]
            done();
        });
    });
});

describe("findOneThemeById", () => {
    it("Chercher un Theme existant correct. - S", (done) => {
        ThemeService.findOneThemeById(id_theme_valid, null, function (err, value) {
            expect(value).to.be.a("object");
            expect(value).to.haveOwnProperty("_id");
            done();
        });
    });
    it("Chercher un Theme non-existant correct. - E", (done) => {
        ThemeService.findOneThemeById("100", null, function (err, value) {
            expect(err).to.haveOwnProperty("msg");
            expect(err).to.haveOwnProperty("type_error");
            expect(err["type_error"]).to.equal("no-valid");
            done();
        });
    });
});

describe('findOneTheme', () => {
    it('Chercher un Theme avec un champ autorisé - S', (done) => {
        ThemeService.findOneTheme(['title'], themes[0].title, null, (err, value) => {
            expect(value).to.haveOwnProperty('title');
            done();
        });
    });

    it('Chercher un Theme avec un champ non autorisé - E', (done) => {
        ThemeService.findOneTheme(['themename', 'firstName'], themes[0].name, null, (err, value) => {
            expect(err).to.haveOwnProperty('type_error');
            done();
        });
    });

    it('Chercher un Theme sans theme de champ -E', (done) => {
        ThemeService.findOneTheme('email', themes[0].name, null, (err, value) => {
            expect(err).to.haveOwnProperty('type_error');
            done();
        });
    });

    it('chercher un Theme inexistant', (done) => {
        ThemeService.findOneTheme(['email'], 'themes[0].themename', null, (err, value) => {
            expect(err).to.haveOwnProperty('type_error');
            done();
        });
    });
});

describe('findManyThemes', () => {
    it('Retourne 3 Themes sur les 4 - S ', (done) => {
        ThemeService.findManyThemes(null, 1, 3, null, function (err, value,) {

            expect(value).to.haveOwnProperty('count')
            expect(value).to.haveOwnProperty('results')
            expect(value['count']).to.be.equal(4)
            expect(value['results']).lengthOf(3)
            expect(err).to.be.null
            done()
        })
    })
    it('Envoi chaine de caractere sur page - E ', (done) => {
        ThemeService.findManyThemes(null, 'hi', 3, null, function (err, value) {
            expect(err).to.haveOwnProperty('type_error')
            expect(err['type_error']).to.be.equal('no-valid')
            expect(value).to.be.undefined
            done()
        })
    })
})

describe("updateOneTheme", () => {
    it("Modifier un Theme correct. - S", (done) => {
        ThemeService.updateOneTheme(
            id_theme_valid,
            { title: "Choux", themes: "Black Hole", },
            null,
            function (err, value) {
                expect(value).to.be.a("object");
                expect(value).to.haveOwnProperty("_id");
                expect(value).to.haveOwnProperty("title");
                expect(value).to.haveOwnProperty("themes");
                expect(value["title"]).to.be.equal("Choux");
                expect(value["themes"]).to.be.equal("Black Hole");
                done();
            }
        );
    });
    it("Modifier un Theme avec id incorrect. - E", (done) => {
        ThemeService.updateOneTheme(
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
    it("Modifier un Theme avec des champs requis vide. - E", (done) => {
        ThemeService.updateOneTheme(
            id_theme_valid,
            { title: "", themes: "Space Nebulla" }, null,
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

describe("updateManyThemes", () => {
    it("Modifier plusieurs Themes correctement. - S", (done) => {
        ThemeService.updateManyThemes(tab_id_themes, { title: "Lune"}, null, function (err, value) {
            expect(value).to.haveOwnProperty("modifiedCount");
            expect(value).to.haveOwnProperty("matchedCount");
            expect(value["matchedCount"]).to.be.equal(tab_id_themes.length);
            expect(value["modifiedCount"]).to.be.equal(tab_id_themes.length);
            done();
        }
        );
    });
    it("Modifier plusieurs Themes avec id incorrect. - E", (done) => {
        ThemeService.updateManyThemes("1200", { firstName: "Jean", lastName: "Luc" }, null, function (err, value) {
            expect(err).to.be.a("object");
            expect(err).to.haveOwnProperty("msg");
            expect(err).to.haveOwnProperty("type_error");
            expect(err["type_error"]).to.be.equal("no-valid");
            done();
        }
        );
    });
    it("Modifier plusieurs Themes avec des champs requis vide. - E", (done) => {
        ThemeService.updateManyThemes(
            tab_id_themes,
            { title: "", themes: "Luc" }, null,
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

describe("deleteOneTheme", () => {
    it("Supprimer un Theme correctement. - S", (done) => {
        ThemeService.deleteOneTheme(id_theme_valid, null, function (err, value) {
            expect(value).to.be.a('Object')
            expect(value).to.haveOwnProperty("title");
            done()
        });
    });
    it("Supprimer un Themes avec id incorrect. - E", (done) => {
        ThemeService.deleteOneTheme("1200", null, function (err, value) {
            expect(err).to.be.a("object");
            expect(err).to.haveOwnProperty("msg");
            expect(err).to.haveOwnProperty("type_error");
            expect(err["type_error"]).to.be.equal("no-valid");
            done();
        });
    });
    it("Supprimer un Theme qui n'existe pas. - E", () => {
        ThemeService.deleteOneTheme(id_theme_valid, null, function (err, value) {
            expect(err).to.be.a("object");
            expect(err).to.haveOwnProperty("msg");
            expect(err).to.haveOwnProperty("type_error");
            expect(err["type_error"]).to.be.equal("no-found");
        });
    });
});

describe("deleteManyThemes", () => {
    it("Supprimer plusieurs Themes correctement. - S", (done) => {
        ThemeService.deleteManyThemes(tab_id_themes, null, (err, value) => {
            expect(value).to.be.a("object");
            expect(value).to.haveOwnProperty("deletedCount");
            expect(value.deletedCount).to.equal(tab_id_themes.length);
            done();
        });
    });

    it("Supprimer plusieurs Themes avec id incorrect. - E", (done) => {
        ThemeService.deleteManyThemes("1200", null, (err, value) => {
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