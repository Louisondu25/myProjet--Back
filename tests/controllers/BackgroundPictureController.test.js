const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('./../../server')
const UserService = require('../../services/UserService')
const _ = require('lodash')
const id_user = "6683f4120531895b2aac801f"
var backgroundpictures = []
var user = null
var token = ''

var expect = chai.expect
var should = chai.should()

chai.use(chaiHttp)

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

describe("POST - /backgroundpicture", () => {
    it("Ajouter un BackgroundPicture. - S", (done) => {
        chai.request(server).post('/backgroundpicture').auth(token, { type: 'bearer' }).send({
            title: "Voyage",
            image: "New York",
            board_id: '66bb1c1b2bbcb76e3c7cacf4',
            created_at: new Date(),
            updated_at: new Date(),
            user_id: rdm_users(tab_id_users),
        }).end((err, res) => {
            res.should.have.status(201)
            //  expect(res).to.be.a('object')
            backgroundpictures.push(res.body)
            done()
        });
    })
    it("Ajouter un BackgroundPicture incorrect. (Sans firstName) - E", (done) => {
        chai.request(server).post('/backgroundpicture').auth(token, { type: 'bearer' }).send({
            image: "Paysage",
            board_id: '66bb1c1b2bbcb76e3c7cacf4',
            created_at: new Date(),
            updated_at: new Date(),
            user_id: rdm_users(tab_id_users),
        }).end((err, res) => {
            res.should.have.status(405)
            done()
        })
    })
    it("Ajouter un BackgroundPicture incorrect. (Avec un backgroundpicturename existant) - E", (done) => {
        chai.request(server).post('/backgroundpicture').auth(token, { type: 'bearer' }).send({
            title: "Voyage",
            image: "New York",
            board_id: '66bb1c1b2bbcb76e3c7cacf4',
            created_at: new Date(),
            updated_at: new Date(),
            user_id: rdm_users(tab_id_users),
        }).end((err, res) => {
            res.should.have.status(405)
            done()
        })
    })
    it("Ajouter un BackgroundPicture incorrect. (Avec un champ vide) - E", (done) => {
        chai.request(server).post('/backgroundpicture').auth(token, { type: 'bearer' }).send({
            title: "Histoire",
            image: "",
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


describe("POST - /backgroundpictures", () => {
    it("Ajouter plusieurs BackgroundPictures. - S", (done) => {
        chai.request(server).post('/backgroundpictures').auth(token, { type: 'bearer' }).send([{
            title: "Vacances",
            image: "Mer",
            board_id: '66bb1c1b2bbcb76e3c7cacf4',
            created_at: new Date(),
            updated_at: new Date(),
            user_id: rdm_users(tab_id_users),
        },

        {
            title: "Oiseaux",
            image: "Aigle Royal",
            board_id: '66bb1c1b2bbcb76e3c7cacf4',
            created_at: new Date(),
            updated_at: new Date(),
            user_id: rdm_users(tab_id_users),
        }]
        ).end((err, res) => {
            res.should.have.status(201)
            backgroundpictures = [...backgroundpictures, ...res.body]
            done()
        });
    })
    it("Ajouter plusieurs BackgroundPictures incorrect. - E", (done) => {
        chai.request(server).post('/backgroundpictures').auth(token, { type: 'bearer' }).send([
            {
                image: "Galaxie",
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
            }
        ]).end((err, res) => {
            res.should.have.status(405)
            done()
        })
    })
    it("Ajouter plusieurs BackgroundPictures incorrect. (Avec un backgroundpicturename existant) - E", (done) => {
        chai.request(server).post('/backgroundpictures').auth(token, { type: 'bearer' }).send([{
            title: "Voyage",
            image: "New York",
            board_id: '66bb1c1b2bbcb76e3c7cacf4',
            created_at: new Date(),
            updated_at: new Date(),
            user_id: rdm_users(tab_id_users),
            password: "higuys"
        }]).end((err, res) => {
            res.should.have.status(405)
            done()
        })
    })
    it("Ajouter plusieurs BackgroundPictures incorrect. (Avec un champ vide) - E", (done) => {
        chai.request(server).post('/backgroundpictures').auth(token, { type: 'bearer' }).send([{
            title: "Voyage",
            image: "",
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

describe('PUT - /backgroundpicture/:id', () => {
    it('Modifier un BackgroundPicture -S', (done) => {
        chai.request(server).put(`/backgroundpicture/${backgroundpictures[0]._id}`).auth(token, { type: 'bearer' }).send({ firstName: 'Jeanne', lastName: 'Lu' })
            .end((err, res) => {
                res.should.status(200)
                expect(res.body).to.be.a('object')
                done()
            })
    })

    it('Modifier un BackgroundPicture avec un id non valide -E', (done) => {
        chai.request(server).put('/backgroundpicture/86156100').auth(token, { type: 'bearer' }).send({ firstName: 'Marie', lastName: 'fils' })
            .end((err, res) => {
                res.should.status(405)
                expect(res.body).to.be.a('object')
                done()
            })
    })
    it('Modifier un BackgroundPicture avec un id invalide -E', (done) => {
        chai.request(server).put('/backgroundpicture/66795a41761cc1544b34b3b6').auth(token, { type: 'bearer' }).send({ firstName: 'emilie', lastname: 'severe' })
            .end((err, res) => {
                res.should.status(404)
                done()
            })
    })
    it('Modifier un BackgroundPicture avec un champ requis vide -E', (done) => {
        chai.request(server).put(`/backgroundpicture/${backgroundpictures[0]._id}`).auth(token, { type: 'bearer' }).send({ title: '', description: 'senerve' })
            .end((err, res) => {
                res.should.status(405)
                done()
            })
    })
})

describe('PUT /backgroundpictures', () => {
    it('Modifier plusieurs BackgroundPictures - S', (done) => {
        chai.request(server).put('/backgroundpictures').query({ id: _.map(backgroundpictures, '_id') }).auth(token, { type: 'bearer' }).send({ firstName: 'James' })
            .end((err, res) => {
                res.should.have.status(200);
                expect(res.body).to.be.an('object');
                done();
            });
    })

    it('Modifier plusieurs BackgroundPictures avec un Id non valide - E', (done) => {
        chai.request(server).put('/backgroundpictures').query({ id: ['84655616846865', '84517613'] }).auth(token, { type: 'bearer' }).send({ firstName: 'James' })
            .end((err, res) => {
                res.should.have.status(405);
                expect(res.body).to.be.an('object');
                done();
            });
    })

    it('Modifier plusieurs BackgroundPictures  avec des ids inexistant- E', (done) => {
        chai.request(server).put('/backgroundpictures').query({ id: ['667a698caca06606d0ce8708', '667a699d521dd12877f36ec2'] }).auth(token, { type: 'bearer' }).send({ title: 'James' })
            .end((err, res) => {
                res.should.have.status(404);
                expect(res.body).to.be.an('object');
                done();
            });
    })

    it('Modifier plusieurs BackgroundPictures  avec un champ requis vide - E', (done) => {
        chai.request(server).put('/backgroundpictures').query({ id: _.map(backgroundpictures, '_id') }).auth(token, { type: 'bearer' }).send({ title: '' })
            .end((err, res) => {
                res.should.have.status(405);
                expect(res.body).to.be.an('object');
                done();
            });
    })
})

describe('GET - /backgroundpicture/:id', () => {
    it('Rechercher un BackgroundPicture existant -S', (done) => {
        chai.request(server).get(`/backgroundpicture/${backgroundpictures[0]._id}`).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(200);
                expect(res.body).to.be.an('object');
                done();
            });
    });

    it('Rechercher un BackgroundPicture non valide - E', (done) => {
        const backgroundpictureId = '145';
        chai.request(server).get(`/backgroundpicture/${backgroundpictureId}`).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(405);
                done();
            });
    });

    it('Chercher un BackgroundPicture non trouver - E', (done) => {
        const backgroundpictureId = '6675723101608233e810e10a';
        chai.request(server).get(`/backgroundpicture/${backgroundpictureId}`).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(404);
                done();
            });
    });
});

describe('GET - /backgroundpicture', () => {
    it('Chercher un BackgroundPicture par un champ selectionné -S', (done) => {
        chai.request(server).get('/backgroundpicture').query({ fields: ['description'], values: backgroundpictures[0].backgroundpicturename }).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.status = (200)
                done()
            })
    })
    it('Chercher un BackgroundPicture par un champ non autorisé -E', (done) => {
        chai.request(server).get('/backgroundpicture').query({ fields: ['name'], values: backgroundpictures[0].backgroundpicturename }).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.status = (405)
                done()
            })
    })
    it('Chercher un BackgroundPicture sans query -E', (done) => {
        chai.request(server).get('/backgroundpicture').auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.status = (405)
                done()
            })
    })
    it('Chercher un BackgroundPicture inexistant -E', (done) => {
        chai.request(server).get('/backgroundpicture').query({ fields: ['description'], values: 'helloguys' }).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.status = (404)
                done()
            })
    })
})

