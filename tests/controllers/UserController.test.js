const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('./../../server')
const _ = require('lodash')
var users = []
var user = null
var token = ''

var expect = chai.expect
var should = chai.should()

chai.use(chaiHttp)

describe("POST - /user/", () => {
    it("Ajouter un utilisateur. - S", (done) => {
        chai.request(server).post('/user').send({
            firstName: "luf",
            lastName: "Us",
            age: 38,
            phoneNumber: "0875661583",
            username: "dwarfSlayer",
            email: "lutfu.us@gmail.com",
            password: "higuys"
        }).end((err, res) => {
            res.should.have.status(201)
            users.push(res.body)
            done()
        });
    })

    it("Ajouter un utilisateur incorrect. (Sans firstName) - E", (done) => {
        chai.request(server).post('/user').send({
            lastName: 'Us',
            username: 'dwarfSlayr',
            email: 'lutfu.us@gmil.com',
            password: "higuys"
        }).end((err, res) => {
            res.should.have.status(405)
            done()
        })
    })
    it("Ajouter un utilisateur incorrect. (Avec un username existant) - E", (done) => {
        chai.request(server).post('/user').send({
            firstName: "luf",
            lastName: "Us",
            username: "dwarfSlayer",
            email: "lutfu.us@gmai.com",
            password: "higuys"
        }).end((err, res) => {
            res.should.have.status(405)
            done()
        })
    })
    it("Ajouter un utilisateur incorrect. (Avec un champ vide) - E", (done) => {
        chai.request(server).post('/user').send({
            firstName: "luffu",
            lastName: "",
            username: "dwarfSlaye",
            email: "lufu.us@gmai.com",
            password: "higuys"
        }).end((err, res) => {
            res.should.have.status(405)
            done()
        })
    })
})

describe("POST - /login", () => {
    it("Connexion utilisateur - S", (done) => {
        chai.request(server).post('/login').send({
            username: "dwarfSlayer",
            password: "higuys",
        }).end((err, res) => {
            res.should.have.status(200)
            token = res.body.token
            done()
        })
    })
})

describe("POST - /users", () => {
    it("Ajouter plusieurs utilisateurs. - S", (done) => {
        chai.request(server).post('/users').auth(token, { type: 'bearer' }).send([{
            firstName: "luf",
            lastName: "Us",
            age: 25,
            phoneNumber: "0258943159",
            username: "dwathttvrfSlayer",
            email: "lutfgfbu.us@gmail.com",
            password: "higuys"
        },

        {
            firstName: "luf",
            lastName: "Us",
            age:22,
            phoneNumber:"0195642850",
            username: "dwgfbarfSlayer",
            email: "lutgbffu.us@gmail.com",
            password: "higuys"
        }]
        ).end((err, res) => {
            res.should.have.status(201)
            users = [...users, ...res.body]
            done()
        });
    })
    it("Ajouter plusieurs utilisateurs incorrect. - E", (done) => {
        chai.request(server).post('/users').auth(token, { type: 'bearer' }).send([
            {
                lastName: 'Us',
                username: 'dwarfSlayr',
                email: 'lutfu.us@gmil.com',
                password: "higuys"
            },

            {
                lastName: 'Us',
                username: 'dwarfSlaycdsr',
                email: 'lutffqzdsu.us@gmil.com',
                password: "higuys"
            }
        ]).end((err, res) => {
            res.should.have.status(405)
            done()
        })
    })
    it("Ajouter plusieurs utilisateurs incorrect. (Avec un username existant) - E", (done) => {
        chai.request(server).post('/users').auth(token, { type: 'bearer' }).send([{
            firstName: "luf",
            lastName: "Us",
            username: "dwarfSlayer",
            email: "lutfu.us@gmai.com",
            password: "higuys"
        }]).end((err, res) => {
            res.should.have.status(405)
            done()
        })
    })
    it("Ajouter plusieurs utilisateurs incorrect. (Avec un champ vide) - E", (done) => {
        chai.request(server).post('/users').auth(token, { type: 'bearer' }).send([{
            firstName: "luffu",
            lastName: "",
            username: "dwarfSlaye",
            email: "lufu.us@gmai.com",
            password: "higuys"
        }]).end((err, res) => {
            res.should.have.status(405)
            done()
        })
    })
})


