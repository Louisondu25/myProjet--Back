const AstuceSchema = require("../schemas/Astuce");
const _ = require("lodash");
const async = require("async");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

var Astuce = mongoose.model("Astuce", AstuceSchema);

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

module.exports.addOneAstuce = async function (astuce, options, callback) {
    try {
        var new_astuce = new Astuce(astuce);
        var errors = new_astuce.validateSync();
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
            await new_astuce.save();
            callback(null, new_astuce.toObject());
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

module.exports.addManyAstuces = async function (astuces, options, callback) {
    var errors = [];


    // Vérifier les erreurs de validation
    for (var i = 0; i < astuces.length; i++) {
        var astuce = astuces[i];
        var new_astuce = new Astuce(astuce);
        var error = new_astuce.validateSync();
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
            const data = await Astuce.insertMany(astuces, { ordered: false });
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

module.exports.findOneAstuceById = function (astuce_id, options, callback) {
    var opts = { populate: options && options.populate ? [user_Id] : [] }
    if (astuce_id && mongoose.isValidObjectId(astuce_id)) {
        Astuce.findById(astuce_id, null, opts)
            .then((value) => {
                try {
                    if (value) {
                        callback(null, value.toObject());
                    } else {
                        callback({
                            msg: "Aucun Astuce trouvé.", type_error: "no-found",
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

module.exports.findOneAstuce = function (tab_field, value, options, callback) {
    var field_unique = ['title']
    var opts = { populate: options && options.populate ? [user_Id] : [] }

    if (tab_field && Array.isArray(tab_field) && value && _.filter(tab_field, (e) => {
        return field_unique.indexOf(e) == -1;
    }).length == 0) {
        var obj_find = []
        _.forEach(tab_field, (e) => {
            obj_find.push({ [e]: value })
        })
        Astuce.findOne({ $or: obj_find }, null, opts).then((value) => {
            if (value) {
                callback(null, value.toObject())
            } else {
                callback({ msg: 'Astuces non trouvé.', type_error: 'no-found' })
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

module.exports.findManyAstuceByIds = function (astuces_id, options, callback) {
    var opts = { populate: (options && options.populate ? [user_Id] : []), lean: true }
    if (
        astuces_id && Array.isArray(astuces_id) && astuces_id.length > 0 && astuces_id.filter((e) => {
            return mongoose.isValidObjectId(e);
        }).length == astuces_id.length
    ) {
        astuces_id = astuces_id.map((e) => {
            return new ObjectId(e);
        });
        Astuce.find({ _id: astuces_id }, null, opts)
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
        astuces_id &&
        Array.isArray(astuces_id) &&
        astuces_id.length > 0 &&
        astuces_id.filter((e) => {
            return mongoose.isValidObjectId(e);
        }).length != astuces_id.length
    ) {
        callback({
            msg: "Tableau non conforme plusieurs éléments ne sont pas des ObjectId.",
            type_error: "no-valid",
            fields: astuces_id.filter((e) => {
                return !mongoose.isValidObjectId(e);
            }),
        });
    } else if (astuces_id && !Array.isArray(astuces_id)) {
        callback({
            msg: "L'argement n'est pas un tableau.",
            type_error: "no-valid",
        });
    } else {
        callback({ msg: "Tableau non conforme.", type_error: "no-valid" });
    }
};

module.exports.findManyAstuces = function (search, page, limit, options, callback) {
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
        Astuce.countDocuments(query_mongo).then((value) => {
            if (value > 0) {
                const skip = ((page - 1) * limit)
                Astuce.find(query_mongo, null, { skip: skip, limit: limit, populate: populate, lean: true }).then((results) => {
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

module.exports.updateOneAstuce = function (astuce_id, update, options, callback) {
    if (astuce_id && mongoose.isValidObjectId(astuce_id)) {
        Astuce.findByIdAndUpdate(new ObjectId(astuce_id), update, {
            returnDocument: "after",
            runValidators: true,
        })
            .then((value) => {
                try {
                    // callback(null, value.toObject());
                    if (value) {
                        callback(null, value.toObject())
                    } else {
                        callback({ msg: "Astuce non trouvé.", type_error: "no-found" });
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

module.exports.updateManyAstuces = function (astuces_id, update, options, callback) {
    if (typeof astuces_id === 'object' && Array.isArray(astuces_id) && astuces_id.length > 0 && astuces_id.filter((e) => { return mongoose.isValidObjectId(e) }).length == astuces_id.length) {
        astuces_id = astuces_id.map((e) => {
            return new ObjectId(e);
        });
        Astuce.updateMany({ _id: { $in: astuces_id } }, update, { runValidators: true })
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

module.exports.deleteOneAstuce = function (astuce_id, options, callback) {
    if (astuce_id && mongoose.isValidObjectId(astuce_id)) {
        Astuce.findByIdAndDelete(astuce_id)
            .then((value) => {
                try {
                    if (value) callback(null, value.toObject());
                    else
                        callback({
                            msg: "Astuce non trouvé.", type_error: "no-found",
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

module.exports.deleteManyAstuces = function (astuces_id, options, callback) {
    if (astuces_id && Array.isArray(astuces_id) && astuces_id.length > 0 && astuces_id.filter((e) => {
        return mongoose.isValidObjectId(e);
    }).length == astuces_id.length) {
        astuces_id = astuces_id.map((e) => {
            return new ObjectId(e);
        });
        Astuce.deleteMany({ _id: astuces_id })
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