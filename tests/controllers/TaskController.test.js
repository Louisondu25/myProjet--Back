const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('./../../server')
const UserService = require('../../services/UserService')
const _ = require('lodash')
const id_user = "6683f4120531895b2aac801f"
var tasks = []
var user = null
var token = ''

var expect = chai.expect
var should = chai.should()

chai.use(chaiHttp)

var users = [
    {
        firstName: "detenteur  de la Tache 1",
        lastName: "Iencli",
        username: "oui1",
        email: "Iencli@gmail.com",
        password: "higuys",
        phoneNumber: "15415215"
    },
    {
        firstName: "detenteur  de la Tache 2",
        lastName: "Iencli",
        username: "oui2",
        email: "Iencli2@gmail.com",
        password: "higuys",
        phoneNumber: "15415215"

    }, {
        firstName: "detenteur  de la Tache 3",
        lastName: "Iencli",
        username: "oui3",
        email: "Iencli3@gmail.com",
        password: "higuys",
        phoneNumber: "15415215"
    },
    {
        firstName: "detenteur  de la Tache 4",
        lastName: "Iencli",
        username: "oui4",
        email: "Iencli4@gmail.com",
        password: "higuys",
        
        phoneNumber: "15415215"
    },
    {
        firstName: "detenteur  de la Tache 5",
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

describe("POST - /task", () => {
    it("Ajouter une Taches. - S", (done) => {
        chai.request(server).post('/task').auth(token, { type: 'bearer' }).send({
            archive: true,
            title: "blabla",
            content: "content de Blabla",
            category: 'Discussion',
            start_at: 1,
            finish_at: 1,
            board_id: "66bb1c1b2bbcb76e3c7cacf4",
            status: "Finish",
            user_id: rdm_users(TabUserId),
            created_at: new Date(),
            updated_at: new Date(),
            password: "higuys"
        }).end((err, res) => {
            res.should.have.status(201)
            //  expect(res).to.be.a('object')
            tasks.push(res.body)
            done()
        });
    })
    it("Ajouter une Tache incorrect. (Sans Title) - E", (done) => {
        chai.request(server).post('/task').auth(token, { type: 'bearer' }).send({
            archive: true,
            content: "content de Blabla",
            category: 'Discussion',
            date_start: 1,
            date_end: 1,
            board_id: "66bb1c1b2bbcb76e3c7cacf4",
            status: "Error",
            user_id: rdm_users(TabUserId),
            created_at: new Date(),
            updated_at: new Date(),
            password: "higuys"
        }).end((err, res) => {
            res.should.have.status(405)
            done()
        })
    })
    it("Ajouter une Tache incorrect. (Avec un nom de tache existant) - E", (done) => {
        chai.request(server).post('/task').auth(token, { type: 'bearer' }).send({
            archive: false,
            title: "jetecreepourdestest",
            content: "content de Blabla",
            category: 'Discussion',
            date_start: 8,
            date_end: 10,
            board_id: "66bb1c1b2bbcb76e3c7cacf4", // en attendant d'avoir les bon ids
            status: "Error",
            user_id: rdm_users(TabUserId),
            created_at: new Date(),
            updated_at: new Date(),
        }).end((err, res) => {
            res.should.have.status(405)
            done()
        })
    })
    it("Ajouter une Taches incorrect. (Avec un champ vide) - E", (done) => {
        chai.request(server).post('/task').auth(token, { type: 'bearer' }).send({
            archive: true,
            title: "",
            content: "content de Blabla",
            category: 'Discussion',
            date_start: 1,
            date_end: 1,
            board_id: "66bb1c1b2bbcb76e3c7cacf4", // en attendant d'avoir les bon ids
            status: "Error",
            user_id: rdm_users(TabUserId),
            created_at: new Date(),
            updated_at: new Date(),
            password: "higuys"
        }).end((err, res) => {
            res.should.have.status(405)
            done()
        })
    })
})


describe("POST - /tasks", () => {
    it("Ajouter plusieurs Taches. - S", (done) => {
        chai.request(server).post('/tasks').auth(token, { type: 'bearer' }).send([{
            archive: true,
            title: "blabla",
            content: "content de Blabla",
            category: 'Discussion',
            date_start: 1,
            date_end: 1,
            board_id: "66bb1c1b2bbcb76e3c7cacf4", // en attendant d'avoir les bon ids
            status: "Finish",
            user_id: rdm_users(TabUserId),
            created_at: new Date(),
            updated_at: new Date(),
        },

        {
            archive: true,
            title: "hey ho",
            content: "content de Blabla",
            category: 'Discussion',
            date_start: 1,
            date_end: 1,
            board_id: "66bb1c1b2bbcb76e3c7cacf4", // en attendant d'avoir les bon ids
            status: "Finish",
            user_id: rdm_users(TabUserId),
            created_at: new Date(),
            updated_at: new Date(),
        }]
        ).end((err, res) => {
            res.should.have.status(201)
            tasks = [...tasks, ...res.body]
            done()
        });
    })
    it("Ajouter plusieurs Taches incorrect. - E", (done) => {
        chai.request(server).post('/tasks').auth(token, { type: 'bearer' }).send([
            {
                archive: true,
                title: "blabla",
                date_start: 1,
                date_end: 1,
                board_id: "66bb1c1b2bbcb76e3c7cacf4", // en attendant d'avoir les bon ids
                status: "Finish",
                user_id: rdm_users(TabUserId),
                created_at: new Date(),
                updated_at: new Date(),
            },

            {
                archive: true,
                title: "blabla",
                content: "content de Blabla",
                date_start: 1,
                date_end: 1,
                user_id: rdm_users(TabUserId),
                created_at: new Date(),
                updated_at: new Date(),
            }
        ]).end((err, res) => {
            res.should.have.status(405)
            done()
        })
    })
    it("Ajouter plusieurs Taches incorrect. (Avec un nom de tache existant) - E", (done) => {
        chai.request(server).post('/tasks').auth(token, { type: 'bearer' }).send([{
            archive: false,
            title: "jetecreepourdestest",
            content: "content de Blabla",
            date_start: 8,
            date_end: 10,
            board_id: "66bb1c1b2bbcb76e3c7cacf4", // en attendant d'avoir les bon ids
            status: "Error",
            user_id: rdm_users(TabUserId),
            created_at: new Date(),
            updated_at: new Date(),
        }]).end((err, res) => {
            res.should.have.status(405)
            done()
        })
    })
    it("Ajouter plusieurs Taches incorrect. (Avec un champ vide) - E", (done) => {
        chai.request(server).post('/tasks').auth(token, { type: 'bearer' }).send([{
            archive: false,
            title: "jetecreepourdestest",
            content: "content de Blabla",
            date_start: 8,
            date_end: 10,
            board_id: "", // en attendant d'avoir les bon ids
            status: "Error",
            user_id: rdm_users(TabUserId),
            created_at: new Date(),
            updated_at: new Date(),
        }]).end((err, res) => {
            res.should.have.status(405)
            done()
        })
    })
})

describe('PUT - /task/:id', () => {
    it('Modifier une Tache -S', (done) => {
        chai.request(server).put(`/task/${tasks[0]._id}`).auth(token, { type: 'bearer' }).send({ title: 'Jeanne', content: 'content de la Tache Jeanne' })
            .end((err, res) => {
                res.should.status(200)
                expect(res.body).to.be.a('object')
                done()
            })
    })

    it('Modifier une Tache avec un id non valide -E', (done) => {
        chai.request(server).put('/task/86156100').auth(token, { type: 'bearer' }).send({ firstName: 'Marie', lastName: 'fils' })
            .end((err, res) => {
                res.should.status(405)
                expect(res.body).to.be.a('object')
                done()
            })
    })
    it('Modifier une Tache avec un id invalide -E', (done) => {
        chai.request(server).put('/task/66795a41761cc1544b34b3b6').auth(token, { type: 'bearer' }).send({ firstName: 'emilie', lastname: 'severe' })
            .end((err, res) => {
                res.should.status(404)
                done()
            })
    })
    it('Modifier une Tache avec un champ requis vide -E', (done) => {
        chai.request(server).put(`/task/${tasks[0]._id}`).auth(token, { type: 'bearer' }).send({ title: '', content: 'senerve' })
            .end((err, res) => {
                res.should.status(405)
                done()
            })
    })
})

describe('PUT /tasks', () => {
    it('Modifier plusieurs Taches - S', (done) => {
        chai.request(server).put('/tasks').query({ id: _.map(tasks, '_id') }).auth(token, { type: 'bearer' }).send({ title: 'James' })
            .end((err, res) => {
                res.should.have.status(200);
                expect(res.body).to.be.an('object');
                done();
            });
    })

    it('Modifier plusieurs Taches avec un Id non valide - E', (done) => {
        chai.request(server).put('/tasks').query({ id: ['84655616846865', '84517613'] }).auth(token, { type: 'bearer' }).send({ firstName: 'James' })
            .end((err, res) => {
                res.should.have.status(405);
                expect(res.body).to.be.an('object');
                done();
            });
    })

    it('Modifier plusieurs Taches  avec des ids inexistant- E', (done) => {
        chai.request(server).put('/tasks').query({ id: ['667a698caca06606d0ce8708', '667a699d521dd12877f36ec2'] }).auth(token, { type: 'bearer' }).send({ title: 'James' })
            .end((err, res) => {
                res.should.have.status(404);
                expect(res.body).to.be.an('object');
                done();
            });
    })

    it('Modifier plusieurs Taches  avec un champ requis vide - E', (done) => {
        chai.request(server).put('/tasks').query({ id: _.map(tasks, '_id') }).auth(token, { type: 'bearer' }).send({ title: '' })
            .end((err, res) => {
                res.should.have.status(405);
                expect(res.body).to.be.an('object');
                done();
            });
    })
})

describe('GET - /task/:id', () => {
    it('Rechercher une Tache existant -S', (done) => {
        chai.request(server).get(`/task/${tasks[0]._id}`).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(200);
                expect(res.body).to.be.an('object');
                done();
            });
    });

    it('Rechercher une Tache non valide - E', (done) => {
        const taskId = '145';
        chai.request(server).get(`/task/${taskId}`).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(405);
                done();
            });
    });

    it('Chercher une Tache non trouver - E', (done) => {
        const taskId = '6675723101608233e810e10a';
        chai.request(server).get(`/task/${taskId}`).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(404);
                done();
            });
    });
});

