const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

var Task = mongoose.Schema ({

    archive: {          //si tu veut ajouter d'autre elements c'est ici comme par exemple: (l'archive des cartes ou les commentaires)
        type: Boolean,
        required: false,
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    category_id: {
        type: ObjectId,
        required: true,
    },
    start_at: {
        type: Date,
        default: new Date()
    },
    finish_at: {
        type: Date,
        default: new Date()
    },
    board_id: {
        type: ObjectId,
        ref:'Dashboard',
        required: false,
    },
    status: {
        type: String,
        enum: ['Finish', 'en cours'],
        required: false,
    },
    user_id: {
        type: ObjectId,
        ref:'User',
        required: false,
    },
    created_at: {
        type: Date,
        default: new Date()
    },
    updated_at: {
        type: Date,
        default: new Date()
    }
})

module.exports = Task