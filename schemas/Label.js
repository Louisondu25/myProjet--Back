const mongoose = require ('mongoose')
const ObjectId = mongoose.Types.ObjectId

var Label = mongoose.Schema ({

    text: {
        type: String,
        required: true,
    },
    date: {
        type: Number,
        required: true,
    },
    status: {
        type: Boolean,
        required: true,
    },
    task_id: {
        type: ObjectId,
        required: true,
    },
    user_id: {
        type: ObjectId,
        required: true,
    },
    board_id: {
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

module.exports = Label