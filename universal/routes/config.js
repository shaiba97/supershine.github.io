var express = require('express');
var router = express.Router();
const multer = require('multer');
const {
    postMember,
    getMembers,
    getMember,
    updateMember,
    postService,
    getServices,
    getService,
    updateService,
    postTestimonial,
    getTestimonials,
    getTestimonial,
    updateTestimonial,
    postBlog,
    getBlogs,
    getBlog,
    updateBlog,
    deleteMember,
    deleteService,
    deleteTestimonial,
    deleteBlog,
} = require('../controllers/config-controller');

const memberImage = multer.diskStorage({
    destination: "../src/assets/uploads/members/",
    filename: function(req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9).toString()
        cb(null, uniqueSuffix + '.' + file.originalname.split('.')[1]) 
    }
})
const uploadMemberImage = multer({ storage: memberImage })


// MEMBER
router.post('/post-member', uploadMemberImage.single('image'), postMember)
router.get('/get-member/:_id', getMember)
router.get('/get-members', getMembers)
router.put('/update-member/:_id', uploadMemberImage.single('image'), updateMember)
router.delete('/delete-member/:_id', deleteMember)


// SERVICE
router.post('/post-service', postService)
router.get('/get-service/:_id', getService)
router.get('/get-services', getServices)
router.put('/update-service/:_id', updateService)
router.delete('/delete-service/:_id', deleteService)

const testimonial = multer.diskStorage({
    destination: "../src/assets/uploads/testimonials/",
    filename: function(req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9).toString()
        cb(null, file.originalname.split('.')[0] + '-' + uniqueSuffix + '.' + file.originalname.split('.')[1]) 
    }
})
const uploadTestimonial = multer({ storage: testimonial })

// TESTIMONIAL
router.post('/post-testimonial', uploadTestimonial.any({ name: 'before', name: 'after' }), postTestimonial)
router.get('/get-testimonial/:_id', getTestimonial)
router.get('/get-testimonials', getTestimonials)
router.put('/update-testimonial/:_id', uploadTestimonial.any({ name: 'before', name: 'after' }), updateTestimonial)
router.delete('/delete-testimonial/:_id', deleteTestimonial)


const blog = multer.diskStorage({
    destination: "../src/assets/uploads/blogs/",
    filename: function(req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9).toString()
        cb(null, file.originalname.split('.')[0] + '-' + uniqueSuffix + '.' + file.originalname.split('.')[1]) 
    }
})
const uploadBLog = multer({ storage: blog })

// BLOG
router.post('/post-blog', uploadBLog.single('image'), postBlog)
router.get('/get-blog/:_id', getBlog)
router.get('/get-blogs', getBlogs)
router.put('/update-blog/:_id', uploadBLog.single('image'), updateBlog)
router.delete('/delete-blog/:_id', deleteBlog)


module.exports = router