describe('GET - /task', () => {
    it('Chercher une Tache par un champ selectionné -S', (done) => {
        chai.request(server).get('/task').query({ fields: ['content'], values: tasks[0].tasksname }).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.status = (200)
                done()
            })
    })
    it('Chercher une Tache par un champ non autorisé -E', (done) => {
        chai.request(server).get('/task').query({ fields: ['name'], values: tasks[0].tasksname }).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.status = (405)
                done()
            })
    })
    it('Chercher une Tache sans query -E', (done) => {
        chai.request(server).get('/task').auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.status = (405)
                done()
            })
    })
    it('Chercher une Tache inexistant -E', (done) => {
        chai.request(server).get('/task').query({ fields: ['content'], values: 'helloguys' }).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.status = (404)
                done()
            })
    })
})

describe('GET - /tasks_by_filters', () => {
    it('Rechercher des Taches -S', (done) => {
        chai.request(server).get('/tasks_by_filters').query({ page: 1, limit: 2 }).auth(token, { type: 'bearer' })
            .end((err, res) => {

                res.should.have.status(200);
                expect(res.body.results).to.be.an('array');
                done();
            });
    });

    it('Rechercher des Taches avec une query vide -S', (done) => {
        chai.request(server).get('/tasks_by_filters').auth(token, { type: 'bearer' })
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body.results).to.be.an('array');
                expect(res.body.count).to.equal(3);
                done();
            });
    });

    it('Recherher plusieurs Taches avec une chaine de caracteres dans une page -E', (done) => {
        chai.request(server).get('/tasks_by_filters').query({ page: 'une phrase', limit: 3 }).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.status = (405)
                done()
            })
    });
});

