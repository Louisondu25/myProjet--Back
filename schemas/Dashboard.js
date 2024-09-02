const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

var DashBoard = mongoose.Schema({

    user_id: {
        type: ObjectId,
        ref:'User',
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    index: {
        type: Number,
        required: true,
    },
    archive: {
        type: Boolean,
        required: true,
    },
    created_at: {
        type: Date,
        default: new Date()
    },
    updated_at: {
        type: Date,
        default: new Date()
    },
    status: {
        type: String,
        enum: ['Private', 'Public'],
        required: true,
    },
    // membres: {
    //     type: Number,
    //     required: true,
    // },
})

module.exports = DashBoard   