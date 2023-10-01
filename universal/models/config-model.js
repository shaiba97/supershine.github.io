const mongoose = require('mongoose')
const Schema = mongoose.Schema


const memberSchema = new Schema({
    image: {     type: String,     data: Buffer,     contentType: String   },
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

    position: {
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

const serviceSchema = new Schema({
    service: {
        type: String,
        required: true
    },

    desc: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        default: Date.now()
    },

})

const testimonialSchema = new Schema({
    images: { type: Array, data: ArrayBuffer, contentType: Array },

    date: {
        type: Date,
        default: Date.now()
    },
})

const blogSchema = new Schema({ 
    image: {     type: String,     data: Buffer,     contentType: String   },

    title: {
        type: String,
        required: true
    },

    blog: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        default: Date.now()
    },

})

const MemberSchema = mongoose.model('MemberSchema', memberSchema)
const ServiceSchema = mongoose.model('ServiceSchema', serviceSchema)
const TestimonialSchema = mongoose.model('TestimonialSchema', testimonialSchema)
const BlogSchema = mongoose.model('BlogSchema', blogSchema)

module.exports = {
    MemberSchema,
    ServiceSchema,
    TestimonialSchema,
    BlogSchema,
}