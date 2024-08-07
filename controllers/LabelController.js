const LabelService = require('../services/LabelService')


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
module.exports.addOneLabel = function (req, res) {
    req.log.info('Creation d\'une Etiquette')
    LabelService.addOneLabel(req.body, null, function (err, value) {
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

module.exports.addManyLabels = function (req, res) {
    req.log.info('Creation de plusieurs Etiquettes')
    LabelService.addManyLabels(req.body, null, function (err, value) {
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

module.exports.findOneLabelById = function (req, res) {

    req.log.info('Rechercher une Etiquette')
    var opts = { populate: req.query.populate }
    LabelService.findOneLabelById(req.params.id, opts, function (err, value) {
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

module.exports.findManyLabels = function (req, res) {
    req.log.info('Rechercher plusieurs Etiquettes')
    var arg = req.query.id
    if (arg && !Array.isArray(arg))
        arg = [arg]
    var arg = req.query.id
    if (arg && !Array.isArray(arg))
        arg = [arg]
    var opts = { populate: req.query.populate }

    LabelService.findManyLabels(arg, opts, function (err, value) {
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

module.exports.findOneLabel = function (req, res) {
    req.log.info('Rechercher une Etiquette avec un champs choisi')
    var arg = req.query.id
    if (arg && !Array.isArray(arg))
        arg = [arg]
    var opts = { populate: req.query.populate }
    LabelService.findOneLabel(arg, req.query.value, opts, function (err, value) {
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

module.exports.findManyLabels = function (req, res) {
    req.log.info('Rechercher des Etiquettes')
    var page = req.query.page
    var limit = req.query.limit
    var search = req.query.q
    var opts = { populate: req.query.populate }
    LabelService.findManyLabels(search, page, limit, opts, function (err, value) {
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

module.exports.updateOneLabel = function (req, res) {
    req.log.info('Modifier une Etiquette')
    const labelId = req.params.id;
    const labelData = req.body;

    LabelService.updateOneLabel(labelId, labelData, null, function (err, label) {
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
            res.send(label)
        }
    })
}

module.exports.updateManyLabels = function (req, res) {

    req.log.info('Modifier plusieurs Etiquettes')
    var arg = req.query.id
    if (arg && !Array.isArray(arg))
        arg = [arg]
    var updateData = req.body
    LabelService.updateManyLabels(arg, updateData, null, function (err, value) {
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

module.exports.deleteOneLabel = function (req, res) {

    req.log.info('Supprimer une Etiquette')
    LabelService.deleteOneLabel(req.params.id, null, function (err, value) {
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

module.exports.deleteManyLabels = function (req, res) {
    req.log.info('Supprimer plusieurs Etiquettes')
    var arg = req.query.id
    if (arg && !Array.isArray(arg))
        arg = [arg]
    LabelService.deleteManyLabels(arg, null, function (err, value) {
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