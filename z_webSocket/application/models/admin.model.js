const MYSQLDB = require("../config/db"); 

class AdminModel{

static async getAllActiveUsers() { 

    const sql = "SELECT * from logs_login_information where `status`=1 ORDER BY id DESC";
    
    return new Promise(resolve => {
        
        try {
        
            MYSQLDB.query(sql, [], (error, result) => {
        
            if (error) {
                resolve(false);
            } else {
                
                resolve(result);
            }
            
        });
            
            
        } catch (error) {
        resolve(error);
        }
        
        
        
        
    });

    
}

}



module.exports = AdminModel;