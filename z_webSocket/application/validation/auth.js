const {check } = require("express-validator")
exports.authUserRegistration = [
 check("fullname")
        .trim()
        .notEmpty()
        .withMessage("Name is Missing")
        .isLength({ min: 5, max: 50 })
        .withMessage("Name should be minimum 5 and max 50 characters"),
     check("username")
        .trim()
        .notEmpty()
        .withMessage("Username is Missing")
        .isLength({ min: 3, max: 10 })
            .withMessage("Name should be minimum 3 and max 10 characters"),
        
      check("email")
        .trim()
        .notEmpty()
        .withMessage("Email is Missing")
        .isLength({ min: 3, max: 10 })
        .withMessage("Name should be minimum 5 and max 50 characters")
        .isEmail()
        .withMessage("not valid email"),
    check("passwoard")
        .trim()
        .notEmpty()
        .withMessage("Password is Missing")
        .isLength({ min: 5, max: 20 })
            .withMessage("Name should be minimum 5 and max 20 characters"),
    check("dob")
        .trim()
        .notEmpty()
        .withMessage("Date of birth is Missing")
        .isLength({ min: 6, max: 10 })
        .withMessage("Name should be minimum 6 and max 10 characters") 
        //.toDate()
            .withMessage("Not a valid date of date of birth")
]