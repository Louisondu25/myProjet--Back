const DashBoard = require("../schemas/DashBoard");
const _ = require("lodash");
const async = require("async");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

var Board = mongoose.model("Board", DashBoard);

module.exports.loginUser = async function (username, password, options, callback) {
    module.exports.findOneUser(['name', 'description'], username, null, async (err, value) => {
        if (err)
            callback(err)
        else {
            if (bcrypt.compareSync(password, value.password)) {
                var token = TokenUtils.createToken({ _id: value._id }, null)
                callback(null, { ...value, token: token })
            }
            else {
                callback({ msg: "La comparaison des mots de passe est fausse.", type_error: "no-comparaison" })
            }
        }
    })
}

module.exports.addOneBoard = async function (board, options, callback) {
    try {
        var new_board = new Board(board);
        var error = new_board.validateSync();
        if (error) {
            error = error['errors'];
            var text = Object.keys(error).map((e) => {
                return error[e]['properties'] ? error[e]['properties']['message'] : String(error[e]['reason']);
            }).join(' ');
            var fields = _.transform(Object.keys(error), function (result, value) {
                result[value] = error[value]['properties'] ? error[value]['properties']['message'] : String(error[value]['reason']);
            }, {});
            var err = {
                msg: text,
                fields_with_error: Object.keys(error),
                fields: fields,
                type_error: "validator"
            };
            callback(err);
        } else {
            await new_board.save();
            callback(null, new_board.toObject());
        }
    } catch (error) {
        if (error.code === 11000) { // Erreur de duplicité
            var field = Object.keys(error.keyValue)[0];
            var err = {
                msg: `Duplicate key error: ${field} must be unique.`,
                fields_with_error: [field],
                fields: { [field]: `The ${field} is already taken.` },
                type_error: "duplicate"
            };
            callback(err);
        } else {
            callback(error); // Autres erreurs
        }
    }
};

module.exports.addManyBoards = async function (boards, options, callback) {
    var errors = [];


    // Vérifier les erreurs de validation
    for (var i = 0; i < boards.length; i++) {
        var board = boards[i];
        var new_board = new Board(board);
        var error = new_board.validateSync();
        if (error) {
            error = error['errors'];
            var text = Object.keys(error).map((e) => {
                return error[e]['properties']['message'];
            }).join(' ');
            var fields = _.transform(Object.keys(error), function (result, value) {
                result[value] = error[value]['properties']['message'];
            }, {});
            errors.push({
                msg: text,
                fields_with_error: Object.keys(error),
                fields: fields,
                index: i,
                type_error: "validator"
            });
        }
    }

    if (errors.length > 0) {
        callback(errors);
    } else {
        try {
            // Tenter d'insérer les utilisateurs
            const data = await Board.insertMany(boards, { ordered: false });
            callback(null, data);
        } catch (error) {
            if (error.code === 11000) { // Erreur de duplicité
                const duplicateErrors = error.writeErrors.map(err => {
                    //const field = Object.keys(err.keyValue)[0];
                    const field = err.err.errmsg.split(" dup key: { ")[1].split(':')[0].trim();
                    return {
                        msg: `Duplicate key error: ${field} must be unique.`,
                        fields_with_error: [field],
                        fields: { [field]: `The ${field} is already taken.` },
                        index: err.index,
                        type_error: "duplicate"
                    };
                });
                callback(duplicateErrors);
            } else {
                callback(error); // Autres erreurs
            }
        }
    }
};

module.exports.findOneBoardById = function (board_id, options, callback) {
    var opts = { populate: options && options.populate ? [user_Id] : [] }
    if (board_id && mongoose.isValidObjectId(board_id)) {
        Board.findById(board_id, null, opts)
            .then((value) => {
                try {
                    if (value) {
                        callback(null, value.toObject());
                    } else {
                        callback({
                            msg: "Aucun Tableau trouvé.", type_error: "no-found",
                        });
                    }
                } catch (e) {

                }
            })
            .catch((err) => {
                callback({
                    msg: "Impossible de chercher l'élément.", type_error: "error-mongo",
                });
            });
    } else {
        callback({ msg: "ObjectId non conforme.", type_error: "no-valid" });
    }
};

