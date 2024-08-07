const TaskService = require('../services/TaskService')

// La fonction permet de connecter un utilisateur.
module.exports.loginUser = function (req, res, next) {
    passport.authenticate('login', { badRequestMessage: "Les champs sont manquants." }, async function (err, user) {
        if (err) {
            res.statusCode = 401
            return res.send({ msg: "Le nom d'utilisateur ou mot de passe est incorrect.", type_error: "no-valid-login" })
        }
        else {
            req.logIn(user, async function (err) {
                if (err) {
                    res.statusCode = 500
                    return res.send({ msg: "Problème d'authentification sur le serveur.", type_error: "internal" })
                }
                else {
                    return res.send(user)
                }
            });
        }
    })(req, res, next)
}

// La fonction permet d'ajouter un utilisateur.
module.exports.addOneTask = function (req, res) {
    req.log.info('Creation d\'une Tache')
    TaskService.addOneTask(req.body, null, function (err, value) {
        if (err && err.type_error == "no-found") {
            res.statusCode = 404
            res.send(err)
        }
        else if (err && err.type_error == "validator") {
            res.statusCode = 405
            res.send(err)
        }
        else if (err && err.type_error == "duplicate") {
            res.statusCode = 405
            res.send(err)
        }
        else {
            res.statusCode = 201
            res.send(value)
        }
    })
}

module.exports.addManyTasks = function (req, res) {
    req.log.info('Creation de plusieurs Taches')
    TaskService.addManyTasks(req.body, null, function (err, value) {
        if (err) {
            res.statusCode = 405
            res.send(err)
        }
        else {
            res.statusCode = 201
            res.send(value)
        }
    })
}

module.exports.findOneTaskById = function (req, res) {

    req.log.info('Rechercher une Tache')
    var opts = { populate: req.query.populate }
    TaskService.findOneTaskById(req.params.id, opts, function (err, value) {
        if (err && err.type_error == "no-found") {
            res.statusCode = 404
            res.send(err)
        }
        else if (err && err.type_error == "no-valid") {
            res.statusCode = 405
            res.send(err)
        }
        else if (err && err.type_error == "error-mongo") {
            res.statusCode = 500
            res.send(err)
        }
        else {
            res.statusCode = 200
            res.send(value)
        }
    })
}

module.exports.findManyTaskByIds = function (req, res) {
    req.log.info('Rechercher plusieurs Taches')
    var arg = req.query.id
    if (arg && !Array.isArray(arg))
        arg = [arg]
    var arg = req.query.id
    if (arg && !Array.isArray(arg))
        arg = [arg]
    var opts = { populate: req.query.populate }

    TaskService.findManyTaskByIds(arg, opts, function (err, value) {
        if (err && err.type_error == "no-found") {
            res.statusCode = 404
            res.send(err)
        }
        else if (err && err.type_error == "no-valid") {
            res.statusCode = 405
            res.send(err)
        }
        else if (err && err.type_error == "error-mongo") {
            res.statusCode = 500
            res.send(err)
        }
        else {
            res.statusCode = 200
            res.send(value)
        }
    })
}

module.exports.findOneTask = function (req, res) {
    req.log.info('Rechercher une Tache avec un champs choisi')
    var arg = req.query.id
    if (arg && !Array.isArray(arg))
        arg = [arg]
    var opts = { populate: req.query.populate }
    TaskService.findOneTask(arg, req.query.value, opts, function (err, value) {
        if (err && err.type_error == "no-found") {
            res.statusCode = 404
            res.send(err)
        }
        else if (err && err.type_error == "validator") {
            res.statusCode = 405
            res.send(err)
        }
        else if (err && err.type_error == "duplicate") {
            res.statusCode = 405
            res.send(err)
        }
        else {
            res.statusCode = 201
            res.send(value)
        }
    })
}

module.exports.findManyTasks = function (req, res) {
    req.log.info('Rechercher des Taches')
    var page = req.query.page
    var limit = req.query.limit
    var search = req.query.q
    var opts = { populate: req.query.populate }
    TaskService.findManyTasks(search, page, limit, opts, function (err, value) {
        if (err && err.type_error == 'no-valid') {
            res.statusCode = (405)
            res.send(err)
        } else if (err && err.type_error == 'error-mongo') {
            res.statusCode = (500)
            res.send(err)
        }
        else {
            res.statusCode = (200)
            res.send(value)
        }
    })
}

module.exports.updateOneTask = function (req, res) {
    req.log.info('Modifier une Tache')
    const taskId = req.params.id;
    const taskData = req.body;

    TaskService.updateOneTask(taskId, taskData, null, function (err, task) {
        if (err && err.type_error == "no-found") {
            res.statusCode = 404
            res.send(err)
        }
        else if (err && (err.type_error == "no-valid" || err && err.type_error == "validator" || err && err.type_error == "duplicate")) {
            res.statusCode = 405
            res.send(err)
        }
        else if (err && err.type_error == "error-mongo") {
            res.statusCode = 500
            res.send(err)
        }
        else {
            res.statusCode = 200
            res.send(task)
        }
    })
}

module.exports.updateManyTasks = function (req, res) {

    req.log.info('Modifier plusieurs Taches')
    var arg = req.query.id
    if (arg && !Array.isArray(arg))
        arg = [arg]
    var updateData = req.body
    TaskService.updateManyTasks(arg, updateData, null, function (err, value) {
        if (err && err.type_error == "no-found") {
            res.statusCode = 404
            res.send(err)
        }
        else if (err && (err.type_error == "no-valid" || err.type_error == "validator" || err.type_error == "duplicate")) {
            res.statusCode = 405
            res.send(err)
        }
        else if (err && err.type_error == "error-mongo") {
            res.statusCode = 500
            res.send(err)
        }
        else {
            res.statusCode = 200
            res.send(value)
        }
    })
}

module.exports.deleteOneTask = function (req, res) {

    req.log.info('Supprimer une Tache')
    TaskService.deleteOneTask(req.params.id, null, function (err, value) {
        if (err && err.type_error == "no-found") {
            res.statusCode = 404
            res.send(err)
        }
        else if (err && err.type_error == "no-valid") {
            res.statusCode = 405
            res.send(err)
        }
        else if (err && err.type_error == "error-mongo") {
            res.statusCode = 500
            res.send(err)
        }
        else {
            res.statusCode = 200
            res.send(value)
        }
    })
}

module.exports.deleteManyTasks = function (req, res) {
    req.log.info('Supprimer plusieurs Taches')
    var arg = req.query.id
    if (arg && !Array.isArray(arg))
        arg = [arg]
    TaskService.deleteManyTasks(arg, null, function (err, value) {
        if (err && err.type_error == "no-found") {
            res.statusCode = 404
            res.send(err)
        }
        else if (err && err.type_error == "no-valid") {
            res.statusCode = 405
            res.send(err)
        }
        else if (err && err.type_error == "error-mongo") {
            res.statusCode = 500
            res.send(err)
        }
        else {
            res.statusCode = 200
            res.send(value)
        }
    })
}