const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

var CardSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    membres: {
        type: Number,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },

    comment_id: {
        type: ObjectId,
        ref:'Comment',
        required: true,
    },

    date_start: {
        type: Number,
        required: true,
    },

    date_end: {
        type: Number,
        required: true,
    },

    user_id: {
        type: ObjectId,
        ref:'UserSchema',
        required: true,
    },

    list_id: {
        type: ObjectId,
        ref:'ListSchema',
        required: true,
    },

    label_id: {
        type: ObjectId,
        ref:'Label',
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
    }
})

module.exports = CardSchema