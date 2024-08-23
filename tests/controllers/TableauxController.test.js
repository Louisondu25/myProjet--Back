const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('./../../server')
const UserService = require('../../services/UserService')
const _ = require('lodash')
const id_user = "6683f4120531895b2aac801f"
var tables = []
var user = null
var token = ''

var expect = chai.expect
var should = chai.should()

chai.use(chaiHttp)

var users = [
    {
        firstName: "detenteur  d'table 1",
        lastName: "Iencli",
        username: "oui1",
        email: "Iencli@gmail.com",
        password: "higuys"
    },
    {
        firstName: "detenteur  d'table 2",
        lastName: "Iencli",
        username: "oui2",
        email: "Iencli2@gmail.com",
        password: "higuys"
    }, {
        firstName: "detenteur  d'table 3",
        lastName: "Iencli",
        username: "oui3",
        email: "Iencli3@gmail.com",
        password: "higuys"
    },
    {
        firstName: "detenteur  d'table 4",
        lastName: "Iencli",
        username: "oui4",
        email: "Iencli4@gmail.com",
        password: "higuys"
    },
    {
        firstName: "detenteur  d'table 5",
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

describe("POST - /table", () => {
    it("Ajouter un Table. - S", (done) => {
        chai.request(server).post('/table').auth(token, { type: 'bearer' }).send({
            name: "Carottes",
            description: "blabla",
            price: 2.50,
            quantity: 500,
            user_id: rdm_users(tab_id_users),
            password: "higuys"
        }).end((err, res) => {
            res.should.have.status(201)
            //  expect(res).to.be.a('object')
            tables.push(res.body)
            done()
        });
    })
    it("Ajouter un Table incorrect. (Sans firstName) - E", (done) => {
        chai.request(server).post('/table').auth(token, { type: 'bearer' }).send({
            lastName: 'Us',
            tablename: 'dwarfSlayr',
            email: 'lutfu.us@gmil.com',
            user_id: rdm_users(tab_id_users),
            password: "higuys"
        }).end((err, res) => {
            res.should.have.status(405)
            done()
        })
    })
    it("Ajouter un Table incorrect. (Avec un tablename existant) - E", (done) => {
        chai.request(server).post('/table').auth(token, { type: 'bearer' }).send({
            firstName: "luf",
            lastName: "Us",
            tablename: "dwarfSlayer",
            email: "lutfu.us@gmai.com",
            user_id: rdm_users(tab_id_users),
            password: "higuys"
        }).end((err, res) => {
            res.should.have.status(405)
            done()
        })
    })
    it("Ajouter un Table incorrect. (Avec un champ vide) - E", (done) => {
        chai.request(server).post('/table').auth(token, { type: 'bearer' }).send({
            firstName: "luffu",
            lastName: "",
            tablename: "dwarfSlaye",
            email: "lufu.us@gmai.com",
            user_id: rdm_users(tab_id_users),
            password: "higuys"
        }).end((err, res) => {
            res.should.have.status(405)
            done()
        })
    })
})


describe("POST - /tables", () => {
    it("Ajouter plusieurs Tables. - S", (done) => {
        chai.request(server).post('/tables').auth(token, { type: 'bearer' }).send([{
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
            tables = [...tables, ...res.body]
            done()
        });
    })
    it("Ajouter plusieurs Tables incorrect. - E", (done) => {
        chai.request(server).post('/tables').auth(token, { type: 'bearer' }).send([
            {
                lastName: 'Us',
                arname: 'dwarfSlayr',
                email: 'lutfu.us@gmil.com',
                user_id: rdm_users(tab_id_users),
                password: "higuys"
            },

            {
                lastName: 'Us',
                tablename: 'dwarfSlaycdsr',
                email: 'lutffqzdsu.us@gmil.com',
                user_id: rdm_users(tab_id_users),
                password: "higuys"
            }
        ]).end((err, res) => {
            res.should.have.status(405)
            done()
        })
    })
    it("Ajouter plusieurs Tables incorrect. (Avec un tablename existant) - E", (done) => {
        chai.request(server).post('/tables').auth(token, { type: 'bearer' }).send([{
            firstName: "luf",
            lastName: "Us",
            tablename: "dwarfSlayer",
            email: "lutfu.us@gmai.com",
            user_id: rdm_users(tab_id_users),
            password: "higuys"
        }]).end((err, res) => {
            res.should.have.status(405)
            done()
        })
    })
    it("Ajouter plusieurs Tables incorrect. (Avec un champ vide) - E", (done) => {
        chai.request(server).post('/tables').auth(token, { type: 'bearer' }).send([{
            firstName: "luffu",
            lastName: "",
            tablename: "dwarfSlaye",
            email: "lufu.us@gmai.com",
            user_id: rdm_users(tab_id_users),
            password: "higuys"
        }]).end((err, res) => {
            res.should.have.status(405)
            done()
        })
    })
})

describe('PUT - /table/:id', () => {
    it('Modifier un Table -S', (done) => {
        chai.request(server).put(`/table/${tables[0]._id}`).auth(token, { type: 'bearer' }).send({ firstName: 'Jeanne', lastName: 'Lu' })
            .end((err, res) => {
                res.should.status(200)
                expect(res.body).to.be.a('object')
                done()
            })
    })

    it('Modifier un Table avec un id non valide -E', (done) => {
        chai.request(server).put('/table/86156100').auth(token, { type: 'bearer' }).send({ firstName: 'Marie', lastName: 'fils' })
            .end((err, res) => {
                res.should.status(405)
                expect(res.body).to.be.a('object')
                done()
            })
    })
    it('Modifier un Table avec un id invalide -E', (done) => {
        chai.request(server).put('/table/66795a41761cc1544b34b3b6').auth(token, { type: 'bearer' }).send({ firstName: 'emilie', lastname: 'severe' })
            .end((err, res) => {
                res.should.status(404)
                done()
            })
    })
    it('Modifier un Table avec un champ requis vide -E', (done) => {
        chai.request(server).put(`/table/${tables[0]._id}`).auth(token, { type: 'bearer' }).send({ name: '', description: 'senerve' })
            .end((err, res) => {
                res.should.status(405)
                done()
            })
    })
})

describe('PUT /tables', () => {
    it('Modifier plusieurs Tables - S', (done) => {
        chai.request(server).put('/tables').query({ id: _.map(tables, '_id') }).auth(token, { type: 'bearer' }).send({ firstName: 'James' })
            .end((err, res) => {
                res.should.have.status(200);
                expect(res.body).to.be.an('object');
                done();
            });
    })

    it('Modifier plusieurs Tables avec un Id non valide - E', (done) => {
        chai.request(server).put('/tables').query({ id: ['84655616846865', '84517613'] }).auth(token, { type: 'bearer' }).send({ firstName: 'James' })
            .end((err, res) => {
                res.should.have.status(405);
                expect(res.body).to.be.an('object');
                done();
            });
    })

    it('Modifier plusieurs Tables  avec des ids inexistant- E', (done) => {
        chai.request(server).put('/tables').query({ id: ['667a698caca06606d0ce8708', '667a699d521dd12877f36ec2'] }).auth(token, { type: 'bearer' }).send({ name: 'James' })
            .end((err, res) => {
                res.should.have.status(404);
                expect(res.body).to.be.an('object');
                done();
            });
    })

    it('Modifier plusieurs Tables  avec un champ requis vide - E', (done) => {
        chai.request(server).put('/tables').query({ id: _.map(tables, '_id') }).auth(token, { type: 'bearer' }).send({ name: '' })
            .end((err, res) => {
                res.should.have.status(405);
                expect(res.body).to.be.an('object');
                done();
            });
    })
})

describe('GET - /table/:id', () => {
    it('Rechercher un Table existant -S', (done) => {
        chai.request(server).get(`/table/${tables[0]._id}`).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(200);
                expect(res.body).to.be.an('object');
                done();
            });
    });

    it('Rechercher un Table non valide - E', (done) => {
        const tableId = '145';
        chai.request(server).get(`/table/${tableId}`).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(405);
                done();
            });
    });

    it('Chercher un Table non trouver - E', (done) => {
        const tableId = '6675723101608233e810e10a';
        chai.request(server).get(`/table/${tableId}`).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(404);
                done();
            });
    });
});

