const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('./../../server')
const UserService = require('../../services/UserService')
const _ = require('lodash')
const id_user = "6683f4120531895b2aac801f"
var     comments = []
var user = null
var token = ''

var expect = chai.expect
var should = chai.should()

chai.use(chaiHttp)

var users = [
    {
        firstName: "detenteur  du commentaire 1",
        lastName: "Iencli",
        username: "oui1",
        email: "Iencli@gmail.com",
        password: "higuys",
        age: 10,
        phone_Number: "15415215"
    },
    {
        firstName: "detenteur  du commentaire 2",
        lastName: "Iencli",
        username: "oui2",
        email: "Iencli2@gmail.com",
        password: "higuys",
        age: 10,
        phone_Number: "15415215"
    }, {
        firstName: "detenteur  du commentaire 3",
        lastName: "Iencli",
        username: "oui3",
        email: "Iencli3@gmail.com",
        password: "higuys",
        age: 10,
        phone_Number: "15415215"
    },
    {
        firstName: "detenteur  du commentaire 4",
        lastName: "Iencli",
        username: "oui4",
        email: "Iencli4@gmail.com",
        password: "higuys",
        age: 10,
        phone_Number: "15415215"
    },
    {
        firstName: "detenteur  du commentaire 5",
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
            TabUsersId = _.map(value, '_id')
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

describe("POST - /comment", () => {
    it("Ajouter un Commentaire. - S", (done) => {
        chai.request(server).post('/comment').auth(token, { type: 'bearer' }).send({
            text: "Prendre de la creme solaire",
            date: 1,
            status: 'Infos',
            user_id: rdm_users(TabUsersId),
            task_id: '66bc7e4d639d08dee594f348',
            created_at: new Date(),
            updated_at: new Date(),
        }).end((err, res) => {
            res.should.have.status(201)
            //  expect(res).to.be.a('object')
            comments.push(res.body)
            done()
        });
    })
    it("Ajouter un Commentaire incorrect. (Sans Text) - E", (done) => {
        chai.request(server).post('/comment').auth(token, { type: 'bearer' }).send({
            date: 1,
            status: 'Error',
            user_id: rdm_users(TabUsersId),
            task_id: '66bc7e4d639d08dee594f348',
            created_at: new Date(),
            updated_at: new Date(),
        }).end((err, res) => {
            res.should.have.status(405)
            done()
        })
    })
    it("Ajouter un Commentaire incorrect. (Avec un champ vide) - E", (done) => {
        chai.request(server).post('/comment').auth(token, { type: 'bearer' }).send({
            text: "",
            date: 1,
            status: 'Error',
            user_id: rdm_users(TabUsersId),
            task_id: '66bc7e4d639d08dee594f348',
            created_at: new Date(),
            updated_at: new Date(),
        }).end((err, res) => {
            res.should.have.status(405)
            done()
        })
    })
})

describe("POST - /comments", () => {
    it("Ajouter plusieurs Commentaires. - S", (done) => {
        chai.request(server).post('/comments').auth(token, { type: 'bearer' }).send([{
            text: "Prendre de la creme solaire",
            date: 1,
            status: 'Infos',
            user_id: rdm_users(TabUsersId),
            task_id: '66bc7e4d639d08dee594f348',
            created_at: new Date(),
            updated_at: new Date(),
        },

        {
            text: "Prendre un ballon",
            date: 1,
            status: 'Infos',
            user_id: rdm_users(TabUsersId),
            task_id: '66bc7e4d639d08dee594f348',
            created_at: new Date(),
            updated_at: new Date(),
        }]
        ).end((err, res) => {
            res.should.have.status(201)
            comments = [...comments, ...res.body]
            done()
        });
    })
    it("Ajouter plusieurs Commentaires incorrect. - E", (done) => {
        chai.request(server).post('/comments').auth(token, { type: 'bearer' }).send([
            {
                text: "Prendre de la creme solaire",
                status: 'Infos',
                user_id: rdm_users(TabUsersId),
                task_id: '66bc7e4d639d08dee594f348',
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                date: 1,
                status: 'Infos',
                user_id: rdm_users(TabUsersId),
                task_id: '66bc7e4d639d08dee594f348',
                created_at: new Date(),
                updated_at: new Date(),
            }
        ]).end((err, res) => {
            res.should.have.status(405)
            done()
        })
    })
    it("Ajouter plusieurs Commentaires incorrect. (Avec un champ vide) - E", (done) => {
        chai.request(server).post('/comments').auth(token, { type: 'bearer' }).send([{
            text: "Prendre de la creme solaire",
            date: 1,
            status: '',
            user_id: rdm_users(TabUsersId),
            task_id: '66bc7e4d639d08dee594f348',
            created_at: new Date(),
            updated_at: new Date(),
        }]).end((err, res) => {
            res.should.have.status(405)
            done()
        })
    })
})

describe('PUT - /comment/:id', () => {
    it('Modifier un Commentaire -S', (done) => {
        chai.request(server).put(`/comment/${comments[0]._id}`).auth(token, { type: 'bearer' }).send({ text: 'Jeanne', date: 1 })
            .end((err, res) => {
                res.should.status(200)
                expect(res.body).to.be.a('object')
                done()
            })
    })

    it('Modifier un Commentaire avec un id non valide -E', (done) => {
        chai.request(server).put('/comment/86156100').auth(token, { type: 'bearer' }).send({ text: 'Marie', date: 1 })
            .end((err, res) => {
                res.should.status(405)
                expect(res.body).to.be.a('object')
                done()
            })
    })
    it('Modifier un Commentaire avec un id invalide -E', (done) => {
        chai.request(server).put('/comment/66795a41761cc1544b34b3b6').auth(token, { type: 'bearer' }).send({ firstName: 'emilie', lastname: 'severe' })
            .end((err, res) => {
                res.should.status(404)
                done()
            })
    })
    it('Modifier un Commentaire avec un champ requis vide -E', (done) => {
        chai.request(server).put(`/comment/${comments[0]._id}`).auth(token, { type: 'bearer' }).send({ text: '', date: 1 })
            .end((err, res) => {
                res.should.status(405)
                done()
            })
    })
})

describe('PUT /comments', () => {
    it('Modifier plusieurs Commentaires - S', (done) => {
        chai.request(server).put('/comments').query({ id: _.map(comments, '_id') }).auth(token, { type: 'bearer' }).send({ text: 'James' })
            .end((err, res) => {
                res.should.have.status(200);
                expect(res.body).to.be.an('object');
                done();
            });
    })

    it('Modifier plusieurs Commentaires avec un Id non valide - E', (done) => {
        chai.request(server).put('/comments').query({ id: ['84655616846865', '84517613'] }).auth(token, { type: 'bearer' }).send()
            .end((err, res) => {
                res.should.have.status(405);
                expect(res.body).to.be.an('object');
                done();
            });
    })

    it('Modifier plusieurs Comentaires  avec des ids inexistant- E', (done) => {
        chai.request(server).put('/comments').query({ id: ['667a698caca06606d0ce8708', '667a699d521dd12877f36ec2'] }).auth(token, { type: 'bearer' }).send({ text: 'James' })
            .end((err, res) => {
                res.should.have.status(404);
                expect(res.body).to.be.an('object');
                done();
            });
    })

    it('Modifier plusieurs Commentaires  avec un champ requis vide - E', (done) => {
        chai.request(server).put('/comments').query({ id: _.map(comments, '_id') }).auth(token, { type: 'bearer' }).send({ text: '' })
            .end((err, res) => {
                res.should.have.status(405);
                expect(res.body).to.be.an('object');
                done();
            });
    })
})

describe('GET - /comment/:id', () => {
    it('Rechercher un Commentaire existant -S', (done) => {
        chai.request(server).get(`/comment/${comments[0]._id}`).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(200);
                expect(res.body).to.be.an('object');
                done();
            });
    });

    it('Rechercher un Commentaire non valide - E', (done) => {
        const boardId = '145';
        chai.request(server).get(`/comment/${boardId}`).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(405);
                done();
            });
    });

    it('Chercher un Commentaire non trouver - E', (done) => {
        const boardId = '6675723101608233e810e10a';
        chai.request(server).get(`/comment/${boardId}`).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(404);
                done();
            });
    });
});

