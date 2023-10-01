var express = require('express');
var router = express.Router();
const multer = require('multer');

const {
    postBooking,
    getBookings,
    getBooking,
    deleteBooking,
    postComment,
    getComments,
    getComment,
    deleteComment
} = require('../controllers/visitor-controller');

// BOOKINGS
router.post('/post-booking', postBooking);
router.get('/get-bookings', getBookings);
router.get('/get-booking/:_id', getBooking);
router.delete('/delete-booking/:_id', deleteBooking);

// COMMENTS
router.post('/post-comment', postComment);
router.get('/get-comments', getComments);
router.get('/get-comment/:_id', getComment);
router.delete('/delete-comment/:_id', deleteComment);

module.exports = router;