const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('./../../server')
const UserService = require('../../services/UserService')
const _ = require('lodash')
const id_user = "6683f4120531895b2aac801f"
var themes = []
var user = null
var token = ''

var expect = chai.expect
var should = chai.should()

chai.use(chaiHttp)

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


describe('Gestion des utilisateurs.', () => {
    it('Creation des Utilisateurs fictif', (done) => {
        UserService.addManyUsers(users, null, function (err, value) {
            tab_id_users = _.map(value, '_id')
            done()
        })
    })
})

function rdm_users(tab) {
    var rdm_id = tab[Math.floor(Math.random() * tab.length)];
    return rdm_id;
}

describe("POST - /login", () => {
    it("Connexion utilisateur - S", (done) => {
        chai.request(server).post('/login').send({
            email: "oui1",
            password: "higuys",
        }).end((err, res) => {
            res.should.have.status(200)
            token = res.body.token
            done()
        })
    })
})

describe("POST - /theme", () => {
    it("Ajouter un Theme. - S", (done) => {
        chai.request(server).post('/theme').auth(token, { type: 'bearer' }).send({
            title: "Carottes",
            themes: "blabla",
            user_id: rdm_users(tab_id_users),
            board_id: '66bb1c1b2bbcb76e3c7cacf4',
            created_at: new Date(),
            updated_at: new Date(),
        }).end((err, res) => {
            res.should.have.status(201)
            //  expect(res).to.be.a('object')
            themes.push(res.body)
            done()
        });
    })
    it("Ajouter un Theme incorrect. (Sans firstName) - E", (done) => {
        chai.request(server).post('/theme').auth(token, { type: 'bearer' }).send({
            themes: "blabla",
            user_id: rdm_users(tab_id_users),
            board_id: '66bb1c1b2bbcb76e3c7cacf4',
            created_at: new Date(),
            updated_at: new Date(),
        }).end((err, res) => {
            res.should.have.status(405)
            done()
        })
    })
    it("Ajouter un Theme incorrect. (Avec un themename existant) - E", (done) => {
        chai.request(server).post('/theme').auth(token, { type: 'bearer' }).send({
            title: "Carottes",
            themes: "blabla",
            user_id: rdm_users(tab_id_users),
            board_id: '66bb1c1b2bbcb76e3c7cacf4',
            created_at: new Date(),
            updated_at: new Date(),
        }).end((err, res) => {
            res.should.have.status(405)
            done()
        })
    })
    it("Ajouter un Theme incorrect. (Avec un champ vide) - E", (done) => {
        chai.request(server).post('/theme').auth(token, { type: 'bearer' }).send({
            title: "",
            themes: "blabla",
            user_id: rdm_users(tab_id_users),
            board_id: '66bb1c1b2bbcb76e3c7cacf4',
            created_at: new Date(),
            updated_at: new Date(),
        }).end((err, res) => {
            res.should.have.status(405)
            done()
        })
    })
})


describe("POST - /themes", () => {
    it("Ajouter plusieurs Themes. - S", (done) => {
        chai.request(server).post('/themes').auth(token, { type: 'bearer' }).send([{
            title: "Lune",
            themes: "Moon",
            user_id: rdm_users(tab_id_users),
            board_id: '66bb1c1b2bbcb76e3c7cacf4',
            created_at: new Date(),
            updated_at: new Date(),
        },

        {
            title: "Pomme de terre",
            themes: "Jardinage",
            user_id: rdm_users(tab_id_users),
            board_id: '66bb1c1b2bbcb76e3c7cacf4',
            created_at: new Date(),
            updated_at: new Date(),
        }]
        ).end((err, res) => {
            res.should.have.status(201)
            themes = [...themes, ...res.body]
            done()
        });
    })
    it("Ajouter plusieurs Themes incorrect. - E", (done) => {
        chai.request(server).post('/themes').auth(token, { type: 'bearer' }).send([
            {
                themes: "Piscine",
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
            }
        ]).end((err, res) => {
            res.should.have.status(405)
            done()
        })
    })
    it("Ajouter plusieurs Themes incorrect. (Avec un themename existant) - E", (done) => {
        chai.request(server).post('/themes').auth(token, { type: 'bearer' }).send([{
            title: "Carottes",
            themes: "blabla",
            user_id: rdm_users(tab_id_users),
            board_id: '66bb1c1b2bbcb76e3c7cacf4',
            created_at: new Date(),
            updated_at: new Date(),
        }]).end((err, res) => {
            res.should.have.status(405)
            done()
        })
    })
    it("Ajouter plusieurs Themes incorrect. (Avec un champ vide) - E", (done) => {
        chai.request(server).post('/themes').auth(token, { type: 'bearer' }).send([{
            title: "Carottes",
            themes: "",
            user_id: rdm_users(tab_id_users),
            board_id: '66bb1c1b2bbcb76e3c7cacf4',
            created_at: new Date(),
            updated_at: new Date(),
        }]).end((err, res) => {
            res.should.have.status(405)
            done()
        })
    })
})

