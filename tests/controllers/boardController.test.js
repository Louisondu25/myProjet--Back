const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('./../../server')
const UserService = require('../../services/UserService')
const _ = require('lodash')
const id_user = "6683f4120531895b2aac801f"
var boards = []
var user = null
var token = ''

var expect = chai.expect
var should = chai.should()

chai.use(chaiHttp)

var users = [
    {
        firstName: "detenteur  d'un Tableau 1",
        lastName: "Iencli",
        username: "oui1",
        email: "Iencli@gmail.com",
        password: "higuys",
        phoneNumber: "15415215"
    },
    {
        firstName: "detenteur  d'un Tableau 2",
        lastName: "Iencli",
        username: "oui2",
        email: "Iencli2@gmail.com",
        password: "higuys",
        phoneNumber: "15415215"
    }, {
        firstName: "detenteur  d'un Tableau 3",
        lastName: "Iencli",
        username: "oui3",
        email: "Iencli3@gmail.com",
        password: "higuys",
        phoneNumber: "15415215"
    },
    {
        firstName: "detenteur  d'un Tableau 4",
        lastName: "Iencli",
        username: "oui4",
        email: "Iencli4@gmail.com",
        password: "higuys",
        phoneNumber: "15415215"
    },
    {
        firstName: "detenteur  d'un Tableau 5",
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
            TabUserId = _.map(value, '_id')
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

describe("POST - /board", () => {
    it("Ajouter un Tableau. - S", (done) => {
        chai.request(server).post('/board').auth(token, { type: 'bearer' }).send({
            user_id: rdm_users(TabUserId), // en attendant que j'ai les bon ids
            title: "blabla",
            content: "La content de cet objet board",
            index: 1,
            status: 'Public',
            archive: true,
            password: "higuys"
        }).end((err, res) => {
            res.should.have.status(201)
            boards.push(res.body)
            done()
        });
    })
    it("Ajouter un Tableau incorrect. (Sans Title) - E", (done) => {
        chai.request(server).post('/board').auth(token, { type: 'bearer' }).send({
            user_id: rdm_users(TabUserId), // en attendant que j'ai les bon ids
            content: "La content de cet objet board",
            index: 1,
            status: 'Public',
            archive: false,
            password: "higuys"
        }).end((err, res) => {
            res.should.have.status(405)
            done()
        })
    })
    it("Ajouter un Tableaiu incorrect. (Avec un nom de Tableau existant) - E", (done) => {
        chai.request(server).post('/board').auth(token, { type: 'bearer' }).send({
            title: "heyblablahellodude",//mettre les id quand il seront faite
            content: "La content de cet objet board",
            index: 1,
            status: 'Public',
            archive: true,
            password: "higuys"
        }).end((err, res) => {
            res.should.have.status(405)
            done()
        })
    })
    it("Ajouter un Tableau incorrect. (Avec un champ vide) - E", (done) => {
        chai.request(server).post('/board').auth(token, { type: 'bearer' }).send({
            user_id: rdm_users(TabUserId), // en attendant que j'ai les bon ids
            title: "blabla",
            content: "",
            index: 1,
            status: 'Public',
            archive: false,
            password: "higuys"
        }).end((err, res) => {
            res.should.have.status(405)
            done()
        })
    })
})

describe("POST - /boards", () => {
    it("Ajouter plusieurs Tableaux. - S", (done) => {
        chai.request(server).post('/boards').auth(token, { type: 'bearer' }).send([{
            user_id: rdm_users(TabUserId), // en attendant que j'ai les bon ids
            title: "blabla",
            content: "La content de cet objet board",
            index: 1,
            status: 'Public',
            archive: true,
            password: "higuys"
        },

        {
            user_id: rdm_users(TabUserId), // en attendant que j'ai les bon ids
            title: "blablablabla Pookie",
            content: "La content de cet objet board",
            index: 1,
            status: 'Public',
            archive: true,
            password: "higuys"
        }]
        ).end((err, res) => {
            res.should.have.status(201)
            boards = [...boards, ...res.body]
            done()
        });
    })
    it("Ajouter plusieurs Tableaux incorrect. - E", (done) => {
        chai.request(server).post('/boards').auth(token, { type: 'bearer' }).send([
            {
                user_id: rdm_users(TabUserId), // en attendant que j'ai les bon ids
                content: "La content de cet objet board",
                index: 1,
                status: 'Public',
                archive: false,
                password: "higuys"
            },

            {
                user_id: rdm_users(TabUserId), // en attendant que j'ai les bon ids
                index: 1,
                status: 'Public',
                archive: false,
                password: "higuys"
            }
        ]).end((err, res) => {
            res.should.have.status(405)
            done()
        })
    })
    it("Ajouter plusieurs Tableaux incorrect. (Avec plusieurs nom de Tableaux existant) - E", (done) => {
        chai.request(server).post('/boards').auth(token, { type: 'bearer' }).send([{
            title: "heyblablahellodude", //mettre les id quand il seront faite
            content: "La content de cet objet board",
            index: 1,
            password: "higuys"
        }]).end((err, res) => {
            res.should.have.status(405)
            done()
        })
    })
    it("Ajouter plusieurs Tableaux incorrect. (Avec un champ vide) - E", (done) => {
        chai.request(server).post('/boards').auth(token, { type: 'bearer' }).send([{
            user_id: rdm_users(TabUserId), // en attendant que j'ai les bon ids
            title: "",
            content: "La content de cet objet board",
            index: 1,
            password: "higuys"
        }]).end((err, res) => {
            res.should.have.status(405)
            done()
        })
    })
})

describe('PUT - /board/:id', () => {
    it('Modifier un Tableau -S', (done) => {
        chai.request(server).put(`/board/${boards[0]._id}`).auth(token, { type: 'bearer' }).send({ title: 'ImNoValidBoardLOL', content: 'je suis la content de ImNoValidBoardLOL' })
            .end((err, res) => {
                res.should.status(200)
                expect(res.body).to.be.a('object')
                done()
            })
    })

    it('Modifier un Tableau avec un id non valide -E', (done) => {
        chai.request(server).put('/board/86156100').auth(token, { type: 'bearer' }).send({ title: 'ImNoValidBoardLOL', content: 'je suis la content de ImNoValidBoardLOL' })
            .end((err, res) => {
                res.should.status(405)
                expect(res.body).to.be.a('object')
                done()
            })
    })
    it('Modifier un Tableau avec un id invalide -E', (done) => {
        chai.request(server).put('/board/66795a41761cc1544b34b3b6').auth(token, { type: 'bearer' }).send({ firstName: 'emilie', lastname: 'severe' })
            .end((err, res) => {
                res.should.status(404)
                done()
            })
    })
    it('Modifier un Tableau avec un champ requis vide -E', (done) => {
        chai.request(server).put(`/board/${boards[0]._id}`).auth(token, { type: 'bearer' }).send({ title: '', content: 'je suis la content de ImNoValidBoardLOL' })
            .end((err, res) => {
                res.should.status(405)
                done()
            })
    })
})

describe('PUT /boards', () => {
    it('Modifier plusieurs Tableaux - S', (done) => {
        chai.request(server).put('/boards').query({ id: _.map(boards, '_id') }).auth(token, { type: 'bearer' }).send({ title: 'James' })
            .end((err, res) => {
                res.should.have.status(200);
                expect(res.body).to.be.an('object');
                done();
            });
    })

    it('Modifier plusieurs Tableaux avec un Id non valide - E', (done) => {
        chai.request(server).put('/boards').query({ id: ['84655616846865', '84517613'] }).auth(token, { type: 'bearer' }).send({ title: 'James' })
            .end((err, res) => {
                res.should.have.status(405);
                expect(res.body).to.be.an('object');
                done();
            });
    })

    it('Modifier plusieurs Tableaux  avec des ids inexistant- E', (done) => {
        chai.request(server).put('/boards').query({ id: ['667a698caca06606d0ce8708', '667a699d521dd12877f36ec2'] }).auth(token, { type: 'bearer' }).send({ title: 'James' })
            .end((err, res) => {
                res.should.have.status(404);
                expect(res.body).to.be.an('object');
                done();
            });
    })

    it('Modifier plusieurs Tableau avec un champ requis vide - E', (done) => {
        chai.request(server).put('/boards').query({ id: _.map(boards, '_id') }).auth(token, { type: 'bearer' }).send({ title: '' })
            .end((err, res) => {
                res.should.have.status(405);
                expect(res.body).to.be.an('object');
                done();
            });
    })
})

describe('GET - /board/:id', () => {
    it('Rechercher un Tableau existant -S', (done) => {
        chai.request(server).get(`/board/${boards[0]._id}`).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(200);
                expect(res.body).to.be.an('object');
                done();
            });
    });

    it('Rechercher un Tableau non valide - E', (done) => {
        const boardId = '145';
        chai.request(server).get(`/board/${boardId}`).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(405);
                done();
            });
    });

    it('Chercher un Tableau non trouver - E', (done) => {
        const boardId = '6675723101608233e810e10a';
        chai.request(server).get(`/board/${boardId}`).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(404);
                done();
            });
    });
});

