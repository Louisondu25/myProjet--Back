const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('./../../server')
const UserService = require('../../services/UserService')
const _ = require('lodash')
const id_user = "6683f4120531895b2aac801f"
var astuces = []
var user = null
var token = ''

var expect = chai.expect
var should = chai.should()

chai.use(chaiHttp)

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
            username: "oui1",
            password: "higuys",
        }).end((err, res) => {
            res.should.have.status(200)
            token = res.body.token
            done()
        })
    })
})

describe("POST - /astuce", () => {
    it("Ajouter un Astuce. - S", (done) => {
        chai.request(server).post('/astuce').auth(token, { type: 'bearer' }).send({
            title: 'Carottes',
            astuce: "Plantez vos graines",
            theme_id: '66cc482f14bfa7cf4dc496ad',
            board_id: '66bb1c1b2bbcb76e3c7cacf4',
            created_at: new Date(),
            updated_at: new Date(),
            user_id: rdm_users(tab_id_users),
        }).end((err, res) => {
            res.should.have.status(201)
            //  expect(res).to.be.a('object')
            astuces.push(res.body)
            done()
        });
    })
    it("Ajouter un Astuce incorrect. (Sans Title) - E", (done) => {
        chai.request(server).post('/astuce').auth(token, { type: 'bearer' }).send({
            astuce: "Creuser un trou",
            theme_id: '66cc482f14bfa7cf4dc496ad',
            board_id: '66bb1c1b2bbcb76e3c7cacf4',
            created_at: new Date(),
            updated_at: new Date(),
            user_id: rdm_users(tab_id_users),
        }).end((err, res) => {
            res.should.have.status(405)
            done()
        })
    })
    it("Ajouter un Astuce incorrect. (Avec un astucename existant) - E", (done) => {
        chai.request(server).post('/astuce').auth(token, { type: 'bearer' }).send({
            title: 'Carottes',
            astuce: "Plantez vos graines",
            theme_id: '66cc482f14bfa7cf4dc496ad',
            board_id: '66bb1c1b2bbcb76e3c7cacf4',
            created_at: new Date(),
            updated_at: new Date(),
            user_id: rdm_users(tab_id_users),
        }).end((err, res) => {
            res.should.have.status(405)
            done()
        })
    })
    it("Ajouter un Astuce incorrect. (Avec un champ vide) - E", (done) => {
        chai.request(server).post('/astuce').auth(token, { type: 'bearer' }).send({
            title: '',
            astuce: "Utiliser differents outils pour planter vos graines",
            theme_id: '66cc482f14bfa7cf4dc496ad',
            board_id: '66bb1c1b2bbcb76e3c7cacf4',
            created_at: new Date(),
            updated_at: new Date(),
            user_id: rdm_users(tab_id_users),
        }).end((err, res) => {
            res.should.have.status(405)
            done()
        })
    })
})


describe("POST - /astuces", () => {
    it("Ajouter plusieurs Astuces. - S", (done) => {
        chai.request(server).post('/astuces').auth(token, { type: 'bearer' }).send([{
            title: 'MaÏs',
            astuce: "Semer vos sachet de MaÏs",
            theme_id: '66cc482f14bfa7cf4dc496ad',
            board_id: '66bb1c1b2bbcb76e3c7cacf4',
            created_at: new Date(),
            updated_at: new Date(),
            user_id: rdm_users(tab_id_users),
        },

        {
            title: 'Astraunaute',
            astuce: "Voyager dans l'espace",
            theme_id: '66cc482f14bfa7cf4dc496ad',
            board_id: '66bb1c1b2bbcb76e3c7cacf4',
            created_at: new Date(),
            updated_at: new Date(),
            user_id: rdm_users(tab_id_users),
        }]
        ).end((err, res) => {
            res.should.have.status(201)
            astuces = [...astuces, ...res.body]
            done()
        });
    })
    it("Ajouter plusieurs Astuces incorrect. - E", (done) => {
        chai.request(server).post('/astuces').auth(token, { type: 'bearer' }).send([
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
            }
        ]).end((err, res) => {
            res.should.have.status(405)
            done()
        })
    })
    it("Ajouter plusieurs Astuces incorrect. (Avec un astucename existant) - E", (done) => {
        chai.request(server).post('/astuces').auth(token, { type: 'bearer' }).send([{
            title: 'Carottes',
            astuce: "Plantez vos graines",
            theme_id: '66cc482f14bfa7cf4dc496ad',
            board_id: '66bb1c1b2bbcb76e3c7cacf4',
            created_at: new Date(),
            updated_at: new Date(),
            user_id: rdm_users(tab_id_users),
        }]).end((err, res) => {
            res.should.have.status(405)
            done()
        })
    })
    it("Ajouter plusieurs Astuces incorrect. (Avec un champ vide) - E", (done) => {
        chai.request(server).post('/astuces').auth(token, { type: 'bearer' }).send([{
            title: '',
            astuce: "Plantez vos graines",
            theme_id: '66cc482f14bfa7cf4dc496ad',
            board_id: '66bb1c1b2bbcb76e3c7cacf4',
            created_at: new Date(),
            updated_at: new Date(),
            user_id: rdm_users(tab_id_users),
        }]).end((err, res) => {
            res.should.have.status(405)
            done()
        })
    })
})