describe('PUT - /theme/:id', () => {
    it('Modifier un Theme -S', (done) => {
        chai.request(server).put(`/theme/${themes[0]._id}`).auth(token, { type: 'bearer' }).send({ title: 'Model d\'ardoise', themes: 'Slate_Mod' })
            .end((err, res) => {
                res.should.status(200)
                expect(res.body).to.be.a('object')
                done()
            })
    })

    it('Modifier un Theme avec un id non valide -E', (done) => {
        chai.request(server).put('/theme/86156100').auth(token, { type: 'bearer' }).send({ firstName: 'Marie', lastName: 'fils' })
            .end((err, res) => {
                res.should.status(405)
                expect(res.body).to.be.a('object')
                done()
            })
    })
    it('Modifier un Theme avec un id invalide -E', (done) => {
        chai.request(server).put('/theme/66795a41761cc1544b34b3b6').auth(token, { type: 'bearer' }).send({ firstName: 'emilie', lastname: 'severe' })
            .end((err, res) => {
                res.should.status(404)
                done()
            })
    })
    it('Modifier un Theme avec un champ requis vide -E', (done) => {
        chai.request(server).put(`/theme/${themes[0]._id}`).auth(token, { type: 'bearer' }).send({ title: '', themes: 'senerve' })
            .end((err, res) => {
                res.should.status(405)
                done()
            })
    })
})

describe('PUT /themes', () => {
    it('Modifier plusieurs Themes - S', (done) => {
        chai.request(server).put('/themes').query({ id: _.map(themes, '_id') }).auth(token, { type: 'bearer' }).send()
            .end((err, res) => {
                res.should.have.status(200);
                expect(res.body).to.be.an('object');
                done();
            });
    })

    it('Modifier plusieurs Themes avec un Id non valide - E', (done) => {
        chai.request(server).put('/themes').query({ id: ['84655616846865', '84517613'] }).auth(token, { type: 'bearer' }).send({ firstName: 'James' })
            .end((err, res) => {
                res.should.have.status(405);
                expect(res.body).to.be.an('object');
                done();
            });
    })

    it('Modifier plusieurs Themes  avec des ids inexistant- E', (done) => {
        chai.request(server).put('/themes').query({ id: ['667a698caca06606d0ce8708', '667a699d521dd12877f36ec2'] }).auth(token, { type: 'bearer' }).send({ title: 'James' })
            .end((err, res) => {
                res.should.have.status(404);
                expect(res.body).to.be.an('object');
                done();
            });
    })

    it('Modifier plusieurs Themes  avec un champ requis vide - E', (done) => {
        chai.request(server).put('/themes').query({ id: _.map(themes, '_id') }).auth(token, { type: 'bearer' }).send({ title: '' })
            .end((err, res) => {
                res.should.have.status(405);
                expect(res.body).to.be.an('object');
                done();
            });
    })
})

describe('GET - /theme/:id', () => {
    it('Rechercher un Theme existant -S', (done) => {
        chai.request(server).get(`/theme/${themes[0]._id}`).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(200);
                expect(res.body).to.be.an('object');
                done();
            });
    });

    it('Rechercher un Theme non valide - E', (done) => {
        const themeId = '145';
        chai.request(server).get(`/theme/${themeId}`).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(405);
                done();
            });
    });

    it('Chercher un Theme non trouver - E', (done) => {
        const themeId = '6675723101608233e810e10a';
        chai.request(server).get(`/theme/${themeId}`).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(404);
                done();
            });
    });
});