module.exports.findOneBoard = function findOneBoard(fields, value, options, callback) {
    const allowedFields = ['name', 'price', 'title'];
    const populateOptions = options && options.populate ? [user_Id] : [];

    if (!fields || !Array.isArray(fields)) {
        return callback({ msg: 'Invalid search fields', type_error: 'invalid-input' });
    }

    const invalidFields = fields.filter((field) => !allowedFields.includes(field));
    if (invalidFields.length > 0) {
        return callback({
            msg: `Invalid search fields: ${invalidFields.join(', ')}`,
            type_error: 'invalid-input',
            invalidFields,
        });
    }

    if (!value) {
        return callback({ msg: 'Search value is required', type_error: 'invalid-input' });
    }

    const searchQuery = fields.reduce((acc, field) => {
        acc[field] = value;
        return acc;
    }, {});

    Board.findOne(searchQuery, null, { populate: populateOptions })
        .then((board) => {
            if (board) {
                return callback(null, board.toObject());
            } else {
                return callback({ msg: 'Board not found', type_error: 'not-found' });
            }
        })
        .catch((err) => {
            return callback({ msg: 'Internal MongoDB error', type_error: 'mongodb-error', err });
        });
};

module.exports.findManyBoardByIds = function (boards_id, options, callback) {
    var opts = { populate: (options && options.populate ? [user_Id] : []), lean: true }
    if (
        boards_id && Array.isArray(boards_id) && boards_id.length > 0 && boards_id.filter((e) => {
            return mongoose.isValidObjectId(e);
        }).length == boards_id.length
    ) {
        boards_id = boards_id.map((e) => {
            return new ObjectId(e);
        });
        Board.find({ _id: boards_id }, null, opts)
            .then((value) => {
                try {
                    if (value && Array.isArray(value) && value.length != 0) {
                        callback(null, value);
                    } else {
                        callback({
                            msg: "Aucun utilisateur trouvé.",
                            type_error: "no-found",
                        });
                    }
                } catch (e) {

                    callback(e)
                }
            })
            .catch((err) => {
                callback({
                    msg: "Impossible de chercher l'élément.",
                    type_error: "error-mongo",
                });
            });
    } else if (
        boards_id &&
        Array.isArray(boards_id) &&
        boards_id.length > 0 &&
        boards_id.filter((e) => {
            return mongoose.isValidObjectId(e);
        }).length != boards_id.length
    ) {
        callback({
            msg: "Tableau non conforme plusieurs éléments ne sont pas des ObjectId.",
            type_error: "no-valid",
            fields: boards_id.filter((e) => {
                return !mongoose.isValidObjectId(e);
            }),
        });
    } else if (boards_id && !Array.isArray(boards_id)) {
        callback({
            msg: "L'argement n'est pas un tableau.",
            type_error: "no-valid",
        });
    } else {
        callback({ msg: "Tableau non conforme.", type_error: "no-valid" });
    }
};
module.exports.findManyBoards = function (search, page, limit, options, callback) {
    page = !page ? 1 : parseInt(page)
    limit = !limit ? 1 : parseInt(limit)
    var populate = (options && options.populate ? ['user_id'] : [])

    if (typeof page !== "number" || typeof limit !== "number" || isNaN(page) || isNaN(limit)) {
        callback({ msg: `format de ${typeof page !== "number" ? "page" : "limit"} est incorrect`, type_error: "no-valid" })
    } else {
        var query_mongo = search ? {
            $or: _.map(['title', 'description', 'index'], (e) => {
                return { [e]: { $regex: search, $options: 'i' } };
            })
        } : {};

        Board.countDocuments(query_mongo).then((value) => {
            if (value > 0) {
                const skip = ((page - 1) * limit)
                Board.find(query_mongo, null, { skip: skip, limit: limit, populate: populate, lean: true }).then((results) => {
                    callback(null, {
                        count: value,
                        results: results
                    })
                })
            } else {
                callback(null, { count: 0, results: [] })
            }
        }).catch((e) => {
            callback(e)
        })
    }
}