describe('GET - /comment', () => {
    it('Chercher un Commentaire par un champ selectionné -S', (done) => {
        chai.request(server).get('/comment').query({ fields: ['description'], values: comments[0].commentname }).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.status = (200)
                done()
            })
    })
    it('Chercher un Commentaire par un champ non autorisé -E', (done) => {
        chai.request(server).get('/comment').query({ fields: ['name'], values: comments[0].commentname }).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.status = (405)
                done()
            })
    })
    it('Chercher un Commentaire sans query -E', (done) => {
        chai.request(server).get('/comment').auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.status = (405)
                done()
            })
    })
    it('Chercher un Commentaire inexistant -E', (done) => {
        chai.request(server).get('/comment').query({ fields: ['description'], values: 'helloguys' }).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.status = (404)
                done()
            })
    })
})

describe('GET - /comments_by_filters', () => {
    it('Rechercher des Commentaires -S', (done) => {
        chai.request(server).get('/comments_by_filters').query({ page: 1, limit: 2 }).auth(token, { type: 'bearer' })
            .end((err, res) => {

                res.should.have.status(200);
                expect(res.body.results).to.be.an('array');
                done();
            });
    });

    it('Rechercher des Commentaires avec une query vide -S', (done) => {
        chai.request(server).get('/comments_by_filters').auth(token, { type: 'bearer' })
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body.results).to.be.an('array');
                expect(res.body.count).to.equal(3);
                done();
            });
    });

    it('Recherher plusieurs Commentaires avec une chaine de caracteres dans une page -E', (done) => {
        chai.request(server).get('/comments_by_filters').query({ page: 'une phrase', limit: 3 }).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.status = (405)
                done()
            })
    });
});