describe('GET - /board', () => {
    it('Chercher un Tableau par un champ selectionné -S', (done) => {
        chai.request(server).get('/board').query({ fields: ['content'], values: boards[0].boardname }).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.status = (200)
                done()
            })
    })
    it('Chercher un Tableau par un champ non autorisé -E', (done) => {
        chai.request(server).get('/board').query({ fields: ['name'], values: boards[0].boardname }).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.status = (405)
                done()
            })
    })
    it('Chercher un Tableau sans query -E', (done) => {
        chai.request(server).get('/board').auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.status = (405)
                done()
            })
    })
    it('Chercher un Tableau inexistant -E', (done) => {
        chai.request(server).get('/board').query({ fields: ['content'], values: 'helloguys' }).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.status = (404)
                done()
            })
    })
})

describe('GET - /boards_by_filters', () => {
    it('Rechercher des Tableaux -S', (done) => {
        chai.request(server).get('/boards_by_filters').query({ page: 1, limit: 2 }).auth(token, { type: 'bearer' })
            .end((err, res) => {

                res.should.have.status(200);
                expect(res.body.results).to.be.an('array');
                done();
            });
    });

    it('Rechercher des Tableaux avec une query vide -S', (done) => {
        chai.request(server).get('/boards_by_filters').auth(token, { type: 'bearer' })
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body.results).to.be.an('array');
                expect(res.body.count).to.equal(3);
                done();
            });
    });

    it('Recherher plusieurs Tableaux avec une chaine de caracteres dans une page -E', (done) => {
        chai.request(server).get('/boards_by_filters').query({ page: 'une phrase', limit: 3 }).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.status = (405)
                done()
            })
    });
});

