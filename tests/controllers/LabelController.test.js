const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('./../../server')
const UserService = require('../../services/UserService')
const _ = require('lodash')
const id_user = "6683f4120531895b2aac801f"
var labels = []
var user = null
var token = ''

var expect = chai.expect
var should = chai.should()

chai.use(chaiHttp)

var users = [
    {
        firstName: "detenteur  d'etiquette 1",
        lastName: "Iencli",
        username: "oui1",
        email: "Iencli@gmail.com",
        password: "higuys",
        age: 10,
        phone_Number: "15415215"
    },
    {
        firstName: "detenteur  d'etiquette 2",
        lastName: "Iencli",
        username: "oui2",
        email: "Iencli2@gmail.com",
        password: "higuys",
        age: 10,
        phone_Number: "15415215"
    }, {
        firstName: "detenteur  d'etiquette 3",
        lastName: "Iencli",
        username: "oui3",
        email: "Iencli3@gmail.com",
        password: "higuys",
        age: 10,
        phone_Number: "15415215"
    },
    {
        firstName: "detenteur  d'etiquette 4",
        lastName: "Iencli",
        username: "oui4",
        email: "Iencli4@gmail.com",
        password: "higuys",
        age: 10,
        phone_Number: "15415215"
    },
    {
        firstName: "detenteur  d'etiquette 5",
        lastName: "Iencli",
        username: "oui5",
        email: "Iencli5@gmail.com",
        password: "higuys",
        age: 10,
        phone_Number: "15415215"
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
            username: "oui1",
            password: "higuys",
        }).end((err, res) => {
            res.should.have.status(200)
            token = res.body.token
            done()
        })
    })
})

describe("POST - /label", () => {
    it("Ajouter une Etiquette. - S", (done) => {
        chai.request(server).post('/label').auth(token, { type: 'bearer' }).send({
            text: "Label Blue",
            date: 1,
            status: true,
            task_id: "66bc7ded639d08dee594f342",
            user_id: rdm_users(TabUserId),
            board_id: "66bb1c1b2bbcb76e3c7cacf4",
            created_at: new Date(),
            updated_at: new Date(),
        }).end((err, res) => {
            res.should.have.status(201)
            //  expect(res).to.be.a('object')
            labels.push(res.body)
            done()
        });
    })
    it("Ajouter une Etiquette incorrect. (Sans Text) - E", (done) => {
        chai.request(server).post('/label').auth(token, { type: 'bearer' }).send({
            date: 1,
            status: false,
            task_id: "66bc7ded639d08dee594f342",
            user_id: rdm_users(TabUserId),
            board_id: "66bb1c1b2bbcb76e3c7cacf4",
            created_at: new Date(),
            updated_at: new Date(),
        }).end((err, res) => {
            res.should.have.status(405)
            done()
        })
    })
    it("Ajouter une Etiquette incorrect. (Avec un nom d'Etiquette existant) - E", (done) => {
        chai.request(server).post('/label').auth(token, { type: 'bearer' }).send({
            text: "Label Blue",
            date: 1,
            status: false,
            task_id: "66bc7ded639d08dee594f342",
            user_id: rdm_users(TabUserId),
            board_id: "66bb1c1b2bbcb76e3c7cacf4",
            created_at: new Date(),
            updated_at: new Date(),
        }).end((err, res) => {
            res.should.have.status(405)
            done()
        })
    })
    it("Ajouter une Etiquette incorrect. (Avec un champ vide) - E", (done) => {
        chai.request(server).post('/label').auth(token, { type: 'bearer' }).send({
            text: "Label Blue",
            date: 1,
            status: true,
            task_id: "",
            user_id: rdm_users(TabUserId),
            board_id: "66bb1c1b2bbcb76e3c7cacf4",
            created_at: new Date(),
            updated_at: new Date(),
        }).end((err, res) => {
            res.should.have.status(405)
            done()
        })
    })
})


