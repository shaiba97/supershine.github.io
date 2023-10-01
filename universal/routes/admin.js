var express = require('express');
var router = express.Router();
const multer = require('multer');
const { updateImage, updateNames, updatePassword, getAdmin, updateContact, getAdmins } = require('../controllers/admin-controller');
const Validators = require('../validation/validation')

const alphabet = /[a-zA-Z]/
const alphanumeric = /[a-zA-Z0-9]/
const numbers = /\d+/g
const email = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/

const adminImage = multer.diskStorage({
    destination: "../src/assets/uploads/admins/",
    filename: function(req, file, cb) {
        const uniqueSuffix = Date.now() + '' + Math.round(Math.random() * 1E9).toString()
        cb(null, file.originalname.split('.')[0] + '-' + uniqueSuffix + '.' + file.originalname.split('.')[1]) 
    }
})

const uploadAdmin = multer({ storage: adminImage })
router.put('/update-image/:_id', uploadAdmin.single('image'), updateImage);
router.put('/update-names/:_id', updateNames);
router.put('/update-contact/:_id', updateContact);
router.put('/update-password/:_id', updatePassword);
router.get('/get-admin/:_id', getAdmin);
router.get('/get-admins', getAdmins);

module.exports = router;
