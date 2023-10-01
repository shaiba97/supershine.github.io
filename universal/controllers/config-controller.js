const {
    MemberSchema,
    ServiceSchema,
    TestimonialSchema,
    BlogSchema,
} = require('../models/config-model')
const { MongoClient, ObjectId } = require('mongodb')
const mongoCLient = MongoClient.connect("mongodb://0.0.0.0:27017")
const alphabet = /[a-zA-Z]/
const alphanumeric = /[a-zA-Z0-9]/
const numbers = /\d+/g
const email = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/



// MEMBER REQUESTS

function postMember(req, res) {

    try {

        if (req.body.first_name === '' && req.body.last_name === '' && req.body.contact === '' && req.body.position === '' && req.body.comment === '' && req.body.image === 'undefined') {
            return res.json(([{ path: 'all', type: 'required', msg: 'All fields are required' }]))
        } else if (req.body.image === 'undefined') {
            return res.json([{ path: 'image', msg: 'Image is required!', type: 'required' }])
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
        } else if (req.body.position === '') {
            return res.json([{ path: 'position', msg: 'Position is required!', type: 'required' }])
        } else if (!req.body.position.match(alphabet)) {
            return res.json([{ path: 'position', msg: 'Position only alphabet letters!', type: 'regex' }])
        } else if (req.body.comment === '') {
            return res.json([{ path: 'comment', msg: 'Comment is required!', type: 'required' }])
        } else if (!req.body.comment.match(alphanumeric)) {
            return res.json([{ path: 'comment', msg: 'Comment only alphabet letters and numbers!', type: 'regex' }])
        } else {
            mongoCLient.then(db => {
                const dbo = db.db("clean")

                const member = new MemberSchema({
                    image: req.file.filename,
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    contact: req.body.contact,
                    position: req.body.position,
                    comment: req.body.comment
                })

                dbo.collection("members").insertOne(member).then(data => {
                    res.send(data)
                }).catch(err => {
                    //
                    console.log(err);
                })
            })
        }


    } catch (e) {
        res.json({ err: "OOOps something went wrong!" })
    }


}

function getMembers(req, res) {
    try {
        mongoCLient.then(db => {
            const dbo = db.db("clean")

            dbo.collection("members").find().toArray().then(data => {
                res.send(data)
            }).catch(err => { res.send("Your request failed to complete!") })
        })
    } catch (e) {
        res.json({ err: "OOOps something went wrong!" })
    }
}

function getMember(req, res) {
    try {
        mongoCLient.then(db => {
            const dbo = db.db("clean")

            dbo.collection("members").findOne({ _id: new ObjectId(req.params._id) }).then(data => {
                res.send(data)
            }).catch(err => { res.send("Your request failed to complete!") })
        })
    } catch (e) {
        res.json({ err: "OOOps something went wrong!" })
    }
}

function updateMember(req, res) {
    try {
        if (!req.body.first_name.match(alphabet)) {
            return res.json([{ path: 'first_name', msg: 'First name only alphabet letters!', type: 'regex' }])
        } else if (!req.body.last_name.match(alphabet)) {
            return res.json([{ path: 'last_name', msg: 'Last name only alphabet letters!', type: 'regex' }])
        } else if (!req.body.contact.match(email) && !req.body.contact.match(numbers)) {
            return res.json([{ path: 'contact', msg: 'Contact only email or phone number!', type: 'regex' }])
        } else if (!req.body.position.match(alphabet)) {
            return res.json([{ path: 'position', msg: 'Position only alphabet letters!', type: 'regex' }])
        } else if (!req.body.comment.match(alphanumeric)) {
            return res.json([{ path: 'comment', msg: 'Comment only alphabet letters and numbers!', type: 'regex' }])
        } else {
            mongoCLient.then(db => {
                const dbo = db.db("clean")

                if (req.file === undefined) {
                    dbo.collection("members").updateOne({ _id: new ObjectId(req.params._id) }, {
                        $set: {
                            first_name: req.body.first_name,
                            last_name: req.body.last_name,
                            contact: req.body.contact,
                            position: req.body.position,
                        }
                    }).then(data => {
                        res.send(data)
                    }).catch(err => { res.send("Your request failed to complete!") })
                } else {
                    dbo.collection("members").updateOne({ _id: new ObjectId(req.params._id) }, {
                        $set: {
                            image: req.file.filename,
                            first_name: req.body.first_name,
                            last_name: req.body.last_name,
                            contact: req.body.contact,
                            position: req.body.position,
                        }
                    }).then(data => {
                        res.send(data)
                    }).catch(err => { res.send("Your request failed to complete!") })
                }
            })
        }
    } catch (e) {
        res.json({ err: "OOOps something went wrong!" })
    }
}

