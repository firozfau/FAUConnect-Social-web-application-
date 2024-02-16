
const FRZ = require("../library/FRZ.lib");
const MessengerModel = require("../models/messenger.model");


const getFriendList = async (req, res) => {



    if(req.session.data=await FRZ.isLogged(req))
    { 
    
        const friend_list = await MessengerModel.getFriendList(req.session.data.user_id); 
        
        res.render("internal/friend_list", {friend_list}); 
    
    }
    else{
        res.status(200).redirect("user-login");
    }


        
};

const getConversation = async (req, res) => {

    let friend_id=req.params.id;


    if(req.session.data=await FRZ.isLogged(req))
    { 
        const all_conversation_data = await MessengerModel.getAllConversation(req.session.data.user_id,friend_id);  
        let data={
            user_id:req.session.data.user_id,
            last_name:req.session.data.last_name,
            friend_user_id:friend_id,
            conversation_data:all_conversation_data
        }


        res.render("internal/messenger", {data});  
    }
    else{
        res.status(200).redirect("user-login");
    } 
        
};


module.exports = {
    getConversation,
    getFriendList
}