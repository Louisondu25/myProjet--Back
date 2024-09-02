const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

var BackgroundPictureSchema = mongoose.Schema({
    user_id: {
        type: ObjectId,
        ref: 'UserSchema',
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    image: {
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

    fieldname: {
        type: String,
        required: false,
    },
    originalname: {
        type: String,
        required: false,
    },
    encoding: {
        type: String,
        required: false,
    },
    mimetype: {
        type: String,
        required: false,
    },
    destination: {
        type: String,
        required: false,
    },
    filename: {
        type: String,
        required: false,
    },
    path: {
        type: String,
        required: false,
    },
    size: {
        type: Number,
        required: false,
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

module.exports = BackgroundPictureSchema