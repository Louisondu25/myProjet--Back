const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('./../../server')
const UserService = require('../../services/UserService')
const _ = require('lodash')
const id_user = "6683f4120531895b2aac801f"
var backgroundcolors = []
var user = null
var token = ''

var expect = chai.expect
var should = chai.should()

chai.use(chaiHttp)

var users = [
    {
        firstName: "detenteur  d'backgroundcolor 1",
        lastName: "Iencli",
        username: "oui1",
        email: "Iencli@gmail.com",
        password: "higuys",
        phoneNumber: "15415215"
    },
    {
        firstName: "detenteur  d'backgroundcolor 2",
        lastName: "Iencli",
        username: "oui2",
        email: "Iencli2@gmail.com",
        password: "higuys",
        phoneNumber: "15415215"
    }, {
        firstName: "detenteur  d'backgroundcolor 3",
        lastName: "Iencli",
        username: "oui3",
        email: "Iencli3@gmail.com",
        password: "higuys",
        phoneNumber: "15415215"
    },
    {
        firstName: "detenteur  d'backgroundcolor 4",
        lastName: "Iencli",
        username: "oui4",
        email: "Iencli4@gmail.com",
        password: "higuys",
        phoneNumber: "15415215"
    },
    {
        firstName: "detenteur  d'backgroundcolor 5",
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

describe("POST - /backgroundcolor", () => {
    it("Ajouter un BackgroundColor. - S", (done) => {
        chai.request(server).post('/backgroundcolor').auth(token, { type: 'bearer' }).send({
            title: "Bleu",
            color: "blue",
            board_id: '66bb1c1b2bbcb76e3c7cacf4',
            created_at: new Date(),
            updated_at: new Date(),
            user_id: rdm_users(tab_id_users),
        }).end((err, res) => {
            res.should.have.status(201)
            //  expect(res).to.be.a('object')
            backgroundcolors.push(res.body)
            done()
        });
    })
    it("Ajouter un BackgroundColor incorrect. (Sans Title) - E", (done) => {
        chai.request(server).post('/backgroundcolor').auth(token, { type: 'bearer' }).send({
            color: "orange",
            board_id: '66bb1c1b2bbcb76e3c7cacf4',
            created_at: new Date(),
            updated_at: new Date(),
            user_id: rdm_users(tab_id_users),
        }).end((err, res) => {
            res.should.have.status(405)
            done()
        })
    })
    it("Ajouter un BackgroundColor incorrect. (Avec un backgroundcolorname existant) - E", (done) => {
        chai.request(server).post('/backgroundcolor').auth(token, { type: 'bearer' }).send({
            title: "Bleu",
            color: "blue",
            board_id: '66bb1c1b2bbcb76e3c7cacf4',
            created_at: new Date(),
            updated_at: new Date(),
            user_id: rdm_users(tab_id_users),
        }).end((err, res) => {
            res.should.have.status(405)
            done()
        })
    })
    it("Ajouter un BackgroundColor incorrect. (Avec un champ vide) - E", (done) => {
        chai.request(server).post('/backgroundcolor').auth(token, { type: 'bearer' }).send({
            title: "",
            color: "black",
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


describe("POST - /backgroundcolors", () => {
    it("Ajouter plusieurs BackgroundColors. - S", (done) => {
        chai.request(server).post('/backgroundcolors').auth(token, { type: 'bearer' }).send([{
            title: "Noir",
            color: "black",
            board_id: '66bb1c1b2bbcb76e3c7cacf4',
            created_at: new Date(),
            updated_at: new Date(),
            user_id: rdm_users(tab_id_users),
        },

        {
            title: "Blanc",
            color: "white",
            board_id: '66bb1c1b2bbcb76e3c7cacf4',
            created_at: new Date(),
            updated_at: new Date(),
            user_id: rdm_users(tab_id_users),
        }]
        ).end((err, res) => {
            res.should.have.status(201)
            backgroundcolors = [...backgroundcolors, ...res.body]
            done()
        });
    })
    it("Ajouter plusieurs BackgroundColors incorrect. - E", (done) => {
        chai.request(server).post('/backgroundcolors').auth(token, { type: 'bearer' }).send([
            {
                color: "blue",
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
    it("Ajouter plusieurs BackgroundColors incorrect. (Avec un backgroundcolorname existant) - E", (done) => {
        chai.request(server).post('/backgroundcolors').auth(token, { type: 'bearer' }).send([{
            title: "Bleu",
            color: "blue",
            board_id: '66bb1c1b2bbcb76e3c7cacf4',
            created_at: new Date(),
            updated_at: new Date(),
            user_id: rdm_users(tab_id_users),
        }]).end((err, res) => {
            res.should.have.status(405)
            done()
        })
    })
    it("Ajouter plusieurs BackgroundColors incorrect. (Avec un champ vide) - E", (done) => {
        chai.request(server).post('/backgroundcolors').auth(token, { type: 'bearer' }).send([{
            title: "",
            color: "blue",
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

describe('PUT - /backgroundcolor/:id', () => {
    it('Modifier un BackgroundColor -S', (done) => {
        chai.request(server).put(`/backgroundcolor/${backgroundcolors[0]._id}`).auth(token, { type: 'bearer' }).send({ title: 'Jeanne', color: 'Lu' })
            .end((err, res) => {
                res.should.status(200)
                expect(res.body).to.be.a('object')
                done()
            })
    })

    it('Modifier un BackgroundColor avec un id non valide -E', (done) => {
        chai.request(server).put('/backgroundcolor/86156100').auth(token, { type: 'bearer' }).send({ firstName: 'Marie', lastName: 'fils' })
            .end((err, res) => {
                res.should.status(405)
                expect(res.body).to.be.a('object')
                done()
            })
    })
    it('Modifier un BackgroundColor avec un id invalide -E', (done) => {
        chai.request(server).put('/backgroundcolor/66795a41761cc1544b34b3b6').auth(token, { type: 'bearer' }).send({ firstName: 'emilie', lastname: 'severe' })
            .end((err, res) => {
                res.should.status(404)
                done()
            })
    })
    it('Modifier un BackgroundColor avec un champ requis vide -E', (done) => {
        chai.request(server).put(`/backgroundcolor/${backgroundcolors[0]._id}`).auth(token, { type: 'bearer' }).send({ title: '', color: 'senerve' })
            .end((err, res) => {
                res.should.status(405)
                done()
            })
    })
})

describe('PUT /backgroundcolors', () => {
    it('Modifier plusieurs BackgroundColors - S', (done) => {
        chai.request(server).put('/backgroundcolors').query({ id: _.map(backgroundcolors, '_id') }).auth(token, { type: 'bearer' }).send()
            .end((err, res) => {
                res.should.have.status(200);
                expect(res.body).to.be.an('object');
                done();
            });
    })

    it('Modifier plusieurs BackgroundColors avec un Id non valide - E', (done) => {
        chai.request(server).put('/backgroundcolors').query({ id: ['84655616846865', '84517613'] }).auth(token, { type: 'bearer' }).send({ firstName: 'James' })
            .end((err, res) => {
                res.should.have.status(405);
                expect(res.body).to.be.an('object');
                done();
            });
    })

    it('Modifier plusieurs BackgroundColors  avec des ids inexistant- E', (done) => {
        chai.request(server).put('/backgroundcolors').query({ id: ['667a698caca06606d0ce8708', '667a699d521dd12877f36ec2'] }).auth(token, { type: 'bearer' }).send({ title: 'James' })
            .end((err, res) => {
                res.should.have.status(404);
                expect(res.body).to.be.an('object');
                done();
            });
    })

    it('Modifier plusieurs BackgroundColors  avec un champ requis vide - E', (done) => {
        chai.request(server).put('/backgroundcolors').query({ id: _.map(backgroundcolors, '_id') }).auth(token, { type: 'bearer' }).send({ title: '' })
            .end((err, res) => {
                res.should.have.status(405);
                expect(res.body).to.be.an('object');
                done();
            });
    })
})

describe('GET - /backgroundcolor/:id', () => {
    it('Rechercher un BackgroundColor existant -S', (done) => {
        chai.request(server).get(`/backgroundcolor/${backgroundcolors[0]._id}`).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(200);
                expect(res.body).to.be.an('object');
                done();
            });
    });

    it('Rechercher un BackgroundColor non valide - E', (done) => {
        const backgroundcolorId = '145';
        chai.request(server).get(`/backgroundcolor/${backgroundcolorId}`).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(405);
                done();
            });
    });

    it('Chercher un BackgroundColor non trouver - E', (done) => {
        const backgroundcolorId = '6675723101608233e810e10a';
        chai.request(server).get(`/backgroundcolor/${backgroundcolorId}`).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(404);
                done();
            });
    });
});

describe('GET - /backgroundcolor', () => {
    it('Chercher un BackgroundColor par un champ selectionné -S', (done) => {
        chai.request(server).get('/backgroundcolor').query({ fields: ['title'], values: backgroundcolors[0].title }).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.status = (200)
                done()
            })
    })
    it('Chercher un BackgroundColor par un champ non autorisé -E', (done) => {
        chai.request(server).get('/backgroundcolor').query({ fields: ['name'], values: backgroundcolors[0].backgroundcolorname }).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.status = (405)
                done()
            })
    })
    it('Chercher un BackgroundColor sans query -E', (done) => {
        chai.request(server).get('/backgroundcolor').auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.status = (405)
                done()
            })
    })
    it('Chercher un BackgroundColor inexistant -E', (done) => {
        chai.request(server).get('/backgroundcolor').query({ fields: ['description'], values: 'helloguys' }).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.status = (404)
                done()
            })
    })
})

describe('GET - /backgroundcolors_by_filters', () => {
    it('Rechercher des BackgroundColors -S', (done) => {
        chai.request(server).get('/backgroundcolors_by_filters').query({ page: 1, limit: 2 }).auth(token, { type: 'bearer' })
            .end((err, res) => {

                res.should.have.status(200);
                expect(res.body.results).to.be.an('array');
                done();
            });
    });

    it('Rechercher des BackgroundColors avec une query vide -S', (done) => {
        chai.request(server).get('/backgroundcolors_by_filters').auth(token, { type: 'bearer' })
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body.results).to.be.an('array');
                expect(res.body.count).to.equal(3);
                done();
            });
    });

    it('Recherher plusieurs BackgroundColors avec une chaine de caracteres dans une page -E', (done) => {
        chai.request(server).get('/backgroundcolors_by_filters').query({ page: 'une phrase', limit: 3 }).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.status = (405)
                done()
            })
    });
});

describe('GET - /backgroundcolors', () => {
    it('Rechercher plusieurs BackgroundColors existants -S', (done) => {
        chai.request(server).get('/backgroundcolors').query({ id: _.map(backgroundcolors, '_id') }).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(200)
                done();
            });
    });

    it('Rechercher plusieurs BackgroundColors avec un seul ID', (done) => {
        chai.request(server).get('/backgroundcolors').query({ id: ['1458781', '656216532'] }).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(405);
                done();
            });
    });

    it('Rechercher plusieurs BackgroundColors inexistants - E', (done) => {
        chai.request(server).get('/backgroundcolors').query({ id: ['66792ded5e7a5a2a893297dc', '66792e10e6e3f8af2280bc7d'] }).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(404);
                expect(res.body).to.have.property('type_error', 'no-found');
                done();
            });
    });

    it('Rechercher plusieurs BackgroundColors avec IDs non valides - 405', (done) => {
        const backgroundcolorIds = ['invalid-id-format-1', 'invalid-id-format-2'];
        chai.request(server)
            .get('/backgroundcolors')
            .query({ id: backgroundcolorIds }).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(405);
                expect(res.body).to.have.property('type_error', 'no-valid');
                done();
            });
    });
});

