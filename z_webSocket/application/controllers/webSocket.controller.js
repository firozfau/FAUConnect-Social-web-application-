const FRZ = require("../library/FRZ.lib");
const MessengerModel = require("../models/messenger.model");

class WebSocketController{


    static async saveMessage(data)
    { 

        const messengerData = {
            user_id:data.user_id , 
            type:1,
            friend_group_id: data.friend_user_id,
            message_type: data.message_type, 
            message: data.message, 
            created_id: data.user_id,  
            created_at:FRZ.getCurrentDateTime()
        };

        const last_id = await MessengerModel.saveMessengerData(messengerData);
        return last_id;

    }


}

module.exports = WebSocketController;