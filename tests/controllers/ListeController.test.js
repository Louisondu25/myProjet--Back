const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('./../../server')
const UserService = require('../../services/UserService')
const _ = require('lodash')
const id_user = "6683f4120531895b2aac801f"
var listes = []
var user = null
var token = ''

var expect = chai.expect
var should = chai.should()

chai.use(chaiHttp)

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

describe("POST - /liste", () => {
    it("Ajouter un Liste. - S", (done) => {
        chai.request(server).post('/liste').auth(token, { type: 'bearer' }).send({
            name: "Carottes",
            description: "blabla",
            price: 2.50,
            quantity: 500,
            user_id: rdm_users(tab_id_users),
            password: "higuys"
        }).end((err, res) => {
            res.should.have.status(201)
            //  expect(res).to.be.a('object')
            listes.push(res.body)
            done()
        });
    })
    it("Ajouter un Liste incorrect. (Sans firstName) - E", (done) => {
        chai.request(server).post('/liste').auth(token, { type: 'bearer' }).send({
            lastName: 'Us',
            listename: 'dwarfSlayr',
            email: 'lutfu.us@gmil.com',
            user_id: rdm_users(tab_id_users),
            password: "higuys"
        }).end((err, res) => {
            res.should.have.status(405)
            done()
        })
    })
    it("Ajouter un Liste incorrect. (Avec un listename existant) - E", (done) => {
        chai.request(server).post('/liste').auth(token, { type: 'bearer' }).send({
            firstName: "luf",
            lastName: "Us",
            listename: "dwarfSlayer",
            email: "lutfu.us@gmai.com",
            user_id: rdm_users(tab_id_users),
            password: "higuys"
        }).end((err, res) => {
            res.should.have.status(405)
            done()
        })
    })
    it("Ajouter un Liste incorrect. (Avec un champ vide) - E", (done) => {
        chai.request(server).post('/liste').auth(token, { type: 'bearer' }).send({
            firstName: "luffu",
            lastName: "",
            listename: "dwarfSlaye",
            email: "lufu.us@gmai.com",
            user_id: rdm_users(tab_id_users),
            password: "higuys"
        }).end((err, res) => {
            res.should.have.status(405)
            done()
        })
    })
})


describe("POST - /listes", () => {
    it("Ajouter plusieurs Listes. - S", (done) => {
        chai.request(server).post('/listes').auth(token, { type: 'bearer' }).send([{
            name: "Carottes",
            description: "blabla",
            price: 2.50,
            quantity: 500,
            user_id: rdm_users(tab_id_users),
            password: "higuys"
        },

        {
            name: "Pomme de terre",
            description: "blabla",
            price: 2.80,
            quantity: 800,
            user_id: rdm_users(tab_id_users),
            password: "higuys"
        }]
        ).end((err, res) => {
            res.should.have.status(201)
            listes = [...listes, ...res.body]
            done()
        });
    })
    it("Ajouter plusieurs Listes incorrect. - E", (done) => {
        chai.request(server).post('/listes').auth(token, { type: 'bearer' }).send([
            {
                lastName: 'Us',
                arname: 'dwarfSlayr',
                email: 'lutfu.us@gmil.com',
                user_id: rdm_users(tab_id_users),
                password: "higuys"
            },

            {
                lastName: 'Us',
                listename: 'dwarfSlaycdsr',
                email: 'lutffqzdsu.us@gmil.com',
                user_id: rdm_users(tab_id_users),
                password: "higuys"
            }
        ]).end((err, res) => {
            res.should.have.status(405)
            done()
        })
    })
    it("Ajouter plusieurs Listes incorrect. (Avec un listename existant) - E", (done) => {
        chai.request(server).post('/listes').auth(token, { type: 'bearer' }).send([{
            firstName: "luf",
            lastName: "Us",
            listename: "dwarfSlayer",
            email: "lutfu.us@gmai.com",
            user_id: rdm_users(tab_id_users),
            password: "higuys"
        }]).end((err, res) => {
            res.should.have.status(405)
            done()
        })
    })
    it("Ajouter plusieurs Listes incorrect. (Avec un champ vide) - E", (done) => {
        chai.request(server).post('/listes').auth(token, { type: 'bearer' }).send([{
            firstName: "luffu",
            lastName: "",
            listename: "dwarfSlaye",
            email: "lufu.us@gmai.com",
            user_id: rdm_users(tab_id_users),
            password: "higuys"
        }]).end((err, res) => {
            res.should.have.status(405)
            done()
        })
    })
})

