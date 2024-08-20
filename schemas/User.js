const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

var UserSchema = mongoose.Schema({

    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true,
    },
    phone_Number: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        required: false,
    },
    // <-------------------- User setting -------------------->

    dark_and_light_mode_setting: {
        type: String,
        enum: ['dark', 'light'],
        default: 'light',
        required: true,
    },
    notification_setting: {
        type: String,
        enum: ['Son', 'Vibreur', 'Muet'],
        default: 'Son',
        required: true,
    },
    fontsize_setting: {
        type: Number,
        default: 14,
        required: true,
    },
    status_setting: {
        type: String,
        enum: ['active', 'inactive', 'invisible', 'indisponible', 'deconnecter'],
        default: 'active',
        required: true,
    },
    //     // <-------------------- Password Reset -------------------->
    //     password_reset_user_id: {
    //         type: ObjectId,
    //         required: true,
    //     },
    //     password_reset_email: {
    //         type: String,
    //         required: true,
    //     },
    //     password_reset_token: {
    //         type: String,
    //         required: true,
    //     },
    //      password_reset_status_pending: {
    //         type: String,
    //         required: true,
    //     },
    //     created_at: {
    //         type: Date,
    //         default: Date.now
    //     },
    //     updated_at: {
    //         type: Date,
    //         default: Date.now
    //     },
})

module.exports = UserSchema;