describe('GET - /tasks', () => {
    it('Rechercher plusieurs Taches existants -S', (done) => {
        chai.request(server).get('/tasks').query({ id: _.map(tasks, '_id') }).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(200)
                done();
            });
    });

    it('Rechercher plusieurs Taches avec un seul ID', (done) => {
        chai.request(server).get('/tasks').query({ id: ['1458781', '656216532'] }).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(405);
                done();
            });
    });

    it('Rechercher plusieurs Taches inexistants - E', (done) => {
        chai.request(server).get('/tasks').query({ id: ['66792ded5e7a5a2a893297dc', '66792e10e6e3f8af2280bc7d'] }).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(404);
                expect(res.body).to.have.property('type_error', 'no-found');
                done();
            });
    });

    it('Rechercher plusieurs Taches avec IDs non valides - 405', (done) => {
        const taskId = ['invalid-id-format-1', 'invalid-id-format-2'];
        chai.request(server)
            .get('/tasks')
            .query({ id: taskId }).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(405);
                expect(res.body).to.have.property('type_error', 'no-valid');
                done();
            });
    });
});

describe("DELETE - /task", () => {
    it("Supprimer une Tache. - S", (done) => {
        chai.request(server).delete('/task/' + tasks[0]._id).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(200)
                done()
            })
    })
    it("supprimer une Tache incorrect (avec un id inexistant). - E", (done) => {
        chai.request(server).delete('/task/665f18739d3e172be5daf092').auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(404)
                done()
            })
    })
    it("supprimer une Tache incorrect (avec un id invalide). - E", (done) => {
        chai.request(server).delete('/task/123').auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(405)
                done()
            })
    })
})

describe("DELETE - /tasks", () => {
    it("Supprimer plusieurs Taches. - S", (done) => {
        chai.request(server).delete('/tasks').query({ id: _.map(tasks, '_id') }).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(200)
                done()
            })
    })
    it("Supprimer plusieurs Taches incorrects (avec un id inexistant). - E", (done) => {
        chai.request(server).delete('/tasks/665f18739d3e172be5daf092&665f18739d3e172be5daf093').auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(404)
                done()
            })
    })
    it("Supprimer plusieurs Taches incorrects (avec un id invalide). - E", (done) => {
        chai.request(server).delete('/tasks').query({ id: ['123', '456'] }).auth(token, { type: 'bearer' })
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

function rdm_users(tab) {
    var rdm_id = tab[Math.floor(Math.random() * tab.length)];
    return rdm_id;
}