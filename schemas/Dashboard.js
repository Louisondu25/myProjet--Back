const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

var DashBoard = mongoose.Schema({

    user_id: {
        type: ObjectId,
        ref:'UserSchema',
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
    index: {
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
    },
    status: {
        type: String,
        enum: ['Private', 'Public'],
        required: true,
    },
    membres: {
        type: Number,
        required: true,
    },
})

module.exports = DashBoard   