function deleteMember(req, res) {
    try {
        mongoCLient.then(db => {
            const dbo = db.db("clean")

            dbo.collection("members").deleteOne({ _id: new ObjectId(req.params._id) }).then(data => {
                res.send(data)
            }).catch(err => { res.send("Your request failed to complete!") })
        })
    } catch (e) {
        res.json({ err: "OOOps something went wrong!" })
    }
}




// SERVICE REQUESTS

function postService(req, res) {
    try {
        if (req.body.service === '' && req.body.desc === '') {
            return res.json(([{ path: 'all', type: 'required', msg: 'All fields are required' }]))
        } else if (req.body.service === '') {
            return res.json([{ path: 'service', msg: 'Service is required!', type: 'required' }])
        } else if (!req.body.service.match(alphabet)) {
            return res.json([{ path: 'service', msg: 'Service only alphabet letters!', type: 'regex' }])
        } else if (req.body.desc === '') {
            return res.json([{ path: 'desc', msg: 'Description is required!', type: 'required' }])
        } else if (!req.body.desc.match(alphanumeric)) {
            return res.json([{ path: 'desc', msg: 'Description only alphabet letters and numbers!', type: 'regex' }])
        } else {
            mongoCLient.then(db => {
                const dbo = db.db("clean")

                const service = new ServiceSchema({
                    service: req.body.service,
                    desc: req.body.desc,
                })

                dbo.collection("services").insertOne(service).then(data => {
                    res.send(data)
                }).catch(err => { res.send("Your request failed to complete!") })
            })
        }
    } catch (e) {
        res.json({ err: "OOOps something went wrong!" })
    }
}

function getServices(req, res) {
    try {
        mongoCLient.then(db => {
            const dbo = db.db("clean")

            dbo.collection("services").find().toArray().then(data => {
                res.send(data)
            }).catch(err => { res.send("Your request failed to complete!") })
        })
    } catch (e) {
        res.json({ err: "OOOps something went wrong!" })
    }
}

function getService(req, res) {
    try {
        mongoCLient.then(db => {
            const dbo = db.db("clean")

            dbo.collection("services").findOne({ _id: new ObjectId(req.params._id) }).then(data => {
                res.send(data)
            }).catch(err => { res.send("Your request failed to complete!") })
        })
    } catch (e) {
        res.json({ err: "OOOps something went wrong!" })
    }
}

function updateService(req, res) {
    try {
        if (!req.body.service.match(alphabet)) {
            return res.json([{ path: 'service', msg: 'Service only alphabet letters!', type: 'regex' }])
        } else if (!req.body.desc.match(alphanumeric)) {
            return res.json([{ path: 'desc', msg: 'Description only alphabet letters and numbers!', type: 'regex' }])
        } else {
            mongoCLient.then(db => {
                const dbo = db.db("clean")

                dbo.collection("services").updateOne({ _id: new ObjectId(req.params._id) }, {
                    $set: {
                        service: req.body.service,
                        desc: req.body.desc,
                    }
                }).then(data => {
                    res.send(data)
                }).catch(err => { res.send("Your request failed to complete!") })
            })
        }
    } catch (e) {
        res.json({ err: "OOOps something went wrong!" })
    }
}

