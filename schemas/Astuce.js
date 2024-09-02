const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

var AstucesSchema = mongoose.Schema({
    user_id: {
        type: ObjectId,
        ref: 'UserSchema',
        required: true,
    },
    title: {
        type: String,
        required: true,
    },

    astuce: {
        type: String,
        index: true,
        unique: true,
        required: true,
    },

    theme_id: {
        type: ObjectId,
        ref:'ThemesSchema',
        required: true,
    },

    board_id: {
        type: ObjectId,
        ref:'DashBoard',
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

module.exports = AstucesSchema