describe('PUT - /liste/:id', () => {
    it('Modifier un Liste -S', (done) => {
        chai.request(server).put(`/liste/${listes[0]._id}`).auth(token, { type: 'bearer' }).send({ firstName: 'Jeanne', lastName: 'Lu' })
            .end((err, res) => {
                res.should.status(200)
                expect(res.body).to.be.a('object')
                done()
            })
    })

    it('Modifier un Liste avec un id non valide -E', (done) => {
        chai.request(server).put('/liste/86156100').auth(token, { type: 'bearer' }).send({ firstName: 'Marie', lastName: 'fils' })
            .end((err, res) => {
                res.should.status(405)
                expect(res.body).to.be.a('object')
                done()
            })
    })
    it('Modifier un Liste avec un id invalide -E', (done) => {
        chai.request(server).put('/liste/66795a41761cc1544b34b3b6').auth(token, { type: 'bearer' }).send({ firstName: 'emilie', lastname: 'severe' })
            .end((err, res) => {
                res.should.status(404)
                done()
            })
    })
    it('Modifier un Liste avec un champ requis vide -E', (done) => {
        chai.request(server).put(`/liste/${listes[0]._id}`).auth(token, { type: 'bearer' }).send({ name: '', description: 'senerve' })
            .end((err, res) => {
                res.should.status(405)
                done()
            })
    })
})

describe('PUT /listes', () => {
    it('Modifier plusieurs Listes - S', (done) => {
        chai.request(server).put('/listes').query({ id: _.map(listes, '_id') }).auth(token, { type: 'bearer' }).send({ firstName: 'James' })
            .end((err, res) => {
                res.should.have.status(200);
                expect(res.body).to.be.an('object');
                done();
            });
    })

    it('Modifier plusieurs Listes avec un Id non valide - E', (done) => {
        chai.request(server).put('/listes').query({ id: ['84655616846865', '84517613'] }).auth(token, { type: 'bearer' }).send({ firstName: 'James' })
            .end((err, res) => {
                res.should.have.status(405);
                expect(res.body).to.be.an('object');
                done();
            });
    })

    it('Modifier plusieurs Listes  avec des ids inexistant- E', (done) => {
        chai.request(server).put('/listes').query({ id: ['667a698caca06606d0ce8708', '667a699d521dd12877f36ec2'] }).auth(token, { type: 'bearer' }).send({ name: 'James' })
            .end((err, res) => {
                res.should.have.status(404);
                expect(res.body).to.be.an('object');
                done();
            });
    })

    it('Modifier plusieurs Listes  avec un champ requis vide - E', (done) => {
        chai.request(server).put('/listes').query({ id: _.map(listes, '_id') }).auth(token, { type: 'bearer' }).send({ name: '' })
            .end((err, res) => {
                res.should.have.status(405);
                expect(res.body).to.be.an('object');
                done();
            });
    })
})

describe('GET - /liste/:id', () => {
    it('Rechercher un Liste existant -S', (done) => {
        chai.request(server).get(`/liste/${listes[0]._id}`).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(200);
                expect(res.body).to.be.an('object');
                done();
            });
    });

    it('Rechercher un Liste non valide - E', (done) => {
        const listeId = '145';
        chai.request(server).get(`/liste/${listeId}`).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(405);
                done();
            });
    });

    it('Chercher un Liste non trouver - E', (done) => {
        const listeId = '6675723101608233e810e10a';
        chai.request(server).get(`/liste/${listeId}`).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(404);
                done();
            });
    });
});