function deleteService(req, res) {
    try {
        mongoCLient.then(db => {
            const dbo = db.db("clean")

            dbo.collection("services").deleteOne({ _id: new ObjectId(req.params._id) }).then(data => {
                res.send(data)
            }).catch(err => { res.send("Your request failed to complete!") })
        })
    } catch (e) {
        res.json({ err: "OOOps something went wrong!" })
    }
}



// TESTIMONIAL REQUESTS

function postTestimonial(req, res) {
    try {
        if (req.body.before === 'undefined' && req.body.after === 'undefined') {
            return res.json(([{ path: 'all', type: 'required', msg: 'All fields are required' }]))
        } else if (req.body.before === 'undefined') {
            return res.json([{ path: 'before', msg: 'Before image is required!', type: 'required' }])
        } else if (req.body.after === 'undefined') {
            return res.json([{ path: 'after', msg: 'After image is required!', type: 'required' }])
        } else {
            mongoCLient.then(db => {
                const dbo = db.db("clean")

                const testimonial = new TestimonialSchema({
                    images: req.files.map(image => { return image.filename })
                })

                dbo.collection("testimonials").insertOne(testimonial).then(data => {
                    res.send(data)
                }).catch(err => { res.send("Your request failed to complete!") })
            })
        }
    } catch (e) {
        res.json({ err: "OOOps something went wrong!" })
    }
}

function getTestimonials(req, res) {
    try {
        mongoCLient.then(db => {
            const dbo = db.db("clean")

            dbo.collection("testimonials").find().toArray().then(data => {
                res.send(data)
            }).catch(err => { res.send("Your request failed to complete!") })
        })
    } catch (e) {
        res.json({ err: "OOOps something went wrong!" })
    }
}

function getTestimonial(req, res) {
    try {
        mongoCLient.then(db => {
            const dbo = db.db("clean")

            dbo.collection("testimonials").findOne({ _id: new ObjectId(req.params._id) }).then(data => {
                res.send(data)
            }).catch(err => { res.send("Your request failed to complete!") })
        })
    } catch (e) {
        res.json({ err: "OOOps something went wrong!" })
    }
}

function updateTestimonial(req, res) {
    try {
        if (req.body.before === 'undefined' && req.body.desc === 'undefined') {
            return res.json(([{ path: 'all', type: 'required', msg: 'All fields are required' }]))
        } else if (req.body.before === 'undefined') {
            return res.json([{ path: 'before', msg: 'Before image is required!', type: 'required' }])
        } else if (req.body.after === 'undefined') {
            return res.json([{ path: 'after', msg: 'After image is required!', type: 'required' }])
        } else {

            mongoCLient.then(db => {
                const dbo = db.db("clean")

                dbo.collection("testimonials").updateOne({ _id: new ObjectId(req.params._id) }, {
                    $set: {
                        images: req.files.map(image => { return image.filename }),
                    }
                }).then(data => {
                    res.send(data)
                }).catch(err => { res.send("Your request failed to complete!") })
            })
        }
    } catch (e) {
        res.json({ err: "OOOps something went wrong!" })
    }
}

function deleteTestimonial(req, res) {
    try {
        mongoCLient.then(db => {
            const dbo = db.db("clean")

            dbo.collection("testimonials").deleteOne({ _id: new ObjectId(req.params._id) }).then(data => {
                res.send(data)
            }).catch(err => { res.send("Your request failed to complete!") })
        })
    } catch (e) {
        res.json({ err: "OOOps something went wrong!" })
    }
}



// BLOG REQUESTS

