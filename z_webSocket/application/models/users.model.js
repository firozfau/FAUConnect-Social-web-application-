const MYSQLDB = require("../config/db");
const FRZvalidation  = require("../validation/frz.validation");

class UserModel{


    static async getAllUsers() { 

        const sql = "SELECT * FROM users";
            
        return new Promise(resolve => {
            
            try {
                
                MYSQLDB.query(sql, [], (error, result) => {
            
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
    
        

  static async getInfoByEmailUserName(emailUsername) { 
  
    
      
      let filedName =  (FRZvalidation.isValidEmail(emailUsername)==true) ? "email" : "username";
      
      const sql = `SELECT * FROM users where ${filedName}='${emailUsername}' limit 1`;
      

      return new Promise(resolve => {
          
          try {
            
              MYSQLDB.query(sql, [], (error, result) => {
          
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

     
  static async insertUserData(data) { 

      const sql = `INSERT INTO users(email,username,password,gender,account_type,token_number,status,created_at,last_ip) VALUES('${data.email}','${data.username}','${data.password}',${data.gender},${data.account_type},'${data.token_number}',${data.status},'${data.created_at}','${data.last_ip}')`;
     
        
      return new Promise(resolve => {
        
          try {
            
             
              MYSQLDB.query(sql, [], (error, result) => {
          
              if (error) {
                  resolve(false);
              } else {
                  
                  resolve(result.insertId);
              }
              
          });
              
              
          } catch (error) {
             resolve(false);
          }
           
          
      });

      
  }  
 
  static async insertUserProfileData(data) { 
        const sql = `INSERT INTO users_profile (user_id,first_name,last_name,dob,department,current_position,userphoto,created_at,last_ip) VALUES('${data.user_id}','${data.first_name}','${data.first_name}','${data.dob}','${data.department}','${data.current_position}','${data.userphoto}','${data.created_at}','${data.last_ip}')`;
            
        return new Promise(resolve => {
            
            try {
                
                MYSQLDB.query(sql, [], (error, result) => {
            
                if (error) {
                    resolve(false);
                } else {
                    
                    resolve(result.insertId);
                }
                
            });
                
                
            } catch (error) {
                resolve(false);
            }
            
            
        });

        
    }  



static async insertUserProfilePhotoData(data)
{ 

        const sql = `update users_profile set userphoto=? , updated_id=? , last_ip=? where user_id=?`;
        

        return new Promise(resolve => {
    
            //const lastQuery = MYSQLDB.format(sql, [session_end_time, user_id]);
        // resolve(lastQuery);

            try {
                
                MYSQLDB.query(sql, [data.userphoto,data.updated_id,data.last_ip,data.user_id], (error, result) => {
            
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

    
        static async getUserBasicData(user_id)
        { 
    
        
        
        const sql = `SELECT users.id user_id,users.email,users.gender,users.account_type,users.status,users_profile.first_name,users_profile.last_name,users_profile.dob,users_profile.department,users_profile.current_position,users_profile.userphoto from users INNER JOIN users_profile on users.id=users_profile.user_id where users.id=? limit 1`;
        

        return new Promise(resolve => {
            
            
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
    

    static async deleteIncompleteRegistrationUserFromUserTable(user_id)
    { 
  
     
      
      const sql = `DELETE  FROM users where id=?`;
      

      return new Promise(resolve => {
          
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
    
 
    static async insertSessionData(data) { 

        const sql = `INSERT INTO logs_login_information(user_id,status,session_start_time,data) VALUES('${data.user_id}','${data.status}','${data.session_start_time}','${data.data}')`;
 
          
        return new Promise(resolve => {
          
                
            try {
              
               
                MYSQLDB.query(sql, [], (error, result) => {
            
                if (error) {
                    resolve(false);
                } else {
                    
                    resolve(result.insertId);
                }
                
            });
                
                
            } catch (error) {
               resolve(false);
            }
             
            
        });
  
        
    }  


    static async getDBSession(user_id)
    { 
  
    
      
     const sql = `SELECT * from logs_login_information where user_id=? and status=1 ORDER BY id DESC limit 1`;
      

      return new Promise(resolve => {
   
          
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

    static async destroySession(user_id,session_end_time)
    { 
  
    
      
     const sql = `update logs_login_information set status=2 , session_end_time=? where user_id=?`;
      

      return new Promise(resolve => {
   
        //const lastQuery = MYSQLDB.format(sql, [session_end_time, user_id]);
       // resolve(lastQuery);

          try {
             
            MYSQLDB.query(sql, [session_end_time,user_id], (error, result) => {
          
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


     
    static async getEditUserProfileData(user_id)
    { 
  
    
      
        const sql = `SELECT 
            users.*, 
            users_profile.first_name,
            users_profile.last_name,
            users_profile.dob,
            users_profile.department,
            users_profile.current_position,
            users_profile.userphoto,
            personal_information.user_languages,
            personal_information.research_details,
            personal_information.user_interest,
            personal_information.user_hobbies,
            personal_information.user_objective, 
            contact_information.mobile,
            contact_information.second_email,
            contact_information.office_phone,
            address.area_code,
            address.area_name,
            address.city,
            address.state,
            address.country
            from users 
            INNER JOIN users_profile on users.id=users_profile.user_id
            LEFT JOIN personal_information on users.id=personal_information.user_id
            LEFT JOIN contact_information on users.id=contact_information.user_id
            LEFT JOIN address on users.id=address.user_id 
            where users.id=?`;
    

        return new Promise(resolve => {
        
        
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


    static async insertPerSonalInfo(data) { 

            const sql = `INSERT INTO personal_information(user_id,user_languages,research_details,user_interest,user_hobbies,user_objective,created_at,created_id,last_ip) VALUES('${data.user_id}','${data.user_languages}','${data.research_details}','${data.user_interest}','${data.user_hobbies}','${data.user_objective}','${data.created_at}','${data.created_id}','${data.last_ip}')`;
    
            
            return new Promise(resolve => {
            
                    
                try {
                
                //const lastQuery = MYSQLDB.format(sql, []);
               // resolve(lastQuery);

                    MYSQLDB.query(sql, [], (error, result) => {
                
                    if (error) {
                        resolve(false);
                    } else {
                        
                        resolve(result.insertId);
                    }
                    
                });
                    
                    
                } catch (error) {
                resolve(false);
                }
                
                
            });
    
            
        }  


  
static async isTableDataAvailable(table_name,user_id)
{ 
        let sql = `SELECT * from ${table_name} where user_id=? limit 1`; 

        if(table_name=="users")
        {
         sql = `SELECT * from ${table_name} where id=? limit 1`; 
        }
    

        return new Promise(resolve => {
            
            try {
            
                MYSQLDB.query(sql, [user_id], (error, result) => {
            
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
static async updateDataFRZ(sql)
{
    return new Promise(resolve => {
            
                    //const lastQuery = MYSQLDB.format(sql, [session_end_time, user_id]);
                // resolve(lastQuery);
        
                    try {
                        
                        MYSQLDB.query(sql,[], (error, result) => {
                    
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


static async insertDataFRZ(sql) { 

    return new Promise(resolve => {
      
            
        try {
          
           
            MYSQLDB.query(sql, [], (error, result) => {
        
            if (error) {
                resolve(false);
            } else {
                
                resolve(result.insertId);
            }
            
        });
            
            
        } catch (error) {
           resolve(false);
        }
         
        
    });

    
}  
static async insertOrUpdateProfileData(data,created_at)
{ 
    const promises = [];

    for (const [table_name, myObject] of Object.entries(data)) 
    {
            let dataAlreadyExist=await this.isTableDataAvailable(table_name,myObject.user_id);


            if (dataAlreadyExist.length === 0){
                // insert

                let sql_table = `INSERT INTO ${table_name}`;
                let column_filed=` `;
                let field_list=` `;

                for (const [key, value] of Object.entries(myObject))
                {
                    if (!(table_name === "users" && key === "user_id")) {
                        column_filed+=` ${key}, `;
                        field_list+=` '${value}', `;
                    }
                }

                column_filed+=` created_id,created_at `;
                field_list+=` '${myObject.user_id}', '${created_at}' `;
 
                let concat_Query=`${sql_table} (${column_filed} ) VALUES (${field_list})`;
                
                   // let insert_table=await this.insertDataFRZ(concat_Query);
            
                    promises.push(this.insertDataFRZ(concat_Query));
            }
            else{

                        // update
                        let sql_table = `update ${table_name} set `; 

                        for (const [key, value] of Object.entries(myObject))
                        {
                            if (!(table_name === "users" && key === "user_id")) {
                                sql_table += ` ${key}='${value}' ,`;
                            }
                        
                            
                        }

                        sql_table = sql_table.trim().replace(/,$/, '');

                        if(table_name=="users")
                        {
                            sql_table+=` where id=${myObject.user_id}`;
                        }else{
                            sql_table+=` where user_id=${myObject.user_id}`;
                        }
                    
              //  let update_table=await this.updateDataFRZ(sql_table);

                
                promises.push(this.updateDataFRZ(sql_table));
            
            }
        
    }
    
    await Promise.all(promises);

    return true;
                
    }




}



module.exports = UserModel;