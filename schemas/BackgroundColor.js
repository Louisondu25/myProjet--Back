const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

var BackgroundColorSchema = mongoose.Schema({
    user_id: {
        type: ObjectId,
        ref: 'UserSchema',
        required: true,
    },
    color: {
        type: String,
        index:true,
        unique: true,
        required: true,
    },

    board_id: {
        type: ObjectId,
        ref: 'DashBoard',
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

module.exports = BackgroundColorSchema