describe('GET - /liste', () => {
    it('Chercher un Liste par un champ selectionné -S', (done) => {
        chai.request(server).get('/liste').query({ fields: ['description'], values: listes[0].listename }).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.status = (200)
                done()
            })
    })
    it('Chercher un Liste par un champ non autorisé -E', (done) => {
        chai.request(server).get('/liste').query({ fields: ['name'], values: listes[0].listename }).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.status = (405)
                done()
            })
    })
    it('Chercher un Liste sans query -E', (done) => {
        chai.request(server).get('/liste').auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.status = (405)
                done()
            })
    })
    it('Chercher un Liste inexistant -E', (done) => {
        chai.request(server).get('/liste').query({ fields: ['description'], values: 'helloguys' }).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.status = (404)
                done()
            })
    })
})

describe('GET - /listes_by_filters', () => {
    it('Rechercher des Listes -S', (done) => {
        chai.request(server).get('/listes_by_filters').query({ page: 1, limit: 2 }).auth(token, { type: 'bearer' })
            .end((err, res) => {

                res.should.have.status(200);
                expect(res.body.results).to.be.an('array');
                done();
            });
    });

    it('Rechercher des Listes avec une query vide -S', (done) => {
        chai.request(server).get('/listes_by_filters').auth(token, { type: 'bearer' })
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body.results).to.be.an('array');
                expect(res.body.count).to.equal(3);
                done();
            });
    });

    it('Recherher plusieurs Listes avec une chaine de caracteres dans une page -E', (done) => {
        chai.request(server).get('/listes_by_filters').query({ page: 'une phrase', limit: 3 }).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.status = (405)
                done()
            })
    });
});

describe('GET - /listes', () => {
    it('Rechercher plusieurs Listes existants -S', (done) => {
        chai.request(server).get('/listes').query({ id: _.map(listes, '_id') }).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(200)
                done();
            });
    });

    it('Rechercher plusieurs Listes avec un seul ID', (done) => {
        chai.request(server).get('/listes').query({ id: ['1458781', '656216532'] }).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(405);
                done();
            });
    });

    it('Rechercher plusieurs Listes inexistants - E', (done) => {
        chai.request(server).get('/listes').query({ id: ['66792ded5e7a5a2a893297dc', '66792e10e6e3f8af2280bc7d'] }).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(404);
                expect(res.body).to.have.property('type_error', 'no-found');
                done();
            });
    });

    it('Rechercher plusieurs Listes avec IDs non valides - 405', (done) => {
        const listeIds = ['invalid-id-format-1', 'invalid-id-format-2'];
        chai.request(server)
            .get('/listes')
            .query({ id: listeIds }).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(405);
                expect(res.body).to.have.property('type_error', 'no-valid');
                done();
            });
    });
});

describe("DELETE - /liste", () => {
    it("Supprimer un Liste. - S", (done) => {
        chai.request(server).delete('/liste/' + listes[0]._id).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(200)
                done()
            })
    })
    it("supprimer un Liste incorrect (avec un id inexistant). - E", (done) => {
        chai.request(server).delete('/liste/665f18739d3e172be5daf092').auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(404)
                done()
            })
    })
    it("supprimer un Liste incorrect (avec un id invalide). - E", (done) => {
        chai.request(server).delete('/liste/123').auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(405)
                done()
            })
    })
})

describe("DELETE - /listes", () => {
    it("Supprimer plusieurs Listes. - S", (done) => {
        chai.request(server).delete('/listes').query({ id: _.map(listes, '_id') }).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(200)
                done()
            })
    })
    it("Supprimer plusieurs Listes incorrects (avec un id inexistant). - E", (done) => {
        chai.request(server).delete('/listes/665f18739d3e172be5daf092&665f18739d3e172be5daf093').auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(404)
                done()
            })
    })
    it("Supprimer plusieurs Listes incorrects (avec un id invalide). - E", (done) => {
        chai.request(server).delete('/listes').query({ id: ['123', '456'] }).auth(token, { type: 'bearer' })
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