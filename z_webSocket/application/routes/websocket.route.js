const MessengerModel = require("../models/messenger.model");

const webSocketData = async (user_id,friend_id) => {

    const all_conversation_data = await MessengerModel.getAllConversation(user_id,friend_id);  
    let data={
        friend_user_id:friend_id,
        user_id:user_id,
        conversation_data:all_conversation_data,

    }
    
    return data;
        
};



module.exports = {
    webSocketData
};