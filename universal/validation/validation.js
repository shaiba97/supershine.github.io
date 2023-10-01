const { check } = require("express-validator")

module.exports.member_validator = [
    check("image")
    .trim()
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage("Image is empty!").bail(),


    check("first_name")
    .not().exists({ checkFalsy: true, checkNull: true })
    .withMessage("First name is empty!")
    .bail()
    .isAlpha()
    .withMessage("First name must be alphabet letters!")
    .bail(),

    // check("last_name")
    // .trim()
    // .exists({ checkFalsy: true, checkNull: true })
    // .withMessage("Last name is empty!").bail()
    // .isAlpha()
    // .withMessage("Last name must be alphabet letters!").bail(),

    // check("contact")
    // .trim()
    // .exists({ checkFalsy: true, checkNull: true })
    // .withMessage("Contact is empty!").bail()
    // .isLength({ min: 9 })
    // .withMessage("Contact must have at least 9 characters!").bail()
    // .isEmail()
    // .withMessage("Contact must be email or phone number!").bail(),

    // check("position")
    // .trim()
    // .exists({ checkFalsy: true, checkNull: true })
    // .withMessage("Position is empty!").bail()
    // .isAlpha()
    // .withMessage("Position must be alphabet letters!").bail(),

    // check("comment")
    // .trim()
    // .exists({ checkFalsy: true, checkNull: true }).bail()
    // .withMessage("Comment is empty!")
    // .isAlphanumeric()
    // .withMessage("Comment must be alphabet letters and numbers!").bail()
    // .isLength({ max: 500 })
    // .withMessage("Comment must be 500 characters!").bail(),
]

module.exports.service_validator = [
    check("service")
    .trim()
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage("First name is empty!")
    .isAlpha()
    .withMessage("Service must be alphabet letters!"),

    check("desc")
    .trim()
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage("Description is empty!")
    .isAlpha()
    .withMessage("Description must be alphabet letters!"),
]

module.exports.testimonial_validator = [
    check("after")
    .trim()
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage("After image is empty!"),

    check("before")
    .trim()
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage("before image is empty!"),
]

module.exports.blog_validator = [
    check("image")
    .trim()
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage("Image is empty!"),

    check("title")
    .trim()
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage("Description is empty!")
    .isAlpha()
    .withMessage("Description must be alphabet letters!"),

    check("blog")
    .trim()
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage("Description is empty!")
    .isAlpha()
    .withMessage("Description must be alphabet letters!"),
]

module.exports.admin_validator = [
    check("image")
    .trim()
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage("Image is empty!"),


    check("first_name")
    .trim()
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage("First name is empty!")
    .isAlpha()
    .withMessage("First name must be alphabet letters!"),

    check("last_name")
    .trim()
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage("Last name is empty!")
    .isAlpha()
    .withMessage("Last name must be alphabet letters!"),

    check("contact1")
    .trim()
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage("Contact is empty!").bail()
    .isLength({ min: 9 })
    .withMessage("Contact must have at least 9 characters!").bail()
    .isEmail().isNumeric()
    .withMessage("Contact must be email or phone number!").bail(),

    check("contact2")
    .trim()
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage("Contact is empty!").bail()
    .isLength({ min: 9 })
    .withMessage("Contact must have at least 9 characters!").bail()
    .isEmail().isNumeric()
    .withMessage("Contact must be email or phone number!").bail(),

    check("password")
    .trim()
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage("Position is empty!")
    .isAlphanumeric()
    .withMessage("Password must be of alphabet letters and numbers!"),

    check("position")
    .trim()
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage("Position is empty!")
    .isAlphanumeric()
    .withMessage("Position must be alphabet letters and numbers!"),
]

module.exports.booking_validator = [
    check("first_name")
    .trim()
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage("First name is empty!")
    .isAlpha()
    .withMessage("First name must be alphabet letters!"),

    check("last_name")
    .trim()
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage("Last name is empty!")
    .isAlpha()
    .withMessage("Last name must be alphabet letters!"),

    check("contact")
    .trim()
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage("Contact is empty!").bail()
    .isLength({ min: 9 })
    .withMessage("Contact must have at least 9 characters!").bail()
    .isEmail().isNumeric()
    .withMessage("Contact must be email or phone number!").bail(),

    check("building")
    .trim()
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage("Building is empty!")
    .isAlpha()
    .withMessage("Building must be alphabet letters!"),

    check("floor")
    .trim()
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage("Floor is empty!")
    .isAlphanumeric()
    .withMessage("Floor must be alphabet letters and numbers!"),

    check("tower")
    .trim()
    .optional(true)
    .isAlphanumeric()
    .withMessage("Tower must be alphabet letters and numbers!"),

    check("landmark")
    .trim()
    .optional(true)
    .isAlphanumeric()
    .withMessage("Landmark must be alphabet letters and numbers!"),
]


module.exports.comment_validator = [
    check("first_name")
    .trim()
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage("First name is empty!")
    .isAlpha()
    .withMessage("First name must be alphabet letters!"),

    check("last_name")
    .trim()
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage("Last name is empty!")
    .isAlpha()
    .withMessage("Last name must be alphabet letters!"),

    check("contact")
    .trim()
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage("Contact is empty!").bail()
    .isLength({ min: 9 })
    .withMessage("Contact must have at least 9 characters!").bail()
    .isEmail().isNumeric()
    .withMessage("Contact must be email or phone number!").bail(),

    check("comment")
    .trim()
    .isLength({ min: 1, max: 500 })
    .withMessage("Comment is empty!")
    .isAlphanumeric()
    .withMessage("Comment must be alphabet letters and numbers!"),
]