describe('GET - /table', () => {
    it('Chercher un Table par un champ selectionné -S', (done) => {
        chai.request(server).get('/table').query({ fields: ['description'], values: tables[0].tablename }).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.status = (200)
                done()
            })
    })
    it('Chercher un Table par un champ non autorisé -E', (done) => {
        chai.request(server).get('/table').query({ fields: ['name'], values: tables[0].tablename }).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.status = (405)
                done()
            })
    })
    it('Chercher un Table sans query -E', (done) => {
        chai.request(server).get('/table').auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.status = (405)
                done()
            })
    })
    it('Chercher un Table inexistant -E', (done) => {
        chai.request(server).get('/table').query({ fields: ['description'], values: 'helloguys' }).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.status = (404)
                done()
            })
    })
})

describe('GET - /tables_by_filters', () => {
    it('Rechercher des Tables -S', (done) => {
        chai.request(server).get('/tables_by_filters').query({ page: 1, limit: 2 }).auth(token, { type: 'bearer' })
            .end((err, res) => {

                res.should.have.status(200);
                expect(res.body.results).to.be.an('array');
                done();
            });
    });

    it('Rechercher des Tables avec une query vide -S', (done) => {
        chai.request(server).get('/tables_by_filters').auth(token, { type: 'bearer' })
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body.results).to.be.an('array');
                expect(res.body.count).to.equal(3);
                done();
            });
    });

    it('Recherher plusieurs Tables avec une chaine de caracteres dans une page -E', (done) => {
        chai.request(server).get('/tables_by_filters').query({ page: 'une phrase', limit: 3 }).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.status = (405)
                done()
            })
    });
});

