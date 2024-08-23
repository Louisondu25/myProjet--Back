const AstuceService = require('../services/AstuceService')


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
module.exports.addOneAstuce = function (req, res) {
    req.log.info('Creation d\'un Astuce')
    AstuceService.addOneAstuce(req.body, null, function (err, value) {
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

module.exports.addManyAstuces = function (req, res) {
    req.log.info('Creation de plusieurs Astuces')
    AstuceService.addManyAstuces(req.body, null, function (err, value) {
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

module.exports.findOneAstuceById = function (req, res) {

    req.log.info('Rechercher un Astuce')
    var opts = { populate: req.query.populate }
    AstuceService.findOneAstuceById(req.params.id, opts, function (err, value) {
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

module.exports.findManyAstuceByIds = function (req, res) {
    req.log.info('Rechercher plusieurs Astuces')
    var arg = req.query.id
    if (arg && !Array.isArray(arg))
        arg = [arg]
    var arg = req.query.id
    if (arg && !Array.isArray(arg))
        arg = [arg]
    var opts = { populate: req.query.populate }

    AstuceService.findManyAstuceByIds(arg, opts, function (err, value) {
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

module.exports.findOneAstuce = function (req, res) {
    req.log.info('Rechercher un Astuce avec un champs choisi')
    var arg = req.query.id
    if (arg && !Array.isArray(arg))
        arg = [arg]
    var opts = { populate: req.query.populate }
    AstuceService.findOneAstuce(arg, req.query.value, opts, function (err, value) {
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

module.exports.findManyAstuces = function (req, res) {
    req.log.info('Rechercher des Astuces')
    var page = req.query.page
    var limit = req.query.limit
    var search = req.query.q
    var opts = { populate: req.query.populate }
    AstuceService.findManyAstuces(search, page, limit, opts, function (err, value) {
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

module.exports.updateOneAstuce = function (req, res) {
    req.log.info('Modifier un Astuce')
    const astuceId = req.params.id;
    const astuceData = req.body;

    AstuceService.updateOneAstuce(astuceId, astuceData, null, function (err, astuce) {
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
            res.send(astuce)
        }
    })
}

module.exports.updateManyAstuces = function (req, res) {

    req.log.info('Modifier plusieurs Astuces')
    var arg = req.query.id
    if (arg && !Array.isArray(arg))
        arg = [arg]
    var updateData = req.body
    AstuceService.updateManyAstuces(arg, updateData, null, function (err, value) {
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

module.exports.deleteOneAstuce = function (req, res) {

    req.log.info('Supprimer un Astuce')
    AstuceService.deleteOneAstuce(req.params.id, null, function (err, value) {
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

module.exports.deleteManyAstuces = function (req, res) {
    req.log.info('Supprimer plusieurs Astuces')
    var arg = req.query.id
    if (arg && !Array.isArray(arg))
        arg = [arg]
    AstuceService.deleteManyAstuces(arg, null, function (err, value) {
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