describe('PUT - /user/:id', () => {
    it('Modifier un Utilisateur -S', (done) => {
        chai.request(server).put(`/user/${users[0]._id}`).auth(token, { type: 'bearer' }).send({ firstName: 'Jeanne', lastName: 'Lu' })
            .end((err, res) => {
                res.should.status(200)
                expect(res.body).to.be.a('object')
                done()
            })
    })

    it('Modifier un utilisateur avec un id non valide -E', (done) => {
        chai.request(server).put('/user/86156100').auth(token, { type: 'bearer' }).send({ firstName: 'Marie', lastName: 'fils' })
            .end((err, res) => {
                res.should.status(405)
                expect(res.body).to.be.a('object')
                done()
            })
    })
    it('Modifier un Utilisateur avec un id invalide -E', (done) => {
        chai.request(server).put('/user/66795a41761cc1544b34b3b6').auth(token, { type: 'bearer' }).send({ firstName: 'emilie', lastname: 'severe' })
            .end((err, res) => {
                res.should.status(404)
                done()
            })
    })
    it('Modifier un Utilisateur avec un champ requis vide -E', (done) => {
        chai.request(server).put(`/user/${users[0]._id}`).auth(token, { type: 'bearer' }).send({ firstName: '', lastname: 'senerve' })
            .end((err, res) => {
                res.should.status(405)
                done()
            })
    })
    it('Modifier un Utilisateur avec un champ unique existant', (done) => {
        chai.request(server).put(`/user/${users[0]._id}`).auth(token, { type: 'bearer' }).send({ username: users[1].username })
            .end((err, res) => {
                res.should.status(405)
                done()
            })
    })
})

describe('PUT /users', () => {
    it('Modifier plusieurs Utilisateurs - S', (done) => {
        chai.request(server).put('/users').query({ id: _.map(users, '_id') }).auth(token, { type: 'bearer' }).send({ firstName: 'James' })
            .end((err, res) => {
                res.should.have.status(200);
                expect(res.body).to.be.an('object');
                done();
            });
    })

    it('Modifier plusieurs Utilisateurs avec un Id non valide - E', (done) => {
        chai.request(server).put('/users').query({ id: ['84655616846865', '84517613'] }).auth(token, { type: 'bearer' }).send({ firstName: 'James' })
            .end((err, res) => {
                res.should.have.status(405);
                expect(res.body).to.be.an('object');
                done();
            });
    })

    it('Modifier plusieurs Utilisateurs  avec des ids inexistant- E', (done) => {
        chai.request(server).put('/users').query({ id: ['667a698caca06606d0ce8708', '667a699d521dd12877f36ec2'] }).auth(token, { type: 'bearer' }).send({ firstName: 'James' })
            .end((err, res) => {
                res.should.have.status(404);
                expect(res.body).to.be.an('object');
                done();
            });
    })

    it('Modifier plusieurs Utilisateurs  avec un champ requis vide - E', (done) => {
        chai.request(server).put('/users').query({ id: _.map(users, '_id') }).auth(token, { type: 'bearer' }).send({ firstName: '' })
            .end((err, res) => {
                res.should.have.status(405);
                expect(res.body).to.be.an('object');
                done();
            });
    })

    it('Modifier plusieurs Utilisateurs  avec un champ unique existant - E', (done) => {
        chai.request(server).put('/users').query({ id: _.map(users, '_id') }).auth(token, { type: 'bearer' }).send({ username: users[1].username })
            .end((err, res) => {
                res.should.have.status(405);
                expect(res.body).to.be.an('object');
                done();
            });
    })
})

describe('GET - /user/:id', () => {
    it('Rechercher un utilisateur existant -S', (done) => {
        chai.request(server).get(`/user/${users[0]._id}`).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(200);
                expect(res.body).to.be.an('object');
                done();
            });
    });

    it('Rechercher un utilisateur non valide - E', (done) => {
        const userId = '145';
        chai.request(server).get(`/user/${userId}`).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(405);
                done();
            });
    });

    it('Chercher un Utilisateur non trouver - E', (done) => {
        const userId = '6675723101608233e810e10a';
        chai.request(server).get(`/user/${userId}`).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(404);
                done();
            });
    });
});

