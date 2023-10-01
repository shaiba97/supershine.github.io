const { AdminSchema } = require('../models/admin-model')
const { MongoClient, ObjectId } = require('mongodb')
const mongoCLient = MongoClient.connect("mongodb://0.0.0.0:27017")
const passport = require('passport')
const LocalStrategy = require("passport-local").Strategy
const bcrypt = require('bcrypt')

const alphabet = /[a-zA-Z]/
const alphanumeric = /[a-zA-Z0-9]/
const numbers = /\d+/g
const email = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/


function getAdmin(req, res) {
    try {
        mongoCLient.then(db => {
            const dbo = db.db("clean")
            dbo.collection("admins").findOne({ _id: new ObjectId(req.params._id) }).then((data) => {
                res.send(data)
            }).catch(e => { res.send("Your request failed to complete!") })
        })
    } catch (error) {
        res.json({ err: "OOOps something went wrong!" })
    }
}


function getAdmins(req, res) {
    try {
        mongoCLient.then(db => {
            const dbo = db.db("clean")
            dbo.collection("admins").find().toArray().then((data) => {
                res.send(data)
            }).catch(e => { res.send("Your request failed to complete!") })
        })
    } catch (error) {
        res.json({ err: "OOOps something went wrong!" })
    }
}


function updateImage(req, res) {
    try {
        mongoCLient.then(db => {
            const dbo = db.db("clean")
            dbo.collection("admins").updateOne({ _id: new ObjectId(req.params._id) }, {
                $set: {
                    image: req.file.filename,
                }
            }).then((data) => { res.send(data) }).catch(e => { res.send("Your request failed to complete!") })
        })
    } catch (error) {
        res.json({ err: "OOOps something went wrong!" })
    }
}

function updateNames(req, res) {
    try {
        if (!req.body.first_name.match(alphabet)) {
            return res.json([{ path: 'first_name', msg: 'First name only alphabet letters!', type: 'regex' }])
        } else if (!req.body.last_name.match(alphabet)) {
            return res.json([{ path: 'last_name', msg: 'Last name only alphabet letters!', type: 'regex' }])
        }
        mongoCLient.then(db => {
            const dbo = db.db("clean")
            dbo.collection("admins").updateOne({ _id: new ObjectId(req.params._id) }, {
                $set: {
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                }
            }).then((data) => { res.send(data) }).catch(e => { res.send("Your request failed to complete!") })
        })
    } catch (error) {
        console.log(error);
        res.json({ err: "OOOps something went wrong!" })
    }
}


function updateContact(req, res) {
    try {
        if (!req.body.contact.match(email) && !req.body.contact.match(numbers)) {
            return res.json([{ path: 'contact', msg: 'Contact only email or phone number!', type: 'regex' }])
        }
        mongoCLient.then(db => {
            const dbo = db.db("admin")
            dbo.collection("admins").updateOne({ _id: new ObjectId(req.params._id) }, {
                $set: {
                    contact: req.body.contact,
                }
            }).catch(e => { res.send("Your request failed to complete!") })
        })
    } catch (error) {
        res.json({ err: "OOOps something went wrong!" })
    }
}



function updatePassword(req, res) {
    console.log(req.body);
    if (!req.body.password.match(alphanumeric)) {
        return res.json([{ path: 'password', msg: 'Password only alphabet letters and numbers!', type: 'regex' }])
    }
    if (req.body.confirmPassword === '' || req.body.confirmPassword === undefined) {
        return res.json([{ path: 'confirmPassword', msg: 'Password is required!', type: 'required' }])
    } else if (!req.body.confirmPassword.match(alphanumeric)) {
        return res.json([{ path: 'confirmPassword', msg: 'Confirm password only alphabet letters and numbers!', type: 'regex' }])
    } else if (req.body.confirmPassword !== req.body.password || req.body.password !== req.body.confirmPassword) {
        return res.json([{ path: 'match', msg: 'Passwords Not matched', type: 'regex' }])
    }
    try {
        mongoCLient.then(db => {
            const dbo = db.db("clean")
            dbo.collection("admins").updateOne({ _id: new ObjectId(req.params._id) }, {
                $set: {
                    password: req.body.password,
                }
            }).then((data) => { res.send(data) }).catch(e => {
                res.send("Your request failed to complete!")
            })
        })
    } catch (error) {
        res.json({ err: "OOOps something went wrong!" })
    }
}




module.exports = { updateImage, updateNames, updateContact, updatePassword, getAdmin, getAdmins }