describe("POST - /labels", () => {
    it("Ajouter plusieurs Etiquettes. - S", (done) => {
        chai.request(server).post('/labels').auth(token, { type: 'bearer' }).send([{
            text: "Label Pink",
            date: 1,
            status: true,
            task_id: "66bc7ded639d08dee594f342",
            user_id: rdm_users(TabUserId),
            board_id: "66bb1c1b2bbcb76e3c7cacf4",
            created_at: new Date(),
            updated_at: new Date(),
        },

        {
            text: "Label Yellow",
            date: 1,
            status: true,
            task_id: "66bc7ded639d08dee594f342",
            user_id: rdm_users(TabUserId),
            board_id: "66bb1c1b2bbcb76e3c7cacf4",
            created_at: new Date(),
            updated_at: new Date(),
        }]
        ).end((err, res) => {
            res.should.have.status(201)
            labels = [...labels, ...res.body]
            done()
        });
    })
    it("Ajouter plusieurs Etiquettes incorrect. - E", (done) => {
        chai.request(server).post('/labels').auth(token, { type: 'bearer' }).send([
            {
                text: "Label Blue",
                status: false,
                task_id: "66bc7ded639d08dee594f342",
                user_id: rdm_users(TabUserId),
                board_id: "66bb1c1b2bbcb76e3c7cacf4",
                created_at: new Date(),
                updated_at: new Date(),
            },

            {
                date: 1,
                status: false,
                task_id: "66bc7ded639d08dee594f342",
                user_id: rdm_users(TabUserId),
                board_id: "66bb1c1b2bbcb76e3c7cacf4",
                created_at: new Date(),
                updated_at: new Date(),
            }
        ]).end((err, res) => {
            res.should.have.status(405)
            done()
        })
    })
    it("Ajouter plusieurs Etiquettes incorrect. (Avec un labelname existant) - E", (done) => {
        chai.request(server).post('/labels').auth(token, { type: 'bearer' }).send([{
            text: "Label Blue",
            date: 1,
            status: false,
            task_id: "66bc7ded639d08dee594f342",
            user_id: rdm_users(TabUserId),
            board_id: "66bb1c1b2bbcb76e3c7cacf4",
            created_at: new Date(),
            updated_at: new Date(),
        }]).end((err, res) => {
            res.should.have.status(405)
            done()
        })
    })
    it("Ajouter plusieurs Etiquettes incorrect. (Avec un champ vide) - E", (done) => {
        chai.request(server).post('/labels').auth(token, { type: 'bearer' }).send([{
            text: "",
            date: 1,
            status: true,
            task_id: "66bc7ded639d08dee594f342",
            user_id: rdm_users(TabUserId),
            board_id: "66bb1c1b2bbcb76e3c7cacf4",
            created_at: new Date(),
            updated_at: new Date(),
        }]).end((err, res) => {
            res.should.have.status(405)
            done()
        })
    })
})

describe('PUT - /label/:id', () => {
    it('Modifier une Etiquette -S', (done) => {
        chai.request(server).put(`/label/${labels[0]._id}`).auth(token, { type: 'bearer' }).send({ text: 'OneLabel', date: 1 })
            .end((err, res) => {
                res.should.status(200)
                expect(res.body).to.be.a('object')
                done()
            })
    })

    it('Modifier une Etiquette avec un id non valide -E', (done) => {
        chai.request(server).put('/label/86156100').auth(token, { type: 'bearer' }).send({ firstName: 'Marie', lastName: 'fils' })
            .end((err, res) => {
                res.should.status(405)
                expect(res.body).to.be.a('object')
                done()
            })
    })
    it('Modifier une Etiquette avec un id invalide -E', (done) => {
        chai.request(server).put('/label/66795a41761cc1544b34b3b6').auth(token, { type: 'bearer' }).send({ text: 'emilie', date: 1 })
            .end((err, res) => {
                res.should.status(404)
                done()
            })
    })
    it('Modifier une Etiquettee avec un champ requis vide -E', (done) => {
        chai.request(server).put(`/label/${labels[0]._id}`).auth(token, { type: 'bearer' }).send({ text: '', date: 1 })
            .end((err, res) => {
                res.should.status(405)
                done()
            })
    })
})

describe('PUT /labels', () => {
    it('Modifier plusieurs Etiquettes - S', (done) => {
        chai.request(server).put('/labels').query({ id: _.map(labels, '_id') }).auth(token, { type: 'bearer' }).send()
            .end((err, res) => {
                res.should.have.status(200);
                expect(res.body).to.be.an('object');
                done();
            });
    })

    it('Modifier plusieurs Etiquettes avec un Id non valide - E', (done) => {
        chai.request(server).put('/labels').query({ id: ['84655616846865', '84517613'] }).auth(token, { type: 'bearer' }).send({ firstName: 'James' })
            .end((err, res) => {
                res.should.have.status(405);
                expect(res.body).to.be.an('object');
                done();
            });
    })

    it('Modifier plusieurs Etiquettes  avec des ids inexistant- E', (done) => {
        chai.request(server).put('/labels').query({ id: ['667a698caca06606d0ce8708', '667a699d521dd12877f36ec2'] }).auth(token, { type: 'bearer' }).send({ text: 'James' })
            .end((err, res) => {
                res.should.have.status(404);
                expect(res.body).to.be.an('object');
                done();
            });
    })

    it('Modifier plusieurs Etiquettes  avec un champ requis vide - E', (done) => {
        chai.request(server).put('/labels').query({ id: _.map(labels, '_id') }).auth(token, { type: 'bearer' }).send({ text: '' })
            .end((err, res) => {
                res.should.have.status(405);
                expect(res.body).to.be.an('object');
                done();
            });
    })
})

