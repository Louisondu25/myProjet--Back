const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

var Task = ({

    archive: {
        type: Boolean,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
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
    board_id: {
        type: ObjectId,
        required: true,
    },
    status: {
        type: String,
        enum: ['Finish', 'en cours'],
        required: true,
    },
    user_id: {
        type: ObjectId,
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

module.exports = Task