describe('GET - /boards', () => {
    it('Rechercher plusieurs Tableaux existants -S', (done) => {
        chai.request(server).get('/boards').query({ id: _.map(boards, '_id') }).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(200)
                done();
            });
    });

    it('Rechercher plusieurs Tableaux avec un seul ID', (done) => {
        chai.request(server).get('/boards').query({ id: ['1458781', '656216532'] }).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(405);
                done();
            });
    });

    it('Rechercher plusieurs Tableaux inexistants - E', (done) => {
        chai.request(server).get('/boards').query({ id: ['66792ded5e7a5a2a893297dc', '66792e10e6e3f8af2280bc7d'] }).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(404);
                expect(res.body).to.have.property('type_error', 'no-found');
                done();
            });
    });

    it('Rechercher plusieurs Tableaux avec IDs non valides - 405', (done) => {
        const boardIds = ['invalid-id-format-1', 'invalid-id-format-2'];
        chai.request(server)
            .get('/boards')
            .query({ id: boardIds }).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(405);
                expect(res.body).to.have.property('type_error', 'no-valid');
                done();
            });
    });
});

describe("DELETE - /board", () => {
    it("Supprimer un Tableau. - S", (done) => {
        chai.request(server).delete('/board/' + boards[0]._id).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(200)
                done()
            })
    })
    it("supprimer un Tableau incorrect (avec un id inexistant). - E", (done) => {
        chai.request(server).delete('/board/665f18739d3e172be5daf092').auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(404)
                done()
            })
    })
    it("supprimer un Tableau incorrect (avec un id invalide). - E", (done) => {
        chai.request(server).delete('/board/123').auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(405)
                done()
            })
    })
})

describe("DELETE - /boards", () => {
    it("Supprimer plusieurs Tableaux. - S", (done) => {
        chai.request(server).delete('/boards').query({ id: _.map(boards, '_id') }).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(200)
                done()
            })
    })
    it("Supprimer plusieurs Tableaux incorrects (avec un id inexistant). - E", (done) => {
        chai.request(server).delete('/boards/665f18739d3e172be5daf092&665f18739d3e172be5daf093').auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(404)
                done()
            })
    })
    it("Supprimer plusieurs Tableaux incorrects (avec un id invalide). - E", (done) => {
        chai.request(server).delete('/boards').query({ id: ['123', '456'] }).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(405)
                done()
            })
    })
})
describe('Gestion des utilisateurs.', () => {
    it('Supprimer des Utilisateurs fictifs', (done) => {
        UserService.deleteManyUsers(TabUserId, null, function (err, value) {
            done()
        })
    })
})