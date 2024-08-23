const ThemeSchema = require("../schemas/Theme");
const _ = require("lodash");
const async = require("async");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

var Theme = mongoose.model("Theme", ThemeSchema);

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

module.exports.addOneTheme = async function (theme, options, callback) {
    try {
        var new_theme = new Theme(theme);
        var errors = new_theme.validateSync();
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
            await new_theme.save();
            callback(null, new_theme.toObject());
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

module.exports.addManyThemes = async function (themes, options, callback) {
    var errors = [];


    // Vérifier les erreurs de validation
    for (var i = 0; i < themes.length; i++) {
        var theme = themes[i];
        var new_theme = new Theme(theme);
        var error = new_theme.validateSync();
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
            const data = await Theme.insertMany(themes, { ordered: false });
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

module.exports.findOneThemeById = function (theme_id, options, callback) {
    var opts = { populate: options && options.populate ? [user_Id] : [] }
    if (theme_id && mongoose.isValidObjectId(theme_id)) {
        Theme.findById(theme_id, null, opts)
            .then((value) => {
                try {
                    if (value) {
                        callback(null, value.toObject());
                    } else {
                        callback({
                            msg: "Aucun Theme trouvé.", type_error: "no-found",
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

module.exports.findOneTheme = function (tab_field, value, options, callback) {
    var field_unique = ['name', 'price']
    var opts = { populate: options && options.populate ? [user_Id] : [] }

    if (tab_field && Array.isArray(tab_field) && value && _.filter(tab_field, (e) => {
        return field_unique.indexOf(e) == -1;
    }).length == 0) {
        var obj_find = []
        _.forEach(tab_field, (e) => {
            obj_find.push({ [e]: value })
        })
        Theme.findOne({ $or: obj_find }, null, opts).then((value) => {
            if (value) {
                callback(null, value.toObject())
            } else {
                callback({ msg: 'Themes non trouvé.', type_error: 'no-found' })
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

module.exports.findManyThemeByIds = function (themes_id, options, callback) {
    var opts = { populate: (options && options.populate ? [user_Id] : []), lean: true }
    if (
        themes_id && Array.isArray(themes_id) && themes_id.length > 0 && themes_id.filter((e) => {
            return mongoose.isValidObjectId(e);
        }).length == themes_id.length
    ) {
        themes_id = themes_id.map((e) => {
            return new ObjectId(e);
        });
        Theme.find({ _id: themes_id }, null, opts)
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
        themes_id &&
        Array.isArray(themes_id) &&
        themes_id.length > 0 &&
        themes_id.filter((e) => {
            return mongoose.isValidObjectId(e);
        }).length != themes_id.length
    ) {
        callback({
            msg: "Themeau non conforme plusieurs éléments ne sont pas des ObjectId.",
            type_error: "no-valid",
            fields: themes_id.filter((e) => {
                return !mongoose.isValidObjectId(e);
            }),
        });
    } else if (themes_id && !Array.isArray(themes_id)) {
        callback({
            msg: "L'argement n'est pas un themeau.",
            type_error: "no-valid",
        });
    } else {
        callback({ msg: "Themeau non conforme.", type_error: "no-valid" });
    }
};

module.exports.findManyThemes = function (search, page, limit, options, callback) {
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
        Theme.countDocuments(query_mongo).then((value) => {
            if (value > 0) {
                const skip = ((page - 1) * limit)
                Theme.find(query_mongo, null, { skip: skip, limit: limit, populate: populate, lean: true }).then((results) => {
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

module.exports.updateOneTheme = function (theme_id, update, options, callback) {
    if (theme_id && mongoose.isValidObjectId(theme_id)) {
        Theme.findByIdAndUpdate(new ObjectId(theme_id), update, {
            returnDocument: "after",
            runValidators: true,
        })
            .then((value) => {
                try {
                    // callback(null, value.toObject());
                    if (value) {
                        callback(null, value.toObject())
                    } else {
                        callback({ msg: "Theme non trouvé.", type_error: "no-found" });
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

module.exports.updateManyThemes = function (themes_id, update, options, callback) {
    if (typeof themes_id === 'object' && Array.isArray(themes_id) && themes_id.length > 0 && themes_id.filter((e) => { return mongoose.isValidObjectId(e) }).length == themes_id.length) {
        themes_id = themes_id.map((e) => {
            return new ObjectId(e);
        });
        Theme.updateMany({ _id: { $in: themes_id } }, update, { runValidators: true })
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

module.exports.deleteOneTheme = function (theme_id, options, callback) {
    if (theme_id && mongoose.isValidObjectId(theme_id)) {
        Theme.findByIdAndDelete(theme_id)
            .then((value) => {
                try {
                    console.log(value)
                    if (value) callback(null, value.toObject());
                    else
                        callback({
                            msg: "Theme non trouvé.", type_error: "no-found",
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

module.exports.deleteManyThemes = function (themes_id, options, callback) {
    if (themes_id && Array.isArray(themes_id) && themes_id.length > 0 && themes_id.filter((e) => {
        return mongoose.isValidObjectId(e);
    }).length == themes_id.length) {
        themes_id = themes_id.map((e) => {
            return new ObjectId(e);
        });
        Theme.deleteMany({ _id: themes_id })
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
        callback({ msg: "Themeau d'id invalide.", type_error: "no-valid" });
    }
};