describe('GET - /comments', () => {
    it('Rechercher plusieurs Commentaires existants -S', (done) => {
        chai.request(server).get('/comments').query({ id: _.map(comments, '_id') }).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(200)
                done();
            });
    });

    it('Rechercher plusieurs Commentaires avec un seul ID', (done) => {
        chai.request(server).get('/comments').query({ id: ['1458781', '656216532'] }).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(405);
                done();
            });
    });

    it('Rechercher plusieurs Cmmentaires inexistants - E', (done) => {
        chai.request(server).get('/comments').query({ id: ['66792ded5e7a5a2a893297dc', '66792e10e6e3f8af2280bc7d'] }).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(404);
                expect(res.body).to.have.property('type_error', 'no-found');
                done();
            });
    });

    it('Rechercher plusieurs Commentaires avec IDs non valides - 405', (done) => {
        const boardIds = ['invalid-id-format-1', 'invalid-id-format-2'];
        chai.request(server)
            .get('/comments')
            .query({ id: boardIds }).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(405);
                expect(res.body).to.have.property('type_error', 'no-valid');
                done();
            });
    });
});

describe("DELETE - /comment", () => {
    it("Supprimer un Commentaire. - S", (done) => {
        chai.request(server).delete('/comment/' + comments[0]._id).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(200)
                done()
            })
    })
    it("supprimer un Commentaire incorrect (avec un id inexistant). - E", (done) => {
        chai.request(server).delete('/comment/665f18739d3e172be5daf092').auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(404)
                done()
            })
    })
    it("supprimer un Commentaire incorrect (avec un id invalide). - E", (done) => {
        chai.request(server).delete('/comment/123').auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(405)
                done()
            })
    })
})

describe("DELETE - /comments", () => {
    it("Supprimer plusieurs Commentaires. - S", (done) => {
        chai.request(server).delete('/comments').query({ id: _.map(comments, '_id') }).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(200)
                done()
            })
    })
    it("Supprimer plusieurs Commentaires incorrects (avec un id inexistant). - E", (done) => {
        chai.request(server).delete('/comments/665f18739d3e172be5daf092&665f18739d3e172be5daf093').auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(404)
                done()
            })
    })
    it("Supprimer plusieurs Commentaires incorrects (avec un id invalide). - E", (done) => {
        chai.request(server).delete('/Comments').query({ id: ['123', '456'] }).auth(token, { type: 'bearer' })
            .end((err, res) => {
                res.should.have.status(405)
                done()
            })
    })
})

describe('Gestion des utilisateurs.', () => {
    it('Supprimer des Utilisateurs fictifs', (done) => {
        UserService.deleteManyUsers(TabUsersId, null, function (err, value) {
            done()
        })
    })
})