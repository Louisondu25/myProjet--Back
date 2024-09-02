const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

var ThemesSchema = mongoose.Schema({
    user_id: {
        type: ObjectId,
        ref: 'UserSchema',
        required: true,
    },
    title: {
        type: String,
        required: true,
    },

    themes: {
        type: String,
        index: true,
        unique: true,
        required: true,
    },

    board_id: {
        type: ObjectId,
        ref:'Dashboard',
        required: true,
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

module.exports = ThemesSchema