describe('PUT - /astuce/:id', () => {
    it('Modifier un Astuce -S', (done) => {
        chai.request(server).put(`/astuce/${astuces[0]._id}`).auth(token, { type: 'bearer' }).send({ title: 'Jeanne', astuce: " Road Trip" })
            .end((err, res) => {
                res.should.status(200)
                expect(res.body).to.be.a('object')
                done()
            })
    })

    it('Modifier un Astuce avec un id non valide -E', (done) => {
        chai.request(server).put('/astuce/86156100').auth(token, { type: 'bearer' }).send({ firstName: 'Marie', lastName: 'fils' })
            .end((err, res) => {
                res.should.status(405)
                expect(res.body).to.be.a('object')
                done()
            })
    })
    it('Modifier un Astuce avec un id invalide -E', (done) => {
        chai.request(server).put('/astuce/66795a41761cc1544b34b3b6').auth(token, { type: 'bearer' }).send({ firstName: 'emilie', lastname: 'severe' })
            .end((err, res) => {
                res.should.status(404)
                done()
            })
    })
    it('Modifier un Astuce avec un champ requis vide -E', (done) => {
        chai.request(server).put(`/astuce/${astuces[0]._id}`).auth(token, { type: 'bearer' }).send({ title: '', astuce: 'senerve' })
            .end((err, res) => {
                res.should.status(405)
                done()
            })
    })
})

describe('PUT /astuces', () => {
    it('Modifier plusieurs Astuces - S', (done) => {
        chai.request(server).put('/astuces').query({ id: _.map(astuces, '_id') }).auth(token, { type: 'bearer' }).send({ title: 'James' })
            .end((err, res) => {
                res.should.have.status(200);
                expect(res.body).to.be.an('object');
                done();
            });
    })

    it('Modifier plusieurs Astuces avec un Id non valide - E', (done) => {
        chai.request(server).put('/astuces').query({ id: ['84655616846865', '84517613'] }).auth(token, { type: 'bearer' }).send({ firstName: 'James' })
            .end((err, res) => {
                res.should.have.status(405);
                expect(res.body).to.be.an('object');
                done();
            });
    })

    it('Modifier plusieurs Astuces  avec des ids inexistant- E', (done) => {
        chai.request(server).put('/astuces').query({ id: ['667a698caca06606d0ce8708', '667a699d521dd12877f36ec2'] }).auth(token, { type: 'bearer' }).send({ title: 'James' })
            .end((err, res) => {
                res.should.have.status(404);
                expect(res.body).to.be.an('object');
                done();
            });
    })

    it('Modifier plusieurs Astuces  avec un champ requis vide - E', (done) => {
        chai.request(server).put('/astuces').query({ id: _.map(astuces, '_id') }).auth(token, { type: 'bearer' }).send({ title: '' })
            .end((err, res) => {
                res.should.have.status(405);
                expect(res.body).to.be.an('object');
                done();
            });
    })
})

describe('GET - /astuce/:id', () => {
    it('Rechercher un Astuce existant -S', (done) => {
        chai.request(server).get(`/astuce/${astuces[0]._id}`).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(200);
                expect(res.body).to.be.an('object');
                done();
            });
    });

    it('Rechercher un Astuce non valide - E', (done) => {
        const astuceId = '145';
        chai.request(server).get(`/astuce/${astuceId}`).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(405);
                done();
            });
    });

    it('Chercher un Astuce non trouver - E', (done) => {
        const astuceId = '6675723101608233e810e10a';
        chai.request(server).get(`/astuce/${astuceId}`).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(404);
                done();
            });
    });
});