describe('GET - /tables', () => {
    it('Rechercher plusieurs Tables existants -S', (done) => {
        chai.request(server).get('/tables').query({ id: _.map(tables, '_id') }).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(200)
                done();
            });
    });

    it('Rechercher plusieurs Tables avec un seul ID', (done) => {
        chai.request(server).get('/tables').query({ id: ['1458781', '656216532'] }).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(405);
                done();
            });
    });

    it('Rechercher plusieurs Tables inexistants - E', (done) => {
        chai.request(server).get('/tables').query({ id: ['66792ded5e7a5a2a893297dc', '66792e10e6e3f8af2280bc7d'] }).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(404);
                expect(res.body).to.have.property('type_error', 'no-found');
                done();
            });
    });

    it('Rechercher plusieurs Tables avec IDs non valides - 405', (done) => {
        const tableIds = ['invalid-id-format-1', 'invalid-id-format-2'];
        chai.request(server)
            .get('/tables')
            .query({ id: tableIds }).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(405);
                expect(res.body).to.have.property('type_error', 'no-valid');
                done();
            });
    });
});

describe("DELETE - /table", () => {
    it("Supprimer un Table. - S", (done) => {
        chai.request(server).delete('/table/' + tables[0]._id).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(200)
                done()
            })
    })
    it("supprimer un Table incorrect (avec un id inexistant). - E", (done) => {
        chai.request(server).delete('/table/665f18739d3e172be5daf092').auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(404)
                done()
            })
    })
    it("supprimer un Table incorrect (avec un id invalide). - E", (done) => {
        chai.request(server).delete('/table/123').auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(405)
                done()
            })
    })
})

describe("DELETE - /tables", () => {
    it("Supprimer plusieurs Tables. - S", (done) => {
        chai.request(server).delete('/tables').query({ id: _.map(tables, '_id') }).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(200)
                done()
            })
    })
    it("Supprimer plusieurs Tables incorrects (avec un id inexistant). - E", (done) => {
        chai.request(server).delete('/tables/665f18739d3e172be5daf092&665f18739d3e172be5daf093').auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(404)
                done()
            })
    })
    it("Supprimer plusieurs Tables incorrects (avec un id invalide). - E", (done) => {
        chai.request(server).delete('/tables').query({ id: ['123', '456'] }).auth(token, { type: 'bearer' })
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