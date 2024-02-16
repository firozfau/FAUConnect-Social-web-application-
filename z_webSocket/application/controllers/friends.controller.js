const FRZ = require("../library/FRZ.lib"); 
const getFriendMatchInformation = async (req, res) => {

    
    if(req.session.data=await FRZ.isLogged(req))
    { 
    
        let active_user_data="";//await AdminModel.getAllActiveUsers(); 

        let load_data={
            user_data:active_user_data
        };  

        res.render('internal/find_friends', { messages: req.flash('error') }); 
    }
    else{
        res.render('external/login', { messages: req.flash('error') }); 
    }
    
        
};




module.exports = {
    getFriendMatchInformation
};