describe('GET - /label/:id', () => {
    it('Rechercher une Etiquette existant -S', (done) => {
        chai.request(server).get(`/label/${labels[0]._id}`).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(200);
                expect(res.body).to.be.an('object');
                done();
            });
    });

    it('Rechercher une Etiquette non valide - E', (done) => {
        const labelId = '145';
        chai.request(server).get(`/label/${labelId}`).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(405);
                done();
            });
    });

    it('Chercher une Etiquette non trouver - E', (done) => {
        const labelId = '6675723101608233e810e10a';
        chai.request(server).get(`/label/${labelId}`).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(404);
                done();
            });
    });
});

describe('GET - /label', () => {
    it('Chercher une Etiquette par un champ selectionné -S', (done) => {
        chai.request(server).get('/label').query({ fields: ['description'], values: labels[0].labelname }).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.status = (200)
                done()
            })
    })
    it('Chercher une Etiquette par un champ non autorisé -E', (done) => {
        chai.request(server).get('/label').query({ fields: ['name'], values: labels[0].labelname }).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.status = (405)
                done()
            })
    })
    it('Chercher une Etiquette sans query -E', (done) => {
        chai.request(server).get('/label').auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.status = (405)
                done()
            })
    })
    it('Chercher une Etiquette inexistant -E', (done) => {
        chai.request(server).get('/label').query({ fields: ['description'], values: 'helloguys' }).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.status = (404)
                done()
            })
    })
})

describe('GET - /labels_by_filters', () => {
    it('Rechercher des Etiquettes -S', (done) => {
        chai.request(server).get('/labels_by_filters').query({ page: 1, limit: 2 }).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(200);
                expect(res.body.results).to.be.an('array');
                done();
            });
    });

    it('Rechercher des Etiquettes avec une query vide -S', (done) => {
        chai.request(server).get('/labels_by_filters').auth(token, { type: 'bearer' })
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body.results).to.be.an('array');
                expect(res.body.count).to.equal(3);
                done();
            });
    });

    it('Recherher plusieurs Etiquettes avec une chaine de caracteres dans une page -E', (done) => {
        chai.request(server).get('/labels_by_filters').query({ page: 'une phrase', limit: 3 }).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.status = (405)
                done()
            })
    });
});

describe('GET - /labels', () => {
    it('Rechercher plusieurs Etiquettes existants -S', (done) => {
        chai.request(server).get('/labels').query({ id: _.map(labels, '_id') }).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(200)
                done();
            });
    });

    it('Rechercher plusieurs Etiquettes avec un seul ID', (done) => {
        chai.request(server).get('/labels').query({ id: ['1458781', '656216532'] }).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(405);
                done();
            });
    });

    it('Rechercher plusieurs Etiquettes inexistants - E', (done) => {
        chai.request(server).get('/labels').query({ id: ['66792ded5e7a5a2a893297dc', '66792e10e6e3f8af2280bc7d'] }).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(404);
                expect(res.body).to.have.property('type_error', 'no-found');
                done();
            });
    });

    it('Rechercher plusieurs Etiquettes avec IDs non valides - 405', (done) => {
        const labelIds = ['invalid-id-format-1', 'invalid-id-format-2'];
        chai.request(server)
            .get('/labels')
            .query({ id: labelIds }).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(405);
                expect(res.body).to.have.property('type_error', 'no-valid');
                done();
            });
    });
});

describe("DELETE - /label", () => {
    it("Supprimer une Etiquette. - S", (done) => {
        chai.request(server).delete('/label/' + labels[0]._id).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(200)
                done()
            })
    })
    it("supprimer une Etiquette incorrect (avec un id inexistant). - E", (done) => {
        chai.request(server).delete('/label/665f18739d3e172be5daf092').auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(404)
                done()
            })
    })
    it("supprimer une Etiquette incorrect (avec un id invalide). - E", (done) => {
        chai.request(server).delete('/label/123').auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(405)
                done()
            })
    })
})

// describe("DELETE - /labels", () => {
//     it("Supprimer plusieurs Etiquettes. - S", (done) => {
//         chai.request(server).delete('/labels').query({ id: _.map(labels, '_id') }).auth(token, { type: 'bearer' })
//             .end((err, res) => {
//                 res.should.have.status(200)
//                 done()
//             })
//     })
//     it("Supprimer plusieurs Etiquettes incorrects (avec un id inexistant). - E", (done) => {
//         chai.request(server).delete('/labels/665f18739d3e172be5daf092&665f18739d3e172be5daf093').auth(token, { type: 'bearer' })
//             .end((err, res) => {
//                 res.should.have.status(404)
//                 done()
//             })
//     })
//     it("Supprimer plusieurs Etiquettes incorrects (avec un id invalide). - E", (done) => {
//         chai.request(server).delete('/labels').query({ id: ['123', '456'] }).auth(token, { type: 'bearer' })
//             .end((err, res) => {
//                 res.should.have.status(405)
//                 done()
//             })
//     })
// })

describe('Gestion des utilisateurs.', () => {
    it('Supprimer des Utilisateurs fictifs', (done) => {
        UserService.deleteManyUsers(TabUserId, null, function (err, value) {
            done()
        })
    })
})