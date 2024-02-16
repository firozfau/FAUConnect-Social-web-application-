
const express = require("express");
const profileRouter = express.Router();
const FRZ = require("../library/FRZ.lib"); 

const { authUserRegistration} = require("../validation/auth");
const { runValidation } = require("../validation/auth.validation");
 
  
const { 
    getUserProfile,
    saveProfileData,
    getProfileData,
    userPhotoUpload,
    saveProfilePhotoData
} = require("../controllers/users_profiles.controller");



profileRouter.get("/edit-profile",getProfileData); 
profileRouter.post("/edit-profile",saveProfileData); 
profileRouter.post("/profile-photo",userPhotoUpload.single("userphoto"),saveProfilePhotoData); 


profileRouter.get("/user-profile",getUserProfile); 

profileRouter.get("/user-logout", async (req, res,next) => {

        let destroy_session= await FRZ.removeSession(req);
        if(destroy_session){
            req.session.destroy();
            res.redirect('/');
        }else{
            res.redirect('/user-profile');
        }


    
});





module.exports = profileRouter;