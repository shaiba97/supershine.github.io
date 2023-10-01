const mongoose = require('mongoose')
const { BookingSchema, CommentSchema } = require('../models/visitor-model')
const { MongoClient, ObjectId } = require('mongodb')
const mongoCLient = MongoClient.connect("mongodb://0.0.0.0:27017")

const alphabet = /[a-zA-Z]/
const alphanumeric = /[a-zA-Z0-9]/
const numbers = /\d+/g
const email = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/


// BOOKINGS

function postBooking(req, res) {

    try {
        if (req.body.first_name === '' && req.body.last_name === '' && req.body.contact === '' && req.body.building === '' && req.body.floor === '') {
            return res.json(([{ path: 'all', type: 'required', msg: 'All fields are required' }]))
        } else if (req.body.first_name === '') {
            return res.json([{ path: 'first_name', msg: 'First name is required!', type: 'required' }])
        } else if (!req.body.first_name.match(alphabet)) {
            return res.json([{ path: 'first_name', msg: 'First name only alphabet letters!', type: 'regex' }])
        } else if (req.body.last_name === '') {
            return res.json([{ path: 'last_name', msg: 'Last name is required!', type: 'required' }])
        } else if (!req.body.last_name.match(alphabet)) {
            return res.json([{ path: 'last_name', msg: 'Last name only alphabet letters!', type: 'regex' }])
        } else if (req.body.contact === '') {
            return res.json([{ path: 'contact', msg: 'Contact is required!', type: 'required' }])
        } else if (!req.body.contact.match(email) && !req.body.contact.match(numbers)) {
            return res.json([{ path: 'contact', msg: 'Contact only email or phone number!', type: 'regex' }])
        } else if (req.body.building === '') {
            return res.json([{ path: 'building', msg: 'Building is required!', type: 'required' }])
        } else if (!req.body.building.match(alphanumeric)) {
            return res.json([{ path: 'building', msg: 'Address only alphabet letters and numbers!', type: 'regex' }])
        } else {
            mongoCLient.then(db => {
                const dbo = db.db("clean")
                const booking = new BookingSchema({
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    contact: req.body.contact,
                    building: req.body.building,
                    floor: req.body.floor,
                    tower: req.body.tower,
                    landmark: req.body.landmark
                })
                dbo.collection("bookings").insertOne(booking).then(data => {
                    res.send(data)
                }).catch(err => { res.json({ err: "OOOps failed to complete your request!" }) })
            })
        }

    } catch (e) {
        res.json({ err: "OOOps something went wrong" })
    }
}


function getBookings(req, res) {
    try {
        mongoCLient.then(db => {
            const dbo = db.db("clean")
            dbo.collection("bookings").find().toArray().then(data => {
                res.send(data)
            }).catch(err => { res.json({ err: "OOOps failed to complete your request!" }) })
        })
    } catch (e) {
        res.json({ err: "OOOps something went wrong" })
    }
}


function getBooking(req, res) {
    try {
        mongoCLient.then(db => {
            const dbo = db.db("clean")
            dbo.collection("bookings").findOne({ _id: new ObjectId(req.params._id) }).then(data => {
                res.send(data)
            }).catch(err => { res.json({ err: "OOOps failed to complete your request!" }) })
        })
    } catch (e) {
        res.json({ err: "OOOps something went wrong" })
        console.log(e);
    }
}


function deleteBooking(req, res) {
    try {
        mongoCLient.then(db => {
            const dbo = db.db("clean")
            dbo.collection("bookings").deleteOne({ _id: new ObjectId(req.params._id) }).then(data => {
                res.send(data)
            }).catch(err => { res.json({ err: "OOOps failed to complete your request!" }) })
        })
    } catch (e) {
        res.json({ err: "OOOps something went wrong" })
    }
}

// COMMENT

function postComment(req, res) {
    try {

        if (req.body.first_name === '' && req.body.last_name === '' && req.body.contact === '' && req.body.comment === '') {
            return res.json(([{ path: 'all', type: 'required', msg: 'All fields are required' }]))
        } else if (req.body.first_name === '') {
            return res.json([{ path: 'first_name', msg: 'First name is required!', type: 'required' }])
        } else if (!req.body.first_name.match(alphabet)) {
            return res.json([{ path: 'first_name', msg: 'First name only alphabet letters!', type: 'regex' }])
        } else if (req.body.last_name === '') {
            return res.json([{ path: 'last_name', msg: 'Last name is required!', type: 'required' }])
        } else if (!req.body.last_name.match(alphabet)) {
            return res.json([{ path: 'last_name', msg: 'Last name only alphabet letters!', type: 'regex' }])
        } else if (req.body.contact === '') {
            return res.json([{ path: 'contact', msg: 'Contact is required!', type: 'required' }])
        } else if (!req.body.contact.match(email) && !req.body.contact.match(numbers)) {
            return res.json([{ path: 'contact', msg: 'Contact only email or phone number!', type: 'regex' }])
        } else if (req.body.comment === '') {
            return res.json([{ path: 'comment', msg: 'Comment is required!', type: 'required' }])
        } else if (!req.body.comment.match(alphanumeric)) {
            return res.json([{ path: 'comment', msg: 'Comment only alphabet letters and numbers!', type: 'regex' }])
        } else {
            mongoCLient.then(db => {
                const dbo = db.db("clean")
                const comment = new CommentSchema({
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    contact: req.body.contact,
                    comment: req.body.comment
                })
                dbo.collection("comments").insertOne(comment).then(data => {
                    res.send(data)
                }).catch(err => { res.json({ err: "OOOps failed to complete your request!" }) })
            })
        }
    } catch (e) {
        res.json({ err: "OOOps something went wrong" })
        console.log(e);
    }
}


function getComments(req, res) {
    try {
        mongoCLient.then(db => {
            const dbo = db.db("clean")
            dbo.collection("comments").find().toArray().then(data => {
                res.send(data)
            }).catch(err => { res.json({ err: "OOOps failed to complete your request!" }) })
        })
    } catch (e) {
        res.json({ err: "OOOps something went wrong" })
    }
}


function getComment(req, res) {
    try {
        mongoCLient.then(db => {
            const dbo = db.db("clean")
            dbo.collection("comments").findOne({ _id: new ObjectId(req.params_id) }).then(data => {
                res.send(data)
            }).catch(err => { res.json({ err: "OOOps failed to complete your request!" }) })
        })
    } catch (e) {
        res.json({ err: "OOOps something went wrong" })
    }
}


function deleteComment(req, res) {
    try {
        mongoCLient.then(db => {
            const dbo = db.db("clean")
            dbo.collection("comments").deleteOne({ _id: new ObjectId(req.params._id) }).then(data => {
                res.send(data)
            }).catch(err => { res.json({ err: "OOOps failed to complete your request!" }) })
        })
    } catch (e) {
        res.json({ err: "OOOps something went wrong" })
    }
}

module.exports = {
    postBooking,
    getBookings,
    getBooking,
    deleteBooking,
    postComment,
    getComments,
    getComment,
    deleteComment
}
