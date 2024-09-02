const mongoose = require ('mongoose')
const ObjectId = mongoose.Types.ObjectId

var Comment = mongoose.Schema ({

    text: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: new Date()
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
        default: new Date()
    },
    updated_at: {
        type: Date,
        default: new Date()
    },
})

module.exports = Comment