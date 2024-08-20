const mongoose = require ('mongoose')
const ObjectId = mongoose.Types.ObjectId

var Comment = mongoose.Schema ({

    text: {
        type: String,
        required: true,
    },
    date: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['Error','Warning', 'Infos'],
        required: true,
    },
    user_id: {
        type: ObjectId,
        ref: 'UserSchema',
        required: true,
    },
    task_id: {
        type: ObjectId,
        ref: 'Task',
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

module.exports = Comment