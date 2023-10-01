const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bookingSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },

    last_name: {
        type: String,
        required: true
    },

    contact: {
        type: String,
        required: true
    },

    building: {
        type: String,
        required: true
    },

    floor: {
        type: String,
        required: true
    },

    tower: {
        type: String,
        required: true
    },

    landmark: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        default: Date.now()
    },
})

const commentSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },

    last_name: {
        type: String,
        required: true
    },

    contact: {
        type: String,
        required: true
    },

    comment: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        default: Date.now()
    },
})

const BookingSchema = mongoose.model('BookingSchema', bookingSchema)
const CommentSchema = mongoose.model('CommentSchema', commentSchema)

module.exports = { BookingSchema, CommentSchema }