module.exports.updateOneBoard = function (board_id, update, options, callback) {
    if (board_id && mongoose.isValidObjectId(board_id)) {
        Board.findByIdAndUpdate(new ObjectId(board_id), update, {
            returnDocument: "after",
            runValidators: true,
        })
            .then((value) => {
                try {
                    // callback(null, value.toObject());
                    if (value) {
                        callback(null, value.toObject())
                    } else {
                        callback({ msg: "Tableau non trouvé.", type_error: "no-found" });
                    }
                } catch (e) {

                    callback(e);
                }
            })
            .catch((errors) => {
                if (errors.code == 11000) {
                    var field = Object.keys(errors.keyPattern)[0]
                    const duplicateErrors = {
                        msg: `Duplicate key error: ${field} must be unique.`,
                        fields_with_error: [field],
                        fields: { [field]: `The ${field} is already taken.` },
                        type_error: 'duplicate'
                    }
                    callback(duplicateErrors)
                } else {
                    errors = errors["errors"];
                    var text = Object.keys(errors)
                        .map((e) => {
                            return errors[e]["properties"]["message"];
                        })
                        .join(" ");
                    var fields = _.transform(
                        Object.keys(errors),
                        function (result, value) {
                            result[value] = errors[value]["properties"]["message"];
                        },
                        {}
                    );
                }
                var err = {
                    msg: text,
                    fields_with_error: Object.keys(errors),
                    fields: fields,
                    type_error: "validator",
                };
                callback(err);
            });
    } else {
        callback({ msg: "Id invalide.", type_error: "no-valid" });
    }
};

module.exports.updateManyBoards = function (boards_id, update, options, callback) {
    if (typeof boards_id === 'object' && Array.isArray(boards_id) && boards_id.length > 0 && boards_id.filter((e) => { return mongoose.isValidObjectId(e) }).length == boards_id.length) {
        boards_id = boards_id.map((e) => {
            return new ObjectId(e);
        });
        Board.updateMany({ _id: { $in: boards_id } }, update, { runValidators: true })
            .then((value) => {
                try {
                    if (value && value.matchedCount != 0) {
                        callback(null, value);
                    } else {
                        callback({ msg: 'Utilisateurs non trouvé', type_error: 'no-found' })
                    }
                } catch (e) {

                    callback(e);
                }
            })
            .catch((errors) => {
                if (errors.code == 11000) {
                    var field = Object.keys(errors.keyPattern)[0]
                    const duplicateErrors = {
                        msg: `Duplicate key error: ${field} must be unique.`,
                        fields_with_error: [field],
                        index: errors.index,
                        fields: { [field]: `The ${field} is already taken.` },
                        type_error: 'duplicate'
                    }
                    callback(duplicateErrors)
                } else {
                    errors = errors["errors"];
                    var text = Object.keys(errors)
                        .map((e) => {
                            return errors[e]["properties"]["message"];
                        })
                        .join(" ");
                    var fields = _.transform(
                        Object.keys(errors),
                        function (result, value) {
                            result[value] = errors[value]["properties"]["message"];
                        },
                        {}
                    );
                }
                var err = {
                    msg: text,
                    fields_with_error: Object.keys(errors),
                    fields: fields,
                    type_error: "validator",
                };
                callback(err);
            });
    } else {
        callback({ msg: "Id invalide.", type_error: "no-valid" });
    }
};

module.exports.deleteOneBoard = function (board_id, options, callback) {
    if (board_id && mongoose.isValidObjectId(board_id)) {
        Board.findByIdAndDelete(board_id)
            .then((value) => {
                try {
                    if (value) callback(null, value.toObject());
                    else
                        callback({
                            msg: "Tableau non trouvé.", type_error: "no-found",
                        });
                } catch (e) {

                    callback(e);
                }
            })
            .catch((e) => {
                callback({
                    msg: "Impossible de chercher l'élément.",
                    type_error: "error-mongo",
                });
            });
    } else {
        callback({ msg: "Id invalide.", type_error: "no-valid" });
    }
};

module.exports.deleteManyBoards = function (boards_id, options, callback) {
    if (boards_id && Array.isArray(boards_id) && boards_id.length > 0 && boards_id.filter((e) => {
        return mongoose.isValidObjectId(e);
    }).length == boards_id.length) {
        boards_id = boards_id.map((e) => {
            return new ObjectId(e);
        });
        Board.deleteMany({ _id: boards_id })
            .then((value) => {
                callback(null, value );
            })
            .catch((err) => { 
                callback({
                    msg: "Erreur mongo suppression.",
                    type_error: "error-mongo",
                });
            });
    } else {
        callback({ msg: "Tableau d'id invalide.", type_error: "no-valid" });
    }
};