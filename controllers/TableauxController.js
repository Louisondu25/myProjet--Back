const TableService = require('../services/TableService')


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
module.exports.addOneTable = function (req, res) {
    req.log.info('Creation d\'un Table')
    TableService.addOneTable(req.body, null, function (err, value) {
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

module.exports.addManyTables = function (req, res) {
    req.log.info('Creation de plusieurs Tables')
    TableService.addManyTables(req.body, null, function (err, value) {
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

module.exports.findOneTableById = function (req, res) {

    req.log.info('Rechercher un Table')
    var opts = { populate: req.query.populate }
    TableService.findOneTableById(req.params.id, opts, function (err, value) {
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

module.exports.findManyTableByIds = function (req, res) {
    req.log.info('Rechercher plusieurs Tables')
    var arg = req.query.id
    if (arg && !Array.isArray(arg))
        arg = [arg]
    var arg = req.query.id
    if (arg && !Array.isArray(arg))
        arg = [arg]
    var opts = { populate: req.query.populate }

    TableService.findManyTableByIds(arg, opts, function (err, value) {
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

module.exports.findOneTable = function (req, res) {
    req.log.info('Rechercher un Table avec un champs choisi')
    var arg = req.query.id
    if (arg && !Array.isArray(arg))
        arg = [arg]
    var opts = { populate: req.query.populate }
    TableService.findOneTable(arg, req.query.value, opts, function (err, value) {
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

module.exports.findManyTables = function (req, res) {
    req.log.info('Rechercher des Tables')
    var page = req.query.page
    var limit = req.query.limit
    var search = req.query.q
    var opts = { populate: req.query.populate }
    TableService.findManyTables(search, page, limit, opts, function (err, value) {
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

module.exports.updateOneTable = function (req, res) {
    req.log.info('Modifier un Table')
    const tableId = req.params.id;
    const tableData = req.body;

    TableService.updateOneTable(tableId, tableData, null, function (err, table) {
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
            res.send(table)
        }
    })
}

module.exports.updateManyTables = function (req, res) {

    req.log.info('Modifier plusieurs Tables')
    var arg = req.query.id
    if (arg && !Array.isArray(arg))
        arg = [arg]
    var updateData = req.body
    TableService.updateManyTables(arg, updateData, null, function (err, value) {
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

module.exports.deleteOneTable = function (req, res) {

    req.log.info('Supprimer un Table')
    TableService.deleteOneTable(req.params.id, null, function (err, value) {
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

module.exports.deleteManyTables = function (req, res) {
    req.log.info('Supprimer plusieurs Tables')
    var arg = req.query.id
    if (arg && !Array.isArray(arg))
        arg = [arg]
    TableService.deleteManyTables(arg, null, function (err, value) {
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