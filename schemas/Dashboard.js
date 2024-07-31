const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

var DashBoard = ({

    board_user_id: {
        type: ObjectId,
        required: true,
    },
    board_tableau_id: {
        type: ObjectId,
        required: true,
    },
    board_title: {
        type: String,
        required: true,
    },
    board_description: {
        type: String,
        required: true,
    },
    board_index: {
        type: Number,
        required: true,
    },
    board_setting_list: {
        type: ObjectId,
        required: true,
    },
    board_created_at: {
        type: Date,
        default: Date.now
    },
    board_updated_at: {
        type: Date,
        default: Date.now
    },
})

module.exports= DashBoard