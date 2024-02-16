
const express = require("express");
const userRouter = express.Router();
 
const { authUserRegistration} = require("../validation/auth");
const { runValidation } = require("../validation/auth.validation");
 
 
const {
    userLogin,
    userLoginAction,
    userRegister,
    userRegisterAction,
    checkExistUserData,
    checkEmailandUserName,
    userPhotoUpload,
} = require("../controllers/users.controller");



userRouter.get("/user-login" ,userLogin);
userRouter.post("/user-login", userLoginAction);

userRouter.get("/user-register" ,userRegister);
userRouter.post("/user-register",userPhotoUpload.single("userphoto"),userRegisterAction);

userRouter.post("/check-exist-user", checkExistUserData); 
userRouter.post("/check-exist-user-email", checkEmailandUserName); 




module.exports = userRouter;