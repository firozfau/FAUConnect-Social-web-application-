
const AdminModel = require("../models/admin.model");
const FRZ = require("../library/FRZ.lib"); 

const getAllActiveUsers = async (req, res) => {

    
    if(req.session.data=await FRZ.isLogged(req))
    { 
        // res.status(200).json({load_data});

        let active_user_data=await AdminModel.getAllActiveUsers(); 

        let load_data={
            user_data:active_user_data
        }; 
    
        res.render('internal/admin/active_users', { load_data}); 
    }
    else{
        res.render('external/login', { messages: req.flash('error') }); 
    }
    
        
};





module.exports = {
     
    getAllActiveUsers
};