describe('GET - /theme', () => {
    it('Chercher un Theme par un champ selectionné -S', (done) => {
        chai.request(server).get('/theme').query({ fields: ['title'], values: themes[0].title }).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.status = (200)
                done()
            })
    })
    it('Chercher un Theme par un champ non autorisé -E', (done) => {
        chai.request(server).get('/theme').query({ fields: ['name'], values: themes[0].themename }).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.status = (405)
                done()
            })
    })
    it('Chercher un Theme sans query -E', (done) => {
        chai.request(server).get('/theme').auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.status = (405)
                done()
            })
    })
    it('Chercher un Theme inexistant -E', (done) => {
        chai.request(server).get('/theme').query({ fields: ['content'], values: 'helloguys' }).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.status = (404)
                done()
            })
    })
})

describe('GET - /themes_by_filters', () => {
    it('Rechercher des Themes -S', (done) => {
        chai.request(server).get('/themes_by_filters').query({ page: 1, limit: 2 }).auth(token, { type: 'bearer' })
            .end((err, res) => {

                res.should.have.status(200);
                expect(res.body.results).to.be.an('array');
                done();
            });
    });

    it('Rechercher des Themes avec une query vide -S', (done) => {
        chai.request(server).get('/themes_by_filters').auth(token, { type: 'bearer' })
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body.results).to.be.an('array');
                expect(res.body.count).to.equal(3);
                done();
            });
    });

    it('Recherher plusieurs Themes avec une chaine de caracteres dans une page -E', (done) => {
        chai.request(server).get('/themes_by_filters').query({ page: 'une phrase', limit: 3 }).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.status = (405)
                done()
            })
    });
});

describe('GET - /themes', () => {
    it('Rechercher plusieurs Themes existants -S', (done) => {
        chai.request(server).get('/themes').query({ id: _.map(themes, '_id') }).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(200)
                done();
            });
    });

    it('Rechercher plusieurs Themes avec un seul ID', (done) => {
        chai.request(server).get('/themes').query({ id: ['1458781', '656216532'] }).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(405);
                done();
            });
    });

    it('Rechercher plusieurs Themes inexistants - E', (done) => {
        chai.request(server).get('/themes').query({ id: ['66792ded5e7a5a2a893297dc', '66792e10e6e3f8af2280bc7d'] }).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(404);
                expect(res.body).to.have.property('type_error', 'no-found');
                done();
            });
    });

    it('Rechercher plusieurs Themes avec IDs non valides - 405', (done) => {
        const themeIds = ['invalid-id-format-1', 'invalid-id-format-2'];
        chai.request(server)
            .get('/themes')
            .query({ id: themeIds }).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(405);
                expect(res.body).to.have.property('type_error', 'no-valid');
                done();
            });
    });
});

describe("DELETE - /theme", () => {
    it("Supprimer un Theme. - S", (done) => {
        chai.request(server).delete('/theme/' + themes[0]._id).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(200)
                done()
            })
    })
    it("supprimer un Theme incorrect (avec un id inexistant). - E", (done) => {
        chai.request(server).delete('/theme/665f18739d3e172be5daf092').auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(404)
                done()
            })
    })
    it("supprimer un Theme incorrect (avec un id invalide). - E", (done) => {
        chai.request(server).delete('/theme/123').auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(405)
                done()
            })
    })
})

describe("DELETE - /themes", () => {
    it("Supprimer plusieurs Themes. - S", (done) => {
        chai.request(server).delete('/themes').query({ id: _.map(themes, '_id') }).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(200)
                done()
            })
    })
    it("Supprimer plusieurs Themes incorrects (avec un id inexistant). - E", (done) => {
        chai.request(server).delete('/themes/665f18739d3e172be5daf092&665f18739d3e172be5daf093').auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(404)
                done()
            })
    })
    it("Supprimer plusieurs Themes incorrects (avec un id invalide). - E", (done) => {
        chai.request(server).delete('/themes').query({ id: ['123', '456'] }).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(405)
                done()
            })
    })
})

describe('Gestion des utilisateurs.', () => {
    it('Supprimer des Utilisateurs fictifs', (done) => {
        UserService.deleteManyUsers(tab_id_users, null, function (err, value) {
            done()
        })
    })
})