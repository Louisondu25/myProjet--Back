const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

var DashBoard = ({

    user_id: {
        type: ObjectId,
        required: true,
    },
    tableau_id: {
        type: ObjectId,
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
    setting_list: {
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
    },
})

module.exports = DashBoard   