const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

var ListSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },

    user_id: {
        type: ObjectId,
        ref:'UserSchema',
        required: true,
    },

    board_id: {
        type: ObjectId,
        ref:'DashBoard',
        required: true,
    },

    created_at: {
        type: Date,
        default: Date.now
    },

    updated_at: {
        type: Date,
        default: Date.now
    },

    // <-------------------- List setting -------------------->

    copie_liste_setting: {
        type: String,
        required: true,
    },
    deplacer_liste_setting: {
        type: String,
        required: true,
    },
    deplacer_toute_les_listes_setting: {
        type: String,
        required: true,
    },
    supprimer_liste_setting: {
        type: String,
        required: true,
    },
})

module.exports = ListSchema