describe('GET - /user', () => {
    it('Chercher un utilisateur par un champ selectionné -S', (done) => {
        chai.request(server).get('/user').query({ fields: ['username'], values: users[0].username }).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.status = (200)
                done()
            })
    })
    it('Chercher un utilisateur par un champ non autorisé -E', (done) => {
        chai.request(server).get('/user').query({ fields: ['firstName'], values: users[0].username }).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.status = (405)
                done()
            })
    })
    it('Chercher un utilisateur sans query -E', (done) => {
        chai.request(server).get('/user').auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.status = (405)
                done()
            })
    })
    it('Chercher un utilisateur inexistant -E', (done) => {
        chai.request(server).get('/user').query({ fields: ['username'], values: 'helloguys' }).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.status = (404)
                done()
            })
    })
})

describe('GET - /users_by_filters', () => {
    it('Rechercher des utilisateurs -S', (done) => {
        chai.request(server).get('/users_by_filters').query({ page: 1, limit: 2 }).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(200);
                expect(res.body.results).to.be.an('array');
                done();
            });
    });

    it('Rechercher des utilisateurs avec une query vide -S', (done) => {
        chai.request(server).get('/users_by_filters').auth(token, { type: 'bearer' })
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body.results).to.be.an('array');
                expect(res.body.count).to.equal(3);
                done();
            });
    });

    it('Recherher plusieur utilisateurs avec une chaine de caracteres dans une page -E', (done) => {
        chai.request(server).get('/users_by_filters').auth(token, { type: 'bearer' }).query({ page: 'une phrase', limit: 3 })
            .end((err, res) => {

                expect(res.status).to.equal(405);
                done()
            })
    });
});

describe('GET - /users', () => {
    it('Rechercher plusieurs utilisateurs existants -S', (done) => {
        chai.request(server).get('/users').query({ id: _.map(users, '_id') }).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(200)
                done();
            });
    });

    it('Rechercher plusieurs utilisateurs avec un seul ID', (done) => {
        chai.request(server).get('/users').query({ id: ['1458781', '656216532'] }).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(405);
                done();
            });
    });

    it('Rechercher plusieurs utilisateurs inexistants - E', (done) => {
        chai.request(server).get('/users').query({ id: ['66792ded5e7a5a2a893297dc', '66792e10e6e3f8af2280bc7d'] }).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(404);
                expect(res.body).to.have.property('type_error', 'no-found');
                done();
            });
    });

    it('Rechercher plusieurs utilisateurs avec IDs non valides - 405', (done) => {
        const userIds = ['invalid-id-format-1', 'invalid-id-format-2'];
        chai.request(server)
            .get('/users')
            .query({ id: userIds }).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(405);
                expect(res.body).to.have.property('type_error', 'no-valid');
                done();
            });
    });
});

describe("DELETE - /user", () => {
    it("Supprimer un utilisateur. - S", (done) => {
        chai.request(server).delete('/user/' + users[1]._id).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(200)
                done()
            })
    })

    it("supprimer un utilisateur incorrect (avec un id inexistant). - E", (done) => {
        chai.request(server).delete('/user/665f18739d3e172be5daf092').auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(404)
                done()
            })
    })
    it("supprimer un utilisateur incorrect (avec un id invalide). - E", (done) => {
        chai.request(server).delete('/user/123').auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(405)
                done()
            })
    })
})

describe("DELETE - /users", () => {
    it("Supprimer plusieurs utilisateurs incorrects (avec un id inexistant). - E", (done) => {
        chai.request(server).delete('/users/665f18739d3e172be5daf092&665f18739d3e172be5daf093').auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(404)
                done()
            })
    })
    it("Supprimer plusieurs utilisateurs incorrects (avec un id invalide). - E", (done) => {
        chai.request(server).delete('/users').query({ id: ['123', '456'] }).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(405)
                done()
            })
    })
    it("Supprimer plusieurs utilisateurs. - S", (done) => {
        chai.request(server).delete('/users').query({ id: _.map(users, '_id') }).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(200)
                done()
            })
    })
})