describe("DELETE - /backgroundcolor", () => {
    it("Supprimer un BackgroundColor. - S", (done) => {
        chai.request(server).delete('/backgroundcolor/' + backgroundcolors[0]._id).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(200)
                done()
            })
    })
    it("supprimer un BackgroundColor incorrect (avec un id inexistant). - E", (done) => {
        chai.request(server).delete('/backgroundcolor/665f18739d3e172be5daf092').auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(404)
                done()
            })
    })
    it("supprimer un BackgroundColor incorrect (avec un id invalide). - E", (done) => {
        chai.request(server).delete('/backgroundcolor/123').auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(405)
                done()
            })
    })
})

describe("DELETE - /backgroundcolors", () => {
    it("Supprimer plusieurs BackgroundColors. - S", (done) => {
        chai.request(server).delete('/backgroundcolors').query({ id: _.map(backgroundcolors, '_id') }).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(200)
                done()
            })
    })
    it("Supprimer plusieurs BackgroundColors incorrects (avec un id inexistant). - E", (done) => {
        chai.request(server).delete('/backgroundcolors/665f18739d3e172be5daf092&665f18739d3e172be5daf093').auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(404)
                done()
            })
    })
    it("Supprimer plusieurs BackgroundColors incorrects (avec un id invalide). - E", (done) => {
        chai.request(server).delete('/backgroundcolors').query({ id: ['123', '456'] }).auth(token, { type: 'bearer' })
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