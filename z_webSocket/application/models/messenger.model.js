const MYSQLDB = require("../config/db");
const FRZvalidation  = require("../validation/frz.validation");

class MessengerModel{


    static async getFriendList(user_id)
    { 

    const sql = `SELECT friends_list_table.*,users_profile.first_name,users_profile.last_name  from(
        SELECT 
        friends_list.id,friends_list.status,friends_list.request_date,friends_list.accept_date,friends_list.comments,
            CASE
                WHEN friends_list.user_id = '${user_id}' THEN friends_list.user_id
                ELSE friends_list.friend_user_id
            END AS who_send_friend_request,
                CASE
                WHEN friends_list.user_id = '${user_id}' THEN friends_list.friend_user_id
                ELSE friends_list.user_id
            END AS friend_user_id
            
        from friends_list 
        where friends_list.user_id='${user_id}' or friends_list.friend_user_id='${user_id}' ORDER BY friends_list.id DESC
        ) as friends_list_table
        INNER JOIN users_profile  on friends_list_table.friend_user_id=users_profile.user_id`;
        
        return new Promise(resolve => {
            
           // const lastQuery = MYSQLDB.format(sql, [user_id]);
           // resolve(lastQuery);
        try {
            
            MYSQLDB.query(sql, [user_id], (error, result) => {
        
                if (error) {
                    resolve(error);
                } else {
                    
                    resolve(result);
                }
                
            });


            } catch (error) {
                resolve(error);
            }

        });

    
}

    static async getAllConversation(who_logged_user_id,friend_id)
    { 

      const sql = "SELECT * FROM user_conversation where (user_id=? or friend_group_id=?) and (user_id=? or friend_group_id=?) ORDER BY id ASC";
        
        return new Promise(resolve => {
            
        try {
            
            MYSQLDB.query(sql, [who_logged_user_id,who_logged_user_id,friend_id,friend_id], (error, result) => {
        
                if (error) {
                    resolve(error);
                } else {
                    
                    resolve(result);
                }
                
            });


            } catch (error) {
                resolve(error);
            }

        });

    
}


static async saveMessengerData(data)
{ 

const sql = `INSERT into user_conversation (user_id,type,friend_group_id,message_type,message,created_at,created_id,last_ip) values('${data.user_id}','${data.friend_group_id}','${data.friend_group_id}','${data.message_type}','${data.message}','${data.created_at}','${data.created_id}','${data.last_ip}')`;
    
    return new Promise(resolve => {
        
    //const lastQuery = MYSQLDB.format(sql, []);
   // resolve(lastQuery);
    try {
        
        MYSQLDB.query(sql, [], (error, result) => {
        
            if (error) {
                resolve(false);
            } else {
                
                resolve(result.insertId);
            }
            
        });


        } catch (error) {
            resolve(error);
        }

    });


}

}




module.exports = MessengerModel;