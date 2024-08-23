const TableSchema = require("../schemas/Table");
const _ = require("lodash");
const async = require("async");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

var Table = mongoose.model("Table", TableSchema);

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

module.exports.addOneTable = async function (table, options, callback) {
    try {
        var new_table = new Table(table);
        var errors = new_table.validateSync();
        // console.log(errors)
        if (errors) {
            errors = errors['errors'];
            var text = Object.keys(errors).map((e) => {
                return errors[e]['properties']['message'];
            }).join(' ');
            var fields = _.transform(Object.keys(errors), function (result, value) {
                result[value] = errors[value]['properties']['message'];
            }, {});
            var err = {
                msg: text,
                fields_with_error: Object.keys(errors),
                fields: fields,
                type_error: "validator"
            };
            callback(err);
        } else {
            await new_table.save();
            callback(null, new_table.toObject());
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

module.exports.addManyTables = async function (tables, options, callback) {
    var errors = [];


    // Vérifier les erreurs de validation
    for (var i = 0; i < tables.length; i++) {
        var table = tables[i];
        var new_table = new Table(table);
        var error = new_table.validateSync();
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
            const data = await Table.insertMany(tables, { ordered: false });
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

module.exports.findOneTableById = function (table_id, options, callback) {
    var opts = { populate: options && options.populate ? [user_Id] : [] }
    if (table_id && mongoose.isValidObjectId(table_id)) {
        Table.findById(table_id, null, opts)
            .then((value) => {
                try {
                    if (value) {
                        callback(null, value.toObject());
                    } else {
                        callback({
                            msg: "Aucun Table trouvé.", type_error: "no-found",
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

module.exports.findOneTable = function (tab_field, value, options, callback) {
    var field_unique = ['name', 'price']
    var opts = { populate: options && options.populate ? [user_Id] : [] }

    if (tab_field && Array.isArray(tab_field) && value && _.filter(tab_field, (e) => {
        return field_unique.indexOf(e) == -1;
    }).length == 0) {
        var obj_find = []
        _.forEach(tab_field, (e) => {
            obj_find.push({ [e]: value })
        })
        Table.findOne({ $or: obj_find }, null, opts).then((value) => {
            if (value) {
                callback(null, value.toObject())
            } else {
                callback({ msg: 'Tables non trouvé.', type_error: 'no-found' })
            }
        }).catch((err) => {
            callback({ msg: 'Erreur interne Mongo', type_error: 'error-mongo' })
        })
    }
    else {
        var msg = ''
        if (!tab_field || !Array.isArray(tab_field)) {
            msg += 'Les champs de recherches sont incorrecte'
        }
        if (!value) {
            msg += msg ? 'Et la valeur de recherche est vide' : 'la valeur de recherche est vide'
        }
        if (_.filter(tab_field, (e) => { return field_unique.indexOf(e) === -1 }).length > 0) {
            var field_not_autorized = _.filter(tab_field, (e) => { return field_unique.indexOf(e) === -1 })
            msg += msg ? ` Et ${field_not_autorized.join(', ')}` : `Les champs ${field_not_autorized.join(', ')} ne sont pas des champs de recherche autorisés`
            callback({ msg: msg, type_error: 'no-valid', field_not_autorized: field_not_autorized })
        } else {
            callback({ msg: msg, type_error: 'no-valid' })
        }
    }
}

module.exports.findManyTableByIds = function (tables_id, options, callback) {
    var opts = { populate: (options && options.populate ? [user_Id] : []), lean: true }
    if (
        tables_id && Array.isArray(tables_id) && tables_id.length > 0 && tables_id.filter((e) => {
            return mongoose.isValidObjectId(e);
        }).length == tables_id.length
    ) {
        tables_id = tables_id.map((e) => {
            return new ObjectId(e);
        });
        Table.find({ _id: tables_id }, null, opts)
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
        tables_id &&
        Array.isArray(tables_id) &&
        tables_id.length > 0 &&
        tables_id.filter((e) => {
            return mongoose.isValidObjectId(e);
        }).length != tables_id.length
    ) {
        callback({
            msg: "Tableau non conforme plusieurs éléments ne sont pas des ObjectId.",
            type_error: "no-valid",
            fields: tables_id.filter((e) => {
                return !mongoose.isValidObjectId(e);
            }),
        });
    } else if (tables_id && !Array.isArray(tables_id)) {
        callback({
            msg: "L'argement n'est pas un tableau.",
            type_error: "no-valid",
        });
    } else {
        callback({ msg: "Tableau non conforme.", type_error: "no-valid" });
    }
};

module.exports.findManyTables = function (search, page, limit, options, callback) {
    page = !page ? 1 : parseInt(page)
    limit = !limit ? 1 : parseInt(limit)
    var populate = (options && options.populate ? ['user_id'] : [])

    if (typeof page !== "number" || typeof limit !== "number" || isNaN(page) || isNaN(limit)) {
        callback({ msg: `format de ${typeof page !== "number" ? "page" : "limit"} est incorrect`, type_error: "no-valid" })
    } else {
        var query_mongo = search ? {
            $or: _.map(['name', 'description', 'price', 'quantity'], (e) => {
                return { [e]: { $regex: search, $options: 'i' } };
            })
        } : {};
        Table.countDocuments(query_mongo).then((value) => {
            if (value > 0) {
                const skip = ((page - 1) * limit)
                Table.find(query_mongo, null, { skip: skip, limit: limit, populate: populate, lean: true }).then((results) => {
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

module.exports.updateOneTable = function (table_id, update, options, callback) {
    if (table_id && mongoose.isValidObjectId(table_id)) {
        Table.findByIdAndUpdate(new ObjectId(table_id), update, {
            returnDocument: "after",
            runValidators: true,
        })
            .then((value) => {
                try {
                    // callback(null, value.toObject());
                    if (value) {
                        callback(null, value.toObject())
                    } else {
                        callback({ msg: "Table non trouvé.", type_error: "no-found" });
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

module.exports.updateManyTables = function (tables_id, update, options, callback) {
    if (typeof tables_id === 'object' && Array.isArray(tables_id) && tables_id.length > 0 && tables_id.filter((e) => { return mongoose.isValidObjectId(e) }).length == tables_id.length) {
        tables_id = tables_id.map((e) => {
            return new ObjectId(e);
        });
        Table.updateMany({ _id: { $in: tables_id } }, update, { runValidators: true })
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

module.exports.deleteOneTable = function (table_id, options, callback) {
    if (table_id && mongoose.isValidObjectId(table_id)) {
        Table.findByIdAndDelete(table_id)
            .then((value) => {
                try {
                    console.log(value)
                    if (value) callback(null, value.toObject());
                    else
                        callback({
                            msg: "Table non trouvé.", type_error: "no-found",
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

module.exports.deleteManyTables = function (tables_id, options, callback) {
    if (tables_id && Array.isArray(tables_id) && tables_id.length > 0 && tables_id.filter((e) => {
        return mongoose.isValidObjectId(e);
    }).length == tables_id.length) {
        tables_id = tables_id.map((e) => {
            return new ObjectId(e);
        });
        Table.deleteMany({ _id: tables_id })
            .then((value) => {
                callback(null, value);
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