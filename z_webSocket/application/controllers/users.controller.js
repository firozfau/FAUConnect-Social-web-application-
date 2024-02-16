const { v4: uniqueID } = require("uuid"); 
const path = require("path");
const multer = require("multer"); 
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { json } = require("express");

const UserModel = require("../models/users.model");
const FRZ = require("../library/FRZ.lib"); 
const FRZmailer = require("../library/FRZmailer.lib");





const userLogin = async (req, res) => {

    
    if(req.session.data=await FRZ.isLogged(req))
    { 
    
        res.status(200).redirect("user-profile");
    }
    else{
        res.render('external/login', { messages: req.flash('error') }); 
    }
    
        
};


const userLoginAction = async (req, res,next) => { 
   


        const user_data = await UserModel.getInfoByEmailUserName(req.body.username);
        let isEmpty = Object.keys(user_data).length === 0; 
        
        if(isEmpty)
        {
            req.flash('error', { login_error: { user_password:false,user_name: 'This username "' + req.body.username + '" is not a valid' } });
            res.status(200).redirect("user-login");
        }
        else
        {

            if (user_data[0].password.length > 0)
            {

              // console.log(req.body.password);

                bcrypt.compare(req.body.password, user_data[0].password, async (err, result) =>{
                    

                    if (result == true) {
                        const user_id = user_data[0].id;

                      // set login Session :
                        const user_basic_data= await UserModel.getUserBasicData(user_id);
                        const browser_unique_id= await FRZ.getBrowserId(req);
                        user_basic_data[0].browser_unique_id= browser_unique_id;
                        

                        let lib_session_data= FRZ.processSessionData(user_basic_data[0], false);
                        let session_data_id= await FRZ.setDBSession(lib_session_data);
                        if(session_data_id){
                            req.session.data=lib_session_data
                        }
                        
                        res.status(200).redirect("user-profile");
                    }
                    else {
                        req.flash('error', { login_error: {user_name:false, user_password: 'This password "' + req.body.password + '" does not match!' } });
                        res.status(200).redirect("user-login");
                    }
                });

            } else {
                req.flash('error', { login_error: {user_name:false, user_password: 'This password "' + req.body.password + '" does not match!' } });
                res.status(200).redirect("user-login");
            }
            
        }

       

}





const checkExistUserData = async (req, res) => {
    
        const { email_or_username } = req.body;
        const todo = await UserModel.getInfoByEmailUserName(email_or_username);
        res.send(todo);    
};


const checkEmailandUserName = async (req, res) => {
    
        let return_data ={
            status: true,
            reason: "",
            message: "This email and uername is available",
                        
            };
    
                let ajax_data = req.body;
     
                    const email_data = await UserModel.getInfoByEmailUserName(ajax_data.email);
                    const isEmpty = Object.keys(email_data).length === 0; 

    
 
    
                        if (isEmpty)
                        {
                            const user_data = await UserModel.getInfoByEmailUserName(ajax_data.username);
                            const isUserEmpty = Object.keys(user_data).length === 0;

                            

                            if(isUserEmpty)
                            {
                                res.status(200).json(return_data);
                            }
                            else {
                                return_data.status = false;
                                return_data.reason = "username";
                                return_data.message = "This username is not available!";
                                res.status(200).json(return_data);
                                
                            }
                            
                        } else {
                            return_data.status = false;
                            return_data.reason = "email";
                            return_data.message = "This email is not available!";

                            res.status(200).json(return_data);
                        } 
    
    
           
     
    
};
 
const userRegister = (req, res) => {
   
 res.render('external/register', { messages: req.flash('error') }); 
};



const userRegisterAction = async (req, res) => { 
    let new_user_id = false;
 

    bcrypt.hash(req.body.password, saltRounds, async function (err, hash)
    {

        const user_data_object = {
                email: req.body.email,
                username: req.body.username,
                password: hash,
                gender: req.body.gender,
                account_type: 1,
                token_number:uniqueID(),
                status: 0,
                created_at:FRZ.getCurrentDateTime(),
                last_ip:req.socket.remoteAddress 
            }
    
        if (req.file.filename !== undefined)
        {
            
    
        
                new_user_id = await UserModel.insertUserData(user_data_object);
        
        
                if (new_user_id)
                { 

                    const user_profile_data = {
                            user_id:new_user_id, 
                            first_name: req.body.first_name,
                            last_name: req.body.last_name,
                            dob: FRZ.getDateFormate(req.body.dob),
                            department: req.body.department, 
                            current_position: req.body.current_position,
                            userphoto: req.file.filename,  
                            created_at:FRZ.getCurrentDateTime(),
                            last_ip:req.socket.remoteAddress,
                            
                        }

                    
                        const new_user_profile_id = await UserModel.insertUserProfileData(user_profile_data);
                    
                        if (new_user_profile_id)
                        {
                                    
                                    // set login Session :
                                    const browser_unique_id= await FRZ.getBrowserId(req);
                                    const session_data = {
                                        obj: req.body,
                                        user_id: user_profile_data.user_id,
                                        file_name:req.file.filename,
                                        browser_unique_id: browser_unique_id,
                                    }
                                
                                    let lib_session_data=  FRZ.processSessionData(session_data, true); 
                                    let session_data_id=await  FRZ.setDBSession(lib_session_data);
                                    if(session_data_id){
                                        req.session.data=lib_session_data
                                    }

                                    const email_details = {
                                            appName: "FAUConnect",
                                            subject:"Welcome to FAUConnect ",
                                            fullName: req.body.first_name+" "+req.body.last_name,
                                            username:req.body.username,
                                            email:req.body.email,
                                            password:req.body.password,
                                            loginLink: process.env.LOGIN_LINK
                                        };
                                
                                        const email_data = {
                                            to: email_details.email,
                                            subject: email_details.subject,
                                            html: FRZmailer.getRegistraionEmailContent(email_details)
                                        
                                        }
                                    
                                        let result= await  FRZmailer.sendMail(email_data);
                                                

                                        res.status(200).redirect("user-profile");
                            
                                }
                        else { 
                            
                                    let result= await  UserModel.deleteIncompleteRegistrationUserFromUserTable(new_user_id);

                                    req.flash('error', {
                                        register_error: {
                                            data: req.body,
                                            status:false,
                                            message: "Oops, it seems there's an issue with your signup. We apologize for the inconvenience. Please try again"
                                        }
                                    });
                                    res.status(200).redirect("user-register");
                                }

                    }
                else
                {

                        req.flash('error', {
                            register_error: {
                                data: req.body,
                                status:false,
                                message: "Oops, it seems there's an issue with your signup. We apologize for the inconvenience. Please try again"
                                        }
                                    });
                            res.status(200).redirect("user-register"); 
                    }
            
        }
        else
        {
                req.flash('error', {
                register_error: {
                    data: req.body,
                    status:false,
                    message: "Oops, it seems there's an issue with your signup. We apologize for the inconvenience. Please try again"
                            }
                        });
                res.status(200).redirect("user-register");  
    }     
        
        
    })




}


const userPhotoStore = multer.diskStorage({
    destination: function (req, file, cb) { 
        cb(null, "assets/user_documents/userphoto");
    },
    filename: function (req, file, cb) { 
       cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname)); 
    },
})
const userPhotoUpload = multer({ storage: userPhotoStore });






module.exports = {
     
    userLogin, 
    userLoginAction,
    userRegister,
    userRegisterAction,
    checkExistUserData,
    checkEmailandUserName,
    userPhotoUpload
    
};