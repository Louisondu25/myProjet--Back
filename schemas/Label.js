const mongoose = require ('mongoose')
const ObjectId = mongoose.Types.ObjectId

var Label = ({

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
    label_created_at: {
        type: Date,
        default: Date.now
    },
    label_updated_at: {
        type: Date,
        default: Date.now
    }
})

module.exports = Label