describe('GET - /backgroundpictures_by_filters', () => {
    it('Rechercher des BackgroundPictures -S', (done) => {
        chai.request(server).get('/backgroundpictures_by_filters').query({ page: 1, limit: 2 }).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(200);
                expect(res.body.results).to.be.an('array');
                done();
            });
    });

    it('Rechercher des BackgroundPictures avec une query vide -S', (done) => {
        chai.request(server).get('/backgroundpictures_by_filters').auth(token, { type: 'bearer' })
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body.results).to.be.an('array');
                expect(res.body.count).to.equal(3);
                done();
            });
    });

    it('Recherher plusieurs BackgroundPictures avec une chaine de caracteres dans une page -E', (done) => {
        chai.request(server).get('/backgroundpictures_by_filters').query({ page: 'une phrase', limit: 3 }).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.status = (405)
                done()
            })
    });
});

describe('GET - /backgroundpictures', () => {
    it('Rechercher plusieurs BackgroundPictures existants -S', (done) => {
        chai.request(server).get('/backgroundpictures').query({ id: _.map(backgroundpictures, '_id') }).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(200)
                done();
            });
    });

    it('Rechercher plusieurs BackgroundPictures avec un seul ID', (done) => {
        chai.request(server).get('/backgroundpictures').query({ id: ['1458781', '656216532'] }).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(405);
                done();
            });
    });

    it('Rechercher plusieurs BackgroundPictures inexistants - E', (done) => {
        chai.request(server).get('/backgroundpictures').query({ id: ['66792ded5e7a5a2a893297dc', '66792e10e6e3f8af2280bc7d'] }).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(404);
                expect(res.body).to.have.property('type_error', 'no-found');
                done();
            });
    });

    it('Rechercher plusieurs BackgroundPictures avec IDs non valides - 405', (done) => {
        const backgroundpictureIds = ['invalid-id-format-1', 'invalid-id-format-2'];
        chai.request(server)
            .get('/backgroundpictures')
            .query({ id: backgroundpictureIds }).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(405);
                expect(res.body).to.have.property('type_error', 'no-valid');
                done();
            });
    });
});

