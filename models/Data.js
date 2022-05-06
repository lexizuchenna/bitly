const mongoose = require('mongoose')

const DataSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' || 'Users'
    },
    mobile: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: false,
        default: "Male"
    },
    desc: {
        type: String,
        default: "Profile Updated"
      },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Data = mongoose.model('Data', DataSchema)

module.exports = Data