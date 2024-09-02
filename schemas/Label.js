const mongoose = require ('mongoose')
const ObjectId = mongoose.Types.ObjectId

var Label = mongoose.Schema ({

    text: {
        type: String,
        required: true,
        index:true,
        unique: true
    },
    date: {
        type: Date,
        default: new Date()
    },
    status: {
        type: Boolean,
        required: true,
    },
    task_id: {
        type: ObjectId,
        ref:'Task',
        required: true,
    },
    user_id: {
        type: ObjectId,
        ref:'User',
        required: true,
    },
    board_id: {
        type: ObjectId,
        ref:'DashBoard',
        required: true,
    },
    category_id: {
        type: ObjectId,
        ref: 'DashBoard',
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

module.exports = Label