function postBlog(req, res) {
    try {

        if (req.body.title === '' && req.body.blog === '' && req.body.image === 'undefined') {
            return res.json(([{ path: 'all', type: 'required', msg: 'All fields are required' }]))
        } else if (req.body.image === 'undefined') {
            return res.json([{ path: 'image', msg: 'Image is required!', type: 'required' }])
        } else if (req.body.title === '') {
            return res.json([{ path: 'title', msg: 'Title is required!', type: 'required' }])
        } else if (!req.body.title.match(alphanumeric)) {
            return res.json([{ path: 'title', msg: 'Title only alphabet letters!', type: 'regex' }])
        } else if (req.body.blog === '') {
            return res.json([{ path: 'blog', msg: 'blog is required!', type: 'required' }])
        } else if (!req.body.blog.match(alphanumeric)) {
            return res.json([{ path: 'blog', msg: 'blog only alphabet letters and numbers!', type: 'regex' }])
        } else {
            mongoCLient.then(db => {
                const dbo = db.db("clean")

                const testimonial = new BlogSchema({
                    title: req.body.title,
                    blog: req.body.blog,
                    image: req.file.filename,
                })

                dbo.collection("blogs").insertOne(testimonial).then(data => {
                    res.send(data)
                }).catch(err => { res.send("Your request failed to complete!") })
            })
        }
    } catch (e) {
        res.json({ err: "OOOps something went wrong!" })
    }
}

function getBlogs(req, res) {
    try {
        mongoCLient.then(db => {
            const dbo = db.db("clean")

            dbo.collection("blogs").find().toArray().then(data => {
                res.send(data)
            }).catch(err => { res.send("Your request failed to complete!") })
        })
    } catch (e) {
        res.json({ err: "OOOps something went wrong!" })
    }
}

function getBlog(req, res) {
    try {
        mongoCLient.then(db => {
            const dbo = db.db("clean")

            dbo.collection("blogs").findOne({ _id: new ObjectId(req.params._id) }).then(data => {
                res.send(data)
            }).catch(err => { res.send("Your request failed to complete!") })
        })
    } catch (e) {
        res.json({ err: "OOOps something went wrong!" })
    }
}

function updateBlog(req, res) {
    try {
        if (!req.body.title.match(alphanumeric)) {
            return res.json([{ path: 'title', msg: 'Title only alphabet letters!', type: 'regex' }])
        } else if (!req.body.blog.match(alphanumeric)) {
            return res.json([{ path: 'blog', msg: 'blog only alphabet letters and numbers!', type: 'regex' }])
        } else {

            if (req.file === undefined) {
                mongoCLient.then(db => {
                    const dbo = db.db("clean")
                    dbo.collection("blogs").updateOne({ _id: new ObjectId(req.params._id) }, {
                        $set: {
                            title: req.body.title,
                            blog: req.body.blog,
                        }
                    }).then(data => {
                        res.send(data)
                    }).catch(err => { res.send("Your request failed to complete!") })
                })
            } else {
                mongoCLient.then(db => {
                    const dbo = db.db("clean")
                    dbo.collection("blogs").updateOne({ _id: new ObjectId(req.params._id) }, {
                        $set: {
                            title: req.body.title,
                            blog: req.body.blog,
                            image: req.file.filename,
                        }
                    }).then(data => {
                        res.send(data)
                    }).catch(err => { res.send("Your request failed to complete!") })
                })
            }
        }
    } catch (e) {
        res.json({ err: "OOOps something went wrong!" })
        console.log(e);
    }
}

function deleteBlog(req, res) {
    try {
        mongoCLient.then(db => {
            const dbo = db.db("clean")
            dbo.collection("blogs").deleteOne({ _id: new ObjectId(req.params._id) }).then(data => {
                res.send(data)
            }).catch(err => { res.send("Your request failed to complete!") })
        })
    } catch (e) {
        res.json({ err: "OOOps something went wrong!" })
    }
}

module.exports = {
    postMember,
    getMembers,
    getMember,
    updateMember,
    deleteMember,
    postService,
    getServices,
    getService,
    updateService,
    deleteService,
    postTestimonial,
    getTestimonials,
    getTestimonial,
    updateTestimonial,
    deleteTestimonial,
    postBlog,
    getBlogs,
    getBlog,
    updateBlog,
    deleteBlog
}
