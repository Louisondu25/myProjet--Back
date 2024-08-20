const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

var TableSchema = mongoose.Schema({
    user_id: {
        type: ObjectId,
        ref: 'UserSchema',
        required: true,
    },
    title: {
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

    created_at: {
        type: Date,
        default: Date.now
    },

    updated_at: {
        type: Date,
        default: Date.now
    }
})

module.exports = TableSchema