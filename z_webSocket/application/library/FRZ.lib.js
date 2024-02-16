const UserModel = require("../models/users.model");
var LocalStorage = require('node-localstorage').LocalStorage,
localStorage = new LocalStorage('./scratch');
const path = require('path');
const fs = require('fs');
class FRZ {

    static getLibLocation(file_name=false){
        if(file_name){
            return  path.join(__dirname, '..')+"/library/"+file_name+".js";
        }
        return  path.join(__dirname, '..')+"/library/";

    }
    static getFRZLibFile(){
    return  fs.readFileSync(FRZ.getLibLocation("FRZ.lib"), 'utf8');
    }
    static getCurrentDateTime() { 
    
        let d = new Date();
        d = new Date(d.getTime() - 3000000);
        let date_format_str = d.getFullYear().toString()+"-"+((d.getMonth()+1).toString().length==2?(d.getMonth()+1).toString():"0"+(d.getMonth()+1).toString())+"-"+(d.getDate().toString().length==2?d.getDate().toString():"0"+d.getDate().toString())+" "+(d.getHours().toString().length==2?d.getHours().toString():"0"+d.getHours().toString())+":"+((parseInt(d.getMinutes()/5)*5).toString().length==2?(parseInt(d.getMinutes()/5)*5).toString():"0"+(parseInt(d.getMinutes()/5)*5).toString())+":00";
        return date_format_str;

    }

    static getDateFormate(dateData) { 
    
        let d = new Date(dateData);
        d = new Date(d.getTime() - 3000000);
        let date_format_str = d.getFullYear().toString()+"-"+((d.getMonth()+1).toString().length==2?(d.getMonth()+1).toString():"0"+(d.getMonth()+1).toString())+"-"+(d.getDate().toString().length==2?d.getDate().toString():"0"+d.getDate().toString());
        return date_format_str;

    }
    static getTimeStamp(){
        return Date.now();
    }
    
    static processSessionData(data,isFormData=false) { 
    
        if (isFormData)
        {
            if(isFormData=="frz")
            {

                const session_data = {
                    user_id: data.user_id,
                    userphoto: data.userphoto,
                    first_name: data.first_name,
                    last_name: data.last_name,
                    email: data.email,
                    gender: data.gender,
                    department: data.department,
                    current_position: data.current_position,
                    login_time: data.login_time,
                    session_from:data.session_from,
                    browser_unique_id: data.browser_unique_id,
                }

                return session_data;
            }
            else{

                const session_data = {
                    user_id: data.user_id,
                    userphoto: data.file_name,
                    first_name: data.obj.first_name,
                    last_name: data.obj.last_name,
                    email: data.obj.email,
                    gender: data.obj.gender,
                    department: data.obj.department,
                    current_position: data.obj.current_position,
                    login_time: this.getCurrentDateTime(),
                    session_from:"registraion",
                    browser_unique_id: data.browser_unique_id
                        
                }

                session_data.session_token=session_data.user_id+"_"+this.getTimeStamp(); 
                localStorage.setItem(data.browser_unique_id, session_data.session_token);

                return session_data;
            }
            
        } else {
            
            
            const session_data = {
                    user_id: data.user_id,
                    userphoto: data.userphoto,
                    first_name: data.first_name,
                    last_name: data.last_name,
                    email: data.email,
                    gender: data.gender,
                    department: data.department,
                    current_position: data.current_position,
                    login_time: this.getCurrentDateTime(),
                    session_from:"login",
                    browser_unique_id: data.browser_unique_id
                        
            }
            session_data.session_token=session_data.user_id+"_"+this.getTimeStamp(); 
            localStorage.setItem(data.browser_unique_id, session_data.session_token);

            return session_data;
            
        }
        
    
        

    }

    static setDBSession (db_session_data)
    {
 
        let session_table_data={
            user_id: db_session_data.user_id,
            status:"1",
            session_start_time:FRZ.getCurrentDateTime(),
            data: JSON.stringify(db_session_data) 
        }
    
    return  UserModel.insertSessionData(session_table_data);
    
    }

static async getBrowserId(reqObj){


    const userAgent = reqObj.headers['user-agent'];
    const UAParser = require('ua-parser-js');
    const parser = new UAParser();
    const result = parser.setUA(userAgent).getResult();
   //console.log('User-Agent:', userAgent);
let browser_unique_id=result.browser.name+"_"+result.browser.version+"_"+result.device.vendor+"__"+result.device.model; 
browser_unique_id = browser_unique_id.toLowerCase();
return browser_unique_id;

}


static async isLogged(reqObj)
{
    const browser_unique_id= await FRZ.getBrowserId(reqObj);

    let session_user_id= await FRZ.getUserIdFromSessionToken(reqObj);
    
    if(session_user_id)
    {
        
        
        let db_session_data = await  UserModel.getDBSession(session_user_id);
    
        if(db_session_data)
        {
            if(db_session_data[0])
            {
                
                    let db_date = new Date(db_session_data[0].session_start_time);
                    let current_date = new Date();
    
                    // Calculate the time difference in milliseconds
                    let timeDifference = current_date - db_date;
    
                
                    let hoursDifference = timeDifference / (1000 * 60 * 60);
    
                
                    let isWithin24Hours = hoursDifference <= 24;
    
                    if (isWithin24Hours) 
                    {
                        let object_data= JSON.parse(db_session_data[0].data);

                        if(browser_unique_id==object_data.browser_unique_id)
                        {

                        

                        
                            const session_data_object = {
                                user_id: object_data.user_id,
                                userphoto: object_data.userphoto,
                                first_name: object_data.first_name,
                                last_name: object_data.last_name,
                                email: object_data.email,
                                gender: object_data.gender,
                                department: object_data.department,
                                current_position: object_data.current_position,
                                login_time: object_data.login_time,
                                session_from:"frz",
                            }
        
                            let log_session_data= await FRZ.processSessionData(session_data_object,"frz");
                            if(log_session_data)
                            {
                                return log_session_data;
                            }
                            else{
                                return false;
                            }
    
                        }else{
                            return false;
                        }
    
                    } else 
                    { 
                        let update_result = await UserModel.destroySession(session_user_id,FRZ.getCurrentDateTime());
                        localStorage.removeItem(browser_unique_id);
                        return false;
                    }
    
    
            
        
    
        }
        else
        {
            return false;
        }
    
    }else 
     {
        return false
     }   

    }
    else{
        return false;
    }
    
    
    
    }

    static getSessionToken(browser_unique_id) { 
    
        if (localStorage.getItem(browser_unique_id) === null) {
            return false;
        }
        return localStorage.getItem(browser_unique_id);
    }
    static async getUserIdFromSessionToken(reqObj) { 

        const browser_unique_id= await FRZ.getBrowserId(reqObj);

        let session_token= FRZ.getSessionToken(browser_unique_id); 
        if(session_token){
            const myArray = session_token.split("_");

            return myArray[0]; 
        }else{
            return false;
        }
    
    }

    static async removeSession(reqObj) {  
    let user_id=reqObj.session.user_id;
    let browser_unique_id=reqObj.session.browser_unique_id;
    user_id=(user_id)?user_id: await FRZ.getUserIdFromSessionToken(reqObj); 
    let update_result = await UserModel.destroySession(user_id,FRZ.getCurrentDateTime());
    localStorage.removeItem(browser_unique_id);
    return update_result=true;
    }







}



module.exports = FRZ;