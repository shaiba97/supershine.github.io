const mongoose = require('mongoose')
const Schema = mongoose.Schema

const adminSchema = new Schema({
    image: {     type: String,     data: Buffer,     contentType: String   },

    first_name: {
        type: String,
        required: true
    },

    last_name: {
        type: String,
        required: true
    },

    contact1: {
        type: String,
        required: true
    },

    contact2: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        default: Date.now()
    },
})

const AdminSchema = mongoose.model('AdminSchema', adminSchema)
module.exports = { AdminSchema }