describe("DELETE - /backgroundpicture", () => {
    it("Supprimer un BackgroundPicture. - S", (done) => {
        chai.request(server).delete('/backgroundpicture/' + backgroundpictures[0]._id).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(200)
                done()
            })
    })
    it("supprimer un BackgroundPicture incorrect (avec un id inexistant). - E", (done) => {
        chai.request(server).delete('/backgroundpicture/665f18739d3e172be5daf092').auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(404)
                done()
            })
    })
    it("supprimer un BackgroundPicture incorrect (avec un id invalide). - E", (done) => {
        chai.request(server).delete('/backgroundpicture/123').auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(405)
                done()
            })
    })
})

describe("DELETE - /backgroundpictures", () => {
    it("Supprimer plusieurs BackgroundPictures. - S", (done) => {
        chai.request(server).delete('/backgroundpictures').query({ id: _.map(backgroundpictures, '_id') }).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(200)
                done()
            })
    })
    it("Supprimer plusieurs BackgroundPictures incorrects (avec un id inexistant). - E", (done) => {
        chai.request(server).delete('/backgroundpictures/665f18739d3e172be5daf092&665f18739d3e172be5daf093').auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(404)
                done()
            })
    })
    it("Supprimer plusieurs BackgroundPictures incorrects (avec un id invalide). - E", (done) => {
        chai.request(server).delete('/backgroundpictures').query({ id: ['123', '456'] }).auth(token, { type: 'bearer' })
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