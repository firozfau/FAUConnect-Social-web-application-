
const FRZ = require("../library/FRZ.lib");
const UserModel = require("../models/users.model");
const StaticData = require("../library/StaticData.lib");
const multer = require("multer"); 
const path = require("path");
const getUserProfile = async (req, res) => {


    if(req.session.data=await FRZ.isLogged(req))
    {  
    
        const user_basic_data_db = await UserModel.getUserBasicData(req.session.data.user_id); 
        const user_basic_data = user_basic_data_db[0];
        
        res.render("internal/profile", {user_basic_data}); 
    }
    else{
        res.status(200).redirect("user-login");
    }
    

        
};
const getProfileData = async (req, res) => {


    if(req.session.data=await FRZ.isLogged(req))
    {  
        

        const user_basic_data_db = await UserModel.getEditUserProfileData(req.session.data.user_id); 
        const load_data ={
            user_basic_data:user_basic_data_db[0],
            request_data:req.flash('error') ,
            FRZlib:{
                departmentList:StaticData.getDepartmentList(),  
                currentPositionList:StaticData.getCurrentPositionList(), 
                stateList:StaticData.getStateList("DE"),
                languageList:StaticData.getLanguageList(),
                interestList:StaticData.getInterestList(),
                hobbiesList:StaticData.getHobbies(),
            }
        } 
        
        res.render("internal/edit-profile", {load_data}); 
    }
    else{
        res.status(200).redirect("user-login");
    }
    

        
};



const userPhotoStore = multer.diskStorage({
    destination: function (req, file, cb) { 
        cb(null, "assets/user_documents/userphoto");
    },
    filename: function (req, file, cb) { 
    cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname)); 
    },
})
const userPhotoUpload = multer({ storage: userPhotoStore });

const saveProfilePhotoData =async(req,res)=>{

    if(req.session.data=await FRZ.isLogged(req))
    { 
    

        if (req.file.filename !== undefined)
        { 
            const user_profile_data = { 
                user_id:req.session.data.user_id, 
                userphoto: req.file.filename,  
                updated_id:req.session.data.user_id,
                last_ip:req.socket.remoteAddress, 
            }; 
            const update_userPhoto = await UserModel.insertUserProfilePhotoData(user_profile_data);

            req.flash('error', {
                photo_upload: {
                    data: req.body,
                    status:true,
                    message: "Successfully Profile photo uploaded"
                }
            });
            res.status(200).redirect("edit-profile");


        }
        else{

            req.flash('error', {
                photo_upload: {
                    data: req.body,
                    status:false,
                    message: "Oops, it seems there's an issue with your photo upload. We apologize for the inconvenience. Please try again"
                            }
                        });
                res.status(200).redirect("edit-profile"); 
        }
            
    } 
    else{
        res.status(200).redirect("user-login");
    }
};

const saveProfileData = async (req, res) => {


    if(req.session.data=await FRZ.isLogged(req))
    {  
        console.log(req.body.new_password);

            let process_data = await getProcessProfileData(req.body,req.session.data.user_id,req.socket.remoteAddress);
        


            let result=await UserModel.insertOrUpdateProfileData(process_data,FRZ.getCurrentDateTime());

        let data_save_result={
            status:true,
            message:"Your profile information successfully updated!"
        }

            res.status(200).json({data_save_result});
 
    }
    else{
        res.status(200).redirect("user-login");
    }
    

        
};

async function  getEncryptedPassword(password)
{

    const bcrypt = require("bcrypt");
    const saltRounds = 10;

        return new Promise((resolve, reject) => {
            bcrypt.hash(password, saltRounds, (err, hash) => {
            if (err) {
                resolve(false); //reject(err);
            } else {
                resolve(hash);
            }
            });
        });
}
async function   getProcessProfileData(data,user_id,ip_address)
 { 
  
 
 
 
    if(data.section_name=="profile_information")
    {
        let users_profile={
            user_id:user_id,
            current_position:data.current_position,
            department:data.department,
            first_name:data.first_name,
            last_name:data.last_name,
            dob:data.dob, 
            updated_id:user_id,
            last_ip:ip_address,
        }

        let users={
            user_id:user_id,
            gender:data.gender, 
            updated_id:user_id,
            last_ip:ip_address,
        }
 

    
        return {
            "users":users,
            "users_profile":users_profile
        };



    }
    else if(data.section_name=="contact_information")
    {

        let contact_information={
            user_id:user_id,
            mobile:data.mobile,
            second_email:data.second_email,
            office_phone:data.office_phone, 
            updated_id:user_id,
            last_ip:ip_address, 
        } 
 
        return { 
            "contact_information":contact_information
        };

        

    }
    else if(data.section_name=="address_information")
    {
       
        let address={
            user_id:user_id,
            area_code:data.area_code,
            state:data.state,
            city:data.city, 
            country:"DE",
            updated_id:user_id,
            last_ip:ip_address, 
        } 
 
       
        return { 
            "address":address
        };
       
    }
    else if(data.section_name=="user_information")
    { 
        let has_pass=await getEncryptedPassword(data.new_password);
        
        let users={
            user_id:user_id,
            updated_id:user_id,
            last_ip:ip_address, 
        } 
        if(data.new_password.length>2){
            users.password=has_pass;
        }
  

        return { 
            "users":users
        };

    }
    else if(data.section_name=="personal_information")
    { 
        
        let personal_information={
            user_id:user_id,
            user_objective:data.user_objective, 
            research_details:data.research_details, 
            user_hobbies:data.user_hobbies, 
            user_languages:data.user_languages, 
            user_interest:data.user_interest, 
            updated_id:user_id,
            last_ip:ip_address, 
        } 
 
        return { 
            "personal_information":personal_information
        };

    }
   
    
 }
    



module.exports = {
    getUserProfile,
    saveProfileData,
    getProfileData,
    userPhotoUpload,
    saveProfilePhotoData
};