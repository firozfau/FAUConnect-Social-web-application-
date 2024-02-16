const FRZ = require("../library/FRZ.lib"); 
const checkLoginInfo = async (req, res,next) => {

    
    if(req.session.data=await FRZ.isLogged(req))
    { 
    
        res.status(200).redirect("user-profile");
    }
    else{
        next();
    }
    
        
};



module.exports = {
    checkLoginInfo
};