describe('GET - /astuce', () => {
    it('Chercher un Astuce par un champ selectionné -S', (done) => {
        chai.request(server).get('/astuce').query({ fields: ['title'], values: astuces[0].title }).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.status = (200)
                done()
            })
    })
    it('Chercher un Astuce par un champ non autorisé -E', (done) => {
        chai.request(server).get('/astuce').query({ fields: ['name'], values: astuces[0].astucename }).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.status = (405)
                done()
            })
    })
    it('Chercher un Astuce sans query -E', (done) => {
        chai.request(server).get('/astuce').auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.status = (405)
                done()
            })
    })
    it('Chercher un Astuce inexistant -E', (done) => {
        chai.request(server).get('/astuce').query({ fields: ['content'], values: 'helloguys' }).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.status = (404)
                done()
            })
    })
})

describe('GET - /astuces_by_filters', () => {
    it('Rechercher des Astuces -S', (done) => {
        chai.request(server).get('/astuces_by_filters').query({ page: 1, limit: 2 }).auth(token, { type: 'bearer' })
            .end((err, res) => {

                res.should.have.status(200);
                expect(res.body.results).to.be.an('array');
                done();
            });
    });

    it('Rechercher des Astuces avec une query vide -S', (done) => {
        chai.request(server).get('/astuces_by_filters').auth(token, { type: 'bearer' })
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body.results).to.be.an('array');
                expect(res.body.count).to.equal(3);
                done();
            });
    });

    it('Recherher plusieurs Astuces avec une chaine de caracteres dans une page -E', (done) => {
        chai.request(server).get('/astuces_by_filters').query({ page: 'une phrase', limit: 3 }).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.status = (405)
                done()
            })
    });
});

describe('GET - /astuces', () => {
    it('Rechercher plusieurs Astuces existants -S', (done) => {
        chai.request(server).get('/astuces').query({ id: _.map(astuces, '_id') }).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(200)
                done();
            });
    });

    it('Rechercher plusieurs Astuces avec un seul ID', (done) => {
        chai.request(server).get('/astuces').query({ id: ['1458781', '656216532'] }).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(405);
                done();
            });
    });

    it('Rechercher plusieurs Astuces inexistants - E', (done) => {
        chai.request(server).get('/astuces').query({ id: ['66792ded5e7a5a2a893297dc', '66792e10e6e3f8af2280bc7d'] }).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(404);
                expect(res.body).to.have.property('type_error', 'no-found');
                done();
            });
    });

    it('Rechercher plusieurs Astuces avec IDs non valides - 405', (done) => {
        const astuceIds = ['invalid-id-format-1', 'invalid-id-format-2'];
        chai.request(server)
            .get('/astuces')
            .query({ id: astuceIds }).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(405);
                expect(res.body).to.have.property('type_error', 'no-valid');
                done();
            });
    });
});

describe("DELETE - /astuce", () => {
    it("Supprimer un Astuce. - S", (done) => {
        chai.request(server).delete('/astuce/' + astuces[0]._id).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(200)
                done()
            })
    })
    it("supprimer un Astuce incorrect (avec un id inexistant). - E", (done) => {
        chai.request(server).delete('/astuce/665f18739d3e172be5daf092').auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(404)
                done()
            })
    })
    it("supprimer un Astuce incorrect (avec un id invalide). - E", (done) => {
        chai.request(server).delete('/astuce/123').auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(405)
                done()
            })
    })
})

describe("DELETE - /astuces", () => {
    it("Supprimer plusieurs Astuces. - S", (done) => {
        chai.request(server).delete('/astuces').query({ id: _.map(astuces, '_id') }).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(200)
                done()
            })
    })
    it("Supprimer plusieurs Astuces incorrects (avec un id inexistant). - E", (done) => {
        chai.request(server).delete('/astuces/665f18739d3e172be5daf092&665f18739d3e172be5daf093').auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(404)
                done()
            })
    })
    it("Supprimer plusieurs Astuces incorrects (avec un id invalide). - E", (done) => {
        chai.request(server).delete('/astuces').query({ id: ['123', '456'] }).auth(token, { type: 'bearer' })
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