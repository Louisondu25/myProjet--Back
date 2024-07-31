const mongoose = require ('mongoose')
const ObjectId = mongoose.Types.ObjectId

var Comment = ({

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
        required: true,
    },
    task_id: {